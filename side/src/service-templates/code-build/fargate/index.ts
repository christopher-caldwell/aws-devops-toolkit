import fs from 'fs-extra'

import {
  deploymentBucket,
  ecrRepositoryName,
  ecsClusterName,
  secretId,
  isUsingCustomImage,
  doesWantWebHook,
} from '@constants/musicLabConstants'
import { askQuestions } from '@/setup/askQuestions'

import {
  descriptionArgs,
  projectNameArgs,
  isForMusicLabArgs,
  deploymentBucketArgs,
  ecsClusterNameArgs,
  secretIdArgs,
  ecrRepositoryNameArgs,
  isUsingCustomImageArgs,
  doesWantWebHookArgs,
} from '@/constants/serviceQuestions'

import { generatePackageJson, generateReadme, generateTemplate } from './files/utility-files'
import writeEnv from './files/env'
import writeScripts from './files/scipts'

export interface FargateTemplateCreationArgs {
  isForMusicLab: boolean
  ecsClusterName: string
  secretId: string
  projectName: string
  ecrRepositoryName: string
  description: string
  deploymentBucket: string
  doesWantWebHooK: boolean
  isUsingCustomBuildImage: boolean
}

const createTemplate = (
  { isForMusicLab, projectName, description }: FargateTemplateCreationArgs,
  destination: string
): void => {
  try {
    // write .package.json
    const packageJson = generatePackageJson(projectName)
    fs.writeFileSync(destination + 'package.json', packageJson)

    // write README.md
    const readme = generateReadme(projectName)
    fs.writeFileSync(destination + 'README.md', readme)

    // write template.yml
    const template = generateTemplate(projectName, description, isForMusicLab)
    fs.writeFileSync(destination + 'template.yaml', template)

    // write env/
    writeEnv(destination, isForMusicLab, projectName)

    // write scripts/
    writeScripts(destination)
  } catch (error) {
    throw new Error(error)
  }
}

export const createFargatePipelineTemplate = async (destination: string): Promise<void> => {
  // These are defaults for Music Lab usage that don't need to be answered if generating infra for ML
  let givenDeploymentBucket = deploymentBucket
  let givenEcsClusterName = ecsClusterName
  let givenSecretId = secretId
  let givenEcrRepositoryName = ecrRepositoryName
  let givenIsUsingCustomImage = isUsingCustomImage
  let givenDoesWantWebHook = doesWantWebHook

  const description = (await askQuestions(descriptionArgs)) as string
  const projectName = (await askQuestions(projectNameArgs)) as string
  const isForMusicLab = (await askQuestions(isForMusicLabArgs)) as boolean

  // If they are not using this for Music Lab, enter in overrides to the defaults
  if (!isForMusicLab) {
    givenDeploymentBucket = (await askQuestions(deploymentBucketArgs)) as string
    givenEcsClusterName = (await askQuestions(ecsClusterNameArgs)) as string
    givenSecretId = (await askQuestions(secretIdArgs)) as string
    givenEcrRepositoryName = (await askQuestions(ecrRepositoryNameArgs)) as string
    givenIsUsingCustomImage = (await askQuestions(isUsingCustomImageArgs)) as boolean
    givenDoesWantWebHook = (await askQuestions(doesWantWebHookArgs)) as boolean
  }

  const fargateArgs: FargateTemplateCreationArgs = {
    isForMusicLab,
    projectName,
    description,
    deploymentBucket: givenDeploymentBucket,
    ecsClusterName: givenEcsClusterName,
    secretId: givenSecretId,
    ecrRepositoryName: givenEcrRepositoryName,
    isUsingCustomBuildImage: givenIsUsingCustomImage,
    doesWantWebHooK: givenDoesWantWebHook,
  }

  createTemplate(fargateArgs, destination)
}
