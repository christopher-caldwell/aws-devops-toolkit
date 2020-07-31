const nonMusicLabReadme = `# ETL Fargate Job

This template was generated with [@ihm-software/create-aws-templates](https://github.com/ihm-software/music-lab)

The \`container/\` and \`lambdas/\` folder have their own READMEs with detailed instructions.

## Build Steps

When you first get the project, install the dependencies with \`yarn install-dependencies\`. 
This is an option during the script, so either do it there, or before starting.

After they're installed, run \`yarn pre-build\` to do the linting and tests for the Lambdas and container. 

### Container

If you'd like to begin working on the container, run \`cd container/\`, then \`yarn build\`.

After the initial artifact is built, you can run \`yarn dev\` to begin the development process.

### Lambdas

Nothing much should need to change here. The only things are the secrets fetched. 

## Deployment Steps

From the root of the project, run \`yarn deploy:dev\` ( or sub dev for the desired stage ).
This will deploy the Lambda, and the infrastructure for the Fargate job.

Again from the root, run \`yarn deploy:container:dev\`. This will build and upload the container to ECR and make it ready for usage.

From here, you can run the Lambda from the AWS console, which will initiate the container.

## Setup

Change the applicable values for your use.

### Environment Files

The versatility of this comes from the env files. They control much of the functionality, and have to be done right. It's difficult to make a tool that suits everyone's environment setup, so take special care to get these values right.

You may need to change the following. If it's not listed here, it's used directly by the template and does not require any intervention.

**:arrow_right: Each of these were prompts at launch, but the generated pattern might not fit your setup.**

#### ECS Cluster

The generated pattern is the ECS CLuster name given at launch, and the env.

#### ECR Repository

Depending on how your containers are stored, you might need to change this value.

The generated pattern is the ECR name given at launch, and the env.

#### Secrets

Fix any errors to \`SECRET_NAME\` and \`SECRET_ID\`. The \`?????\` is an AWS wildcard allowing access to the secret regardless of the current rotation.

The generated pattern is the Secret ID given at launch, and the env.

### \`serverless.yml\`

You can search for \`#CHANGE_VALUE\` for all the locations where your input is needed.

You'll need values for the following:

#### Cluster

This is the ECS cluster your task will be a child of. In Music Lab, we have one ETL cluster per environment. It works well.

You will need the logical name of the cluster ( plain text like \`etl-data-cluster\`) as well as the ARN for the cluster.

The logical name is used by initiator Lambda under the env variable \`ECS_CLUSTER_NAME\` - around line 44.

The ARN is used by the \`AWS::ECS::Service\` - around line 220

#### Subnets

If you're not using a VPC, this might not be the tool for you.

If you are, party on, Wayne!

The expectation is that you're providing a comma delimited list of subnets.

- Used by the Lambda around **line 18** - \`SUBNETS\`
- Used by the ECS service around **line 251**. - \`Subnets\`. If you're providing them as a comma delimited string, use the CF intrinsic function for splitting them.

\`\`\`yml
Subnets: !Split [',', '1234,1234,1234']
\`\`\`

Music Lab stores them as CF output variables, which makes it really easy to re-use them. Serverless provides a way to reach out to other CF templates.

\`\`\`yml
Subnets: !Split [',', '\${cf:NAME_OF_OUTPUTTING_STACK.NAME_OF_EXPORT}']
\`\`\`

#### Security Group ID

Finally, there is the Security Group.

Used around **line 19** as \`SECURITY_GROUP_ID\`
Used around **line 252** as \`SecurityGroups\`. THis one is a list of Sg Ids
`

const musicLabReadme = `# ETL Job

A weekly job

<!-- Place the CodeBuild badge urls here -->

## Dev
![]()

## QA
![]()
 
## Production 
![]()

## Cron Schedule

This Lambda runs on Wednesday's at 2pm CST. You can change it in \`serverless.yml\` underneath the functions -> events.

## Build Steps

When you first get the project, install the dependencies with \`yarn install-dependencies\`. 
This is an option during the script, so either do it there, or before starting.

After they're installed, run \`yarn pre-build\` to do the linting and tests for the Lambdas and container. 

### Container

If you'd like to begin working on the container, run \`cd container/\`, then \`yarn build\`.

After the initial artifact is built, you can run \`yarn dev\` to begin the development process.

### Lambdas

Nothing much should need to change here. The only things are the secrets fetched. 

## Deployment Steps

From the root of the project, run \`yarn deploy:dev\` ( or sub dev for the desired stage ).
This will deploy the Lambda, and the infrastructure for the Fargate job.

Again from the root, run \`yarn deploy:container:dev\`. This will build and upload the container to ECR and make it ready for usage.

From here, you can run the Lambda from the AWS console, which will initiate the container.

### Env Override

To override, pass a request body to this Lambda from the AWS Console in the following format.

\`\`\`json
// This is an example. 
// \`name\` will be the name that the container uses. \`value\` will be the value the name holds.
{
  "body": {
    "TargetRunDate": {
      "name": "TARGET_RUN_DATE",
      "value": "20170312"
    }
  }
}
\`\`\`
`

const generateReadme = (isForMusicLab: boolean): string => (isForMusicLab ? musicLabReadme : nonMusicLabReadme)

export default generateReadme
