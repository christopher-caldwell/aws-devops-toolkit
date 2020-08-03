/**
 * Generates a buildspec for the pipeline control
 * @param filePathOfJob
 */
const generateBuildSpec = (filePathOfJob: string): string => {
  if (!filePathOfJob || filePathOfJob === '') throw new Error('No file path specified')
  return `version: 0.2

phases:
install:
  commands:
    # Start the Docker daemon
    - nohup /usr/bin/dockerd --host=unix:///var/run/docker.sock --host=tcp://127.0.0.1:2375 --storage-driver=overlay2&
    - cd ${filePathOfJob}
    - yarn install-dependencies
pre_build:
  commands:
    - yarn pre-build
build:
  commands:
    - yarn $CONTAINER_DEPLOY_COMMAND
    - yarn $BUILD_COMMAND
  `
}

export default generateBuildSpec
