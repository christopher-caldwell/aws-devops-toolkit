/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import inquirer from 'inquirer'
import { infrastructureOptions, InfrastructureOption, questionMap } from '@constants/serviceOptions'

const serviceOptions = [
  {
    type: 'list',
    name: 'service',
    message: 'Which service are you using?',
    choices: infrastructureOptions,
  },
]

/**
 * Prompts user for input on which AWS service they want to create
 */
export const askInitialPrompt = async (): Promise<string> => {
  const { service } = await inquirer.prompt(serviceOptions)
  const choicesForSelectedService = questionMap[service]
  const serviceSpecificOptions = [
    {
      type: 'list',
      name: 'serviceSpecificTemplate',
      message: 'What do you want to create?',
      choices: choicesForSelectedService,
    },
  ]
  const { serviceSpecificTemplate } = await inquirer.prompt(serviceSpecificOptions)
  return serviceSpecificTemplate
}

export interface AskQuestionsOptions {
  type?: string
  name: string
  message: string
  choices?: InfrastructureOption[]
}

/**
 * Ask a configurable set of questions
 * @param options Options to configure the prompt
 */
export const askQuestions = async ({ type = 'list', name, message, choices = [] }: AskQuestionsOptions) => {
  const listOptions = [
    {
      type,
      name,
      message,
      choices,
    },
  ]
  const result = await inquirer.prompt(listOptions)
  return result[name]
}
