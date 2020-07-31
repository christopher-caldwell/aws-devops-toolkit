import fs from 'fs-extra'

import { deploymentBucket, ecrRepositoryName, ecsClusterName, secretId } from '@constants/musicLabConstants'

import { askQuestions } from '@/setup/askQuestions'
import askToInstallDependencies from '@/setup/askDependencyInstall'

import {
  descriptionArgs,
  isForMusicLabArgs,
  projectNameArgs,
  isUsingTypeScriptArgs,
  deploymentBucketArgs,
  ecsClusterNameArgs,
  secretIdArgs,
  ecrRepositoryNameArgs,
} from '@/constants/serviceQuestions'

import { GenerateTemplateArguments, generateTemplate } from './files/utility-files/serverless'
import { GeneratePackageJsonArgs, generatePackageJson } from './files/utility-files/package-json'
import generateReadme from './files/utility-files/readme'
import generateBuildSpec from './files/utility-files/buildspec'
import prettierrc from './files/utility-files/prettier'
import generateEslintrc from './files/utility-files/eslintrc'
import generateScripts from './files/scripts'
import generateLambdas from './files/lambdas'
import generateEnv from './files/env'
import generateContainer from './files/container'
import generateLocalDb from './files/db'

export interface FargateTemplateCreationArgs extends GenerateTemplateArguments, GeneratePackageJsonArgs {
  ecsClusterName: string
  secretId: string
  ecrRepositoryName: string
  isUsingTypeScript: boolean
}

const createTemplate = (
  {
    isForMusicLab,
    ecsClusterName,
    secretId,
    projectName,
    ecrRepositoryName,
    description,
    deploymentBucket,
    isUsingTypeScript,
  }: FargateTemplateCreationArgs,
  destination: string
): void => {
  try {
    // write .prettierrc
    fs.writeFileSync(destination + '/.prettierrc', prettierrc)

    // write README.md
    const readme = generateReadme(isForMusicLab)
    fs.writeFileSync(destination + '/README.md', readme)

    // write package.json
    const packageJson = generatePackageJson({ projectName, description, isUsingTypeScript })
    fs.writeFileSync(destination + '/package.json', packageJson)

    // write .eslintrc
    const eslintrc = generateEslintrc(isUsingTypeScript)
    fs.writeFileSync(destination + '/.eslintrc', eslintrc)

    // write .eslintrc
    const template = generateTemplate({ isForMusicLab, projectName, deploymentBucket, description })
    fs.writeFileSync(destination + '/serverless.yml', template)

    // write buildspec.yml
    const buildSpec = generateBuildSpec(destination)
    fs.writeFileSync(destination + '/buildspec.yml', buildSpec)

    // write scripts/
    generateScripts(destination)

    generateLambdas(destination, isUsingTypeScript)

    generateEnv({
      filePath: destination,
      projectName,
      ecrRepositoryName,
      ecsClusterName,
      secretId,
      isForMusicLab,
    })

    generateContainer(destination, isUsingTypeScript)

    generateLocalDb(destination)
  } catch (error) {
    throw new Error(error)
  }
}

export const createFargateTaskTemplate = async (destination: string): Promise<void> => {
  let givenDeploymentBucket = deploymentBucket
  let givenEcsClusterName = ecsClusterName
  let givenSecretId = secretId
  let givenEcrRepositoryName = ecrRepositoryName

  const description = (await askQuestions(descriptionArgs)) as string
  const isUsingTypeScript = (await askQuestions(isUsingTypeScriptArgs)) as boolean
  const projectName = (await askQuestions(projectNameArgs)) as string
  const isForMusicLab = (await askQuestions(isForMusicLabArgs)) as boolean

  // If they are not using this for Music Lab, enter in overrides to the defaults
  if (!isForMusicLab) {
    givenDeploymentBucket = (await askQuestions(deploymentBucketArgs)) as string
    givenEcsClusterName = (await askQuestions(ecsClusterNameArgs)) as string
    givenSecretId = (await askQuestions(secretIdArgs)) as string
    givenEcrRepositoryName = (await askQuestions(ecrRepositoryNameArgs)) as string
  }

  const fargateArgs: FargateTemplateCreationArgs = {
    isForMusicLab,
    projectName,
    description,
    deploymentBucket: givenDeploymentBucket,
    ecsClusterName: givenEcsClusterName,
    secretId: givenSecretId,
    ecrRepositoryName: givenEcrRepositoryName,
    isUsingTypeScript,
  }

  createTemplate(fargateArgs, destination)

  await askToInstallDependencies(destination)
}
