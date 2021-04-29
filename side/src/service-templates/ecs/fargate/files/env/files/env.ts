import { splitAndCapKebab } from '@util/formatting'

export interface EnvFileCreationArgs {
  projectName: string
  filePath: string
  ecrRepositoryName?: string
  secretId: string
  ecsClusterName: string
  isForMusicLab: boolean
}

export const generateEnv = (
  { ecsClusterName, projectName, ecrRepositoryName, secretId, isForMusicLab }: EnvFileCreationArgs,
  stage: string
): string => {
  let slackWebhookUrl = ''
  switch (stage) {
    case 'dev':
      slackWebhookUrl = 'https://hooks.slack.com/services/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'
      break
    case 'qa':
      slackWebhookUrl = 'https://hooks.slack.com/services/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'
      break
    case 'prod':
      slackWebhookUrl = 'https://hooks.slack.com/services/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'
      break
    default:
      slackWebhookUrl = ''
  }
  const functionName = splitAndCapKebab(projectName)
  if (!isForMusicLab) {
    slackWebhookUrl = '!----CHANGE_VALUE----! - YOUR_WEBHOOK_URL_HERE'
  }
  return `# Global
export STAGE=dev
export STACK_NAME=${projectName}-${stage}

# ECR
export REPOSITORY_NAME=${ecrRepositoryName}-${stage}

# ECS
export CLUSTER_NAME=${ecsClusterName}-${stage}
export SERVICE_CONTAINER_NAME=${projectName}
export DATA_MIGRATION_SERVICE_NAME=${projectName}-service-${stage}
export ECS_STACK_NAME=${projectName}-ecs-task-${stage}

# Build
export WEBPACK_CONFIG=prod

# Container
export IMAGE_TAG=${projectName}
export SLACK_WEBHOOK_URL=${slackWebhookUrl}
export LINK_TO_LOGS=https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logStream:group=${functionName}-${stage};streamFilter=typeLogStreamPrefix

# Lambdas
export SECRET_NAME=${secretId}-${stage}-??????
export SECRET_ID=${secretId}-${stage}
`
}
