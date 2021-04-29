import { AskQuestionsOptions } from '../setup/askQuestions'

export const isUsingWebpackArgs: AskQuestionsOptions = {
  type: 'confirm',
  name: 'isUsingWebpackArgs',
  message: 'Are you using webpack?',
}

export const willInstallDepArgs: AskQuestionsOptions = {
  message: 'Do you want to install the project dependencies?',
  type: 'confirm',
  name: 'willInstall',
}

export const isUsingTypeScriptArgs: AskQuestionsOptions = {
  type: 'confirm',
  name: 'isUsingTypeScript',
  message: 'Are you using TypeScript?',
}

export const isForMusicLabArgs: AskQuestionsOptions = {
  type: 'confirm',
  name: 'isForMusicLab',
  message: 'Is this for Music Lab?',
}

export const projectNameArgs: AskQuestionsOptions = {
  type: 'input',
  name: 'projectName',
  message: 'What is the name of your project? ( case sensitive, use kebab-case )',
}

export const descriptionArgs: AskQuestionsOptions = {
  type: 'input',
  name: 'description',
  message: 'Give a description of what this job will do:',
}

export const deploymentBucketArgs: AskQuestionsOptions = {
  type: 'input',
  name: 'deploymentBucket',
  message: 'Which S3 bucket will this infrastructure be deployed to? ',
}

export const ecsClusterNameArgs: AskQuestionsOptions = {
  type: 'input',
  name: 'ecsClusterName',
  message: 'What is the name of your ECS Cluster? ',
}

export const secretIdArgs: AskQuestionsOptions = {
  type: 'input',
  name: 'secretId',
  message: 'What is the name of your Secret stored on Secrets Manager? ',
}

export const ecrRepositoryNameArgs: AskQuestionsOptions = {
  type: 'input',
  name: 'ecrRepositoryName',
  message: 'What is the name of your ECR Repository? ',
}

export const doesWantWebHookArgs: AskQuestionsOptions = {
  type: 'input',
  name: 'doesWantWebHook',
  message: 'Do you want this build to be triggered by a web hook? ',
}

export const isUsingCustomImageArgs: AskQuestionsOptions = {
  type: 'input',
  name: 'isUsingCustomImage',
  message: 'Do you use a custom build image? ',
}
