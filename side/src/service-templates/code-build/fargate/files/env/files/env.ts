import { splitAndCapKebab } from '@util/formatting'
import { deploymentBucket, ecrRepositoryName } from '@constants/musicLabConstants'

export default (isForMusicLab: boolean, projectName: string, stage: string): string => {
  const functionName = splitAndCapKebab(projectName)
  let branchToBuildFrom = ''
  switch (stage) {
    case 'dev':
      branchToBuildFrom = 'develop'
      break
    case 'qa':
      branchToBuildFrom = 'release'
      break
    case 'prod':
      branchToBuildFrom = 'master'
      break
    default:
      branchToBuildFrom = ''
  }
  return `# Global
export STAGE=${stage}
export S3_BUCKET=${deploymentBucket}-${stage}
export STACK_NAME=${projectName}-build-pipeline-${stage}

# CodeBuild
export BRANCH_TO_RUN_BUILD_FROM=${branchToBuildFrom}
export REPOSITORY_URL=${
  isForMusicLab ? 'https://github.com/ihm-software/music-lab.git' : '# !----CHANGE_VALUE----! - YOUR_PATH_HERE'
}
export CONTAINER_DEPLOY_COMMAND=deploy:container:${stage}
export BUILD_COMMAND=deploy:${stage}

export JOB_CLOUD_FORMATION_STACK_NAME=${projectName}-${stage}
export INITIATOR_FUNCTION_NAME=${functionName}
# !----CHANGE_VALUE----! - change path if needed. This will determine where the build is initiated from
export FILE_PATH_FOR_WEBHOOK=jobs/weekly/${projectName}

# Build Container
export REPOSITORY_NAME=${ecrRepositoryName}
#  
export IMAGE_TAG=${isForMusicLab ? 'generic-node' : '!----CHANGE_VALUE----! - YOUR_IMAGE_HERE'}
`
}
