/* eslint-disable max-len */

import { splitAndCapKebab } from '@util/formatting'

export interface GenerateTemplateArguments {
  projectName: string
  deploymentBucket: string
  isForMusicLab: boolean
  description: string
}

export const generateTemplate = ({
  description,
  projectName,
  deploymentBucket,
  isForMusicLab,
}: GenerateTemplateArguments): string => {
  const pascalCaseProjectName = splitAndCapKebab(projectName)
  const musicLabTagsFunction = isForMusicLab
    ? `- Key: application
        Value: MusicLab
      - Key: lob
        Value: radio
      - Key: project
        Value: 2017_iHM_MusicLab
      - Key: owner
        Value: ihm-it-musiclab`
    : ''
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

  const clusterId = isForMusicLab
    ? '${cf:data-jobs-cluster-${env:STAGE}.DataJobClusterId}'
    : '!----CHANGE_VALUE----! - YOUR_CLUSTER_HERE'

  const subnets = isForMusicLab
    ? '${cf:parameter-seed-${env:STAGE}.DbSubnets}'
    : '!----CHANGE_VALUE----! - YOUR_COMMA_DELIMITED_SUBNETS_HERE'
  const securityGroupId = isForMusicLab
    ? '${cf:parameter-seed-${env:STAGE}.DbSecurityGroupId}'
    : '!----CHANGE_VALUE----! - YOUR_SECURITY_GROUP_HERE'
  return `
service:
  name: ${projectName}

frameworkVersion: '>=1.0.0 <2.0.0'

provider:
  name: aws
  runtime: nodejs12.x
  stage: \${env:STAGE}
  stackName: \${env:STACK_NAME}
  memorySize: 128
  timeout: 10
  logRetentionInDays: 14
  deploymentBucket: 
    name: ${deploymentBucket}-\${env:STAGE}
  environment:
    STAGE: \${env:STAGE}
    SUBNETS: ${subnets}
    SECURITY_GROUP_ID: ${securityGroupId}
  stackTags:
    env: \${env:STAGE}
    service: \${self:service.name}
  tracing:
    apiGateway: false
    lambda: true

plugins:
  - serverless-webpack

custom:
  webpack:
    webpackConfig: 'lambdas/webpack/webpack.\${env:WEBPACK_CONFIG}.js'
    packager: 'yarn'
    includeModules: true

package:
  individually: true

functions:
  Initiator:
    handler: lambdas/src/initiator/index.handler
    name: ${pascalCaseProjectName}Initiator-\${self:provider.stage}
    description: Initiator of Fargate task
    role: LambdaInitiatorExecutionRole
    # Env vars given only to this Lambda
    environment:
      SECRET_ID: \${env:SECRET_ID}
      ECS_CLUSTER_NAME: \${env:CLUSTER_NAME}
      ECS_TASK_DEFINITION: !Ref ${pascalCaseProjectName}Task
      SERVICE_CONTAINER_NAME: \${env:SERVICE_CONTAINER_NAME}
    Tags:
      - Key: env
        Value: \${env:STAGE}
      - Key: service
        Value: data-jobs
      - Key: name
        Value: \${self:service.name}
      - Key: resource
        Value: Lambda
      ${musicLabTagsFunction}
    events:
      # This Lambda will be triggered on a cron schedule
      - schedule:
          name: \${self:service.name}-event-\${env:STAGE}
          description: "${description}"
          # Cron is in UTC format. -5 hours for CST
          rate: cron(0 8 ? * MON *) # Every Monday at 3am CST
          enabled: true

resources:
  Description: ${description}
  Resources:
# IAM
    TaskExecutionRole:
      Type: AWS::IAM::Role
      Properties:
        RoleName: ${projectName}-task-execution-role-\${env:STAGE}
        Tags:
          - Key: env
            Value: \${env:STAGE}
          - Key: service
            Value: data-jobs
          - Key: name
            Value: \${self:service.name}
          - Key: resource
            Value: IAM
          ${musicLabTags}
        AssumeRolePolicyDocument:
          Statement:
          - Effect: Allow
            Principal:
              Service: ecs-tasks.amazonaws.com
            Action: 'sts:AssumeRole'
        # These are the policies that the container will get. If your container needs access to something, declare it here
        # Policies:
        #   - PolicyName: super-great-policy
        #     PolicyDocument:
        #       Statement:
        #         - Effect: Allow
        #           Action:
        #             - s3:PutObject
        #           Resource: *

    # This is the role your cluster assumes. It only needs the managed policy to execute tasks.
    ${pascalCaseProjectName}ClusterRole:
      Type: AWS::IAM::Role
      Properties:
        RoleName: ${projectName}-cluster-role-\${env:STAGE}
        Tags:
          - Key: env
            Value: \${env:STAGE}
          - Key: service
            Value: data-jobs
          - Key: name
            Value: \${self:service.name}
          - Key: resource
            Value: IAM
          ${musicLabTags}
        AssumeRolePolicyDocument:
          Statement:
          - Effect: Allow
            Principal:
              Service: ecs-tasks.amazonaws.com
            Action: 'sts:AssumeRole'
        ManagedPolicyArns:
          - 'arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy'

    # This is the role the Lambda will assume. Adjust permissions accordingly.
    LambdaInitiatorExecutionRole:
      Type: AWS::IAM::Role
      Properties:
        RoleName: ${projectName}-initiator-role-\${env:STAGE}
        Tags:
          - Key: env
            Value: \${env:STAGE}
          - Key: service
            Value: data-jobs
          - Key: name
            Value: \${self:service.name}
          - Key: resource
            Value: IAM
          ${musicLabTags}
        AssumeRolePolicyDocument:
          Statement:
          - Effect: Allow
            Principal:
              Service:
                - lambda.amazonaws.com
            Action: 'sts:AssumeRole'
        Policies:
          - PolicyName: ${pascalCaseProjectName}LambdaExecutionPolicy
            PolicyDocument:
              Statement:
                - Effect: Allow
                  Action:
                    - xray:PutTraceSegments
                  Resource: '*'
                - Effect: Allow
                  Action:
                    - secretsmanager:GetSecretValue
                  Resource:
                    Fn::Join:
                      - ""
                      - - "arn:aws:secretsmanager:"
                        - !Ref AWS::Region
                        - ":"
                        - !Ref AWS::AccountId
                        - ":secret:"
                        - \${env:SECRET_NAME}
                - Effect: Allow
                  Action:
                    - logs:CreateLogStream
                    - logs:PutLogEvents
                  Resource: '*'
                - Effect: Allow
                  Action:
                    - ecs:RunTask
                    - iam:PassRole
                  Resource: !Ref ${pascalCaseProjectName}Task
                - Effect: Allow
                  Action:
                    - iam:PassRole
                  Resource:
                    - !GetAtt ${pascalCaseProjectName}ClusterRole.Arn
                    - !GetAtt TaskExecutionRole.Arn

# CloudWatch
    ${pascalCaseProjectName}LogGroup:
      Type: AWS::Logs::LogGroup
      Properties:
        # Feel free to change this to your needs
        LogGroupName: /aws/ecs/etl-data-base-job/weekly/${projectName}-\${env:STAGE}
        RetentionInDays: 14

# ECS
    ${pascalCaseProjectName}Task:
      Type: AWS::ECS::TaskDefinition
      Properties:
        Family: \${self:service.name}-job-\${env:STAGE}
        # This can be decreased with the level of intensity your container needs. 
        # For reference, a job that processed 600-900k SQL records ran out of memory at 512mb and 1gb
        Memory: '2 GB'
        Cpu: '512'
        NetworkMode: awsvpc
        ExecutionRoleArn: !GetAtt ${pascalCaseProjectName}ClusterRole.Arn
        TaskRoleArn: !GetAtt TaskExecutionRole.Arn
        RequiresCompatibilities:
          - FARGATE
        ContainerDefinitions:
          - Name: \${env:SERVICE_CONTAINER_NAME}
            Image:
              Fn::Join:
                - ""
                - - !Ref AWS::AccountId
                  - .dkr.ecr.
                  - !Ref AWS::Region
                  - .amazonaws.com/
                  - data-jobs-\${env:STAGE}:\${env:SERVICE_CONTAINER_NAME}
            LogConfiguration:
                LogDriver: awslogs
                Options:
                  awslogs-group: !Ref ${pascalCaseProjectName}LogGroup
                  awslogs-region: !Ref AWS::Region
                  awslogs-stream-prefix: ${pascalCaseProjectName}Job-\${env:STAGE}
        Tags:
          - Key: env
            Value: \${env:STAGE}
          - Key: service
            Value: data-jobs
          - Key: name
            Value: \${self:service.name}
          - Key: resource
            Value: ECS
          ${musicLabTags}

    ${pascalCaseProjectName}Service:
      Type: AWS::ECS::Service
      Properties:
        Tags:
          - Key: env
            Value: \${env:STAGE}
          - Key: service
            Value: data-jobs
          - Key: name
            Value: \${self:service.name}
          - Key: resource
            Value: ECS
          ${musicLabTags}
        ServiceName: \${self:service.name}-\${env:STAGE}
        TaskDefinition: !Ref ${pascalCaseProjectName}Task
        Cluster: ${clusterId}
        LaunchType: FARGATE
        DesiredCount: 0
        DeploymentConfiguration:
          MaximumPercent: 200
          MinimumHealthyPercent: 70
        # If you are not using a VPC, delete this block
        NetworkConfiguration:
          AwsvpcConfiguration:
            AssignPublicIp: ENABLED
            Subnets: !Split [ ",", "${subnets}"  ]
            SecurityGroups:
              - ${securityGroupId}
`
}
