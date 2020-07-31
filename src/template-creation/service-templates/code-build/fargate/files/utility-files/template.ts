const generateTemplate = (projectName: string, description: string, isForMusicLab: boolean): string => {
  const musicLabTags = isForMusicLab
    ? `- Key: application
          Value: MusicLab
        - Key: lob
          Value: radio
        - Key: project
          Value: 2017_iHM_MusicLab
        - Key: owner
          Value: ihm-it-musiclab`
    : ''

  return `Transform: 'AWS::Serverless-2016-10-31'
Description: Pipeline for the job - ${description}

Parameters:
  Stage:
    Type: String
  BranchToRunBuildFrom:
    Type: String
  RepositoryUrl:
    Type: String
  S3Bucket:
    Type: String
    Description: Name of S3 Bucket where the builds will be stored
  BuildCommand:
    Type: String
    Description: Command used to run the build for the specified environment
  RepositoryName:
    Type: String
    Description: ECR repository storing the build containers
  ImageTag:
    Type: String
    Description: Name of build image
  InitiatorFunctionName:
    Type: String
    Description: Name of the Lambda function that starts the ECS task
  FilePathForWebHook:
    Type: String
    Description: Path of a file that will trigger a build upon detected change

Resources:
  # Role that the build agent will assume
  BuildServiceRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: jobs-${projectName}-build-role
      AssumeRolePolicyDocument:
          Statement:
          - Effect: Allow
            Principal:
              Service:
                - codebuild.amazonaws.com
            Action: 'sts:AssumeRole'
      Policies:
        - PolicyName: describe-security-groups
          PolicyDocument:
            Statement:
            - Effect: Allow
              Action:
                - ec2:DescribeSecurityGroups
                - ec2:DescribeSubnets
                - ec2:DescribeVpcs
              Resource: '*'
        - PolicyName: codebuild-api-gateway-access
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                  - apigateway:GET
                Resource: arn:aws:apigateway:*::/restapis
        - PolicyName: codebuild-events-access
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                  - events:*
                Resource:
                  Fn::Join:
                    - ""
                    - - "arn:aws:events:"
                      - !Ref AWS::Region
                      - ":"
                      - !Ref AWS::AccountId
                      - ":rule/${projectName}"
                      - !Sub -\${Stage}
        - PolicyName: codebuild-lambda-access
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                  - lambda:*
                Resource:
                  Fn::Join:
                    - ""
                    - - "arn:aws:lambda:"
                      - !Ref AWS::Region
                      - ":"
                      - !Ref AWS::AccountId
                      - !Sub ":function:\${InitiatorFunctionName}Initiator"
                      - !Sub -\${Stage}
        - PolicyName: codebuild-specific-access-cloudformation-resources
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                  - cloudformation:*
                Resource: "*"
              - Effect: Allow
                Action:
                  - logs:*
                Resource: "*"
        - PolicyName: codebuild-iam
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                  - iam:*
                Resource:
                  - "arn:aws:iam::*:role/${projectName}*"
        - PolicyName: codebuild-access-artifact-deployment-bucket
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                  - s3:*
                Resource:
                  - !Sub arn:aws:s3:::\${S3Bucket}
                  - !Sub arn:aws:s3:::\${S3Bucket}/*
        - PolicyName: codebuild-logs-permissions
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                  - logs:CreateLogStream
                  - logs:CreateLogGroup
                  - logs:PutLogEvents
                Resource: '*'
        - PolicyName: codebuild-permissions
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                  - codebuild:CreateReportGroup
                  - codebuild:CreateReport
                  - codebuild:UpdateReport
                  - codebuild:BatchPutTestCases
                Resource: '*'
        - PolicyName: allow-ecr-build-image-pull
          PolicyDocument:
            Statement:
              - Effect: Allow
                Action:
                  - ecr:GetDownloadUrlForLayer
                  - ecr:BatchGetImage
                  - ecr:BatchCheckLayerAvailability
                  - ecr:GetAuthorizationToken
                Resource: '*'
      Tags:
        - Key: env
          Value: !Ref Stage
        - Key: service
          Value: weekly-jobs
        - Key: name
          Value: ${projectName}
        - Key: resource
          Value: IAM
        ${musicLabTags}
        

# CodeBuild resource that will perform build
  BuildProject:
    Type: AWS::CodeBuild::Project
    Properties:
      Name: !Sub jobs-${projectName}-\${Stage}
      Description: !Sub "Build steps for \${Stage} ${projectName} job"
      ServiceRole: !GetAtt BuildServiceRole.Arn
      Artifacts:
        Type: NO_ARTIFACTS
      BadgeEnabled: true
      Environment:
        Type: LINUX_CONTAINER
        ComputeType: BUILD_GENERAL1_SMALL
        ImagePullCredentialsType: SERVICE_ROLE
        PrivilegedMode: true
        Image:
          Fn::Join:
            - ""
            - - !Ref AWS::AccountId
              - .dkr.ecr.
              - !Ref AWS::Region
              - .amazonaws.com/
              - !Sub \${RepositoryName}:\${ImageTag}
        EnvironmentVariables:
        - Name: BUILD_COMMAND
          Value: !Ref BuildCommand
      # This is a sample of what your source might look like. Change the value according to your setup
      Source:
        Type: GITHUB
        Location: !Ref RepositoryUrl
        BuildSpec: !Sub \${FilePathForWebHook}/buildspec.yml
        Auth:
          Resource: !ImportValue CodeBuild-GitHubCredentials
          Type: OAUTH
      SourceVersion: !Ref BranchToRunBuildFrom
      TimeoutInMinutes: 10
      Tags:
        - Key: env
          Value: !Ref Stage
        - Key: name
          Value: ${projectName}
        - Key: resource
          Value: CodeBuild
        ${musicLabTags}
`
}

export default generateTemplate
