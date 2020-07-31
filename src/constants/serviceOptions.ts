const codeBuildKey = 'codeBuild'
const ecsKey = 'ecs'

export interface InfrastructureOption {
  name: string
  value: string
}

/**
 * List of infrastructure choices that this tool is capable of making
 */
export const infrastructureOptions: InfrastructureOption[] = [
  {
    name: 'ECS',
    value: ecsKey,
  },
  {
    name: 'CodeBuild',
    value: codeBuildKey,
  },
]

/**
 * List of choices for ECS
 */
export const ecsOptions: InfrastructureOption[] = [
  {
    name: 'Fargate task started by Lambda',
    value: 'fargateTask',
  },
]

/**
 * List of choices for ECS
 */
export const codeBuildOptions: InfrastructureOption[] = [
  {
    name: 'Pipeline: Fargate task driven by Lambda',
    value: 'fargatePipeline',
  },
]

interface QuestionMap {
  [key: string]: InfrastructureOption[]
}

export const questionMap: QuestionMap = {
  [ecsKey]: ecsOptions,
  [codeBuildKey]: codeBuildOptions,
}
