import { createFargateTaskTemplate } from './ecs/fargate'
import { createFargatePipelineTemplate } from './code-build/fargate'

interface FunctionMap {
  [key: string]: (destination: string) => Promise<void>
}

const mapOfServices: FunctionMap = {
  fargateTask: createFargateTaskTemplate,
  fargatePipeline: createFargatePipelineTemplate,
}

/**
 * Creates a service template with given arguments
 * @param templateKey Key to a map that determines which template is created
 */
const determineWhichTemplateToWrite = async (templateKey: string, destination: string): Promise<void> => {
  await mapOfServices[templateKey](destination)
}

export default determineWhichTemplateToWrite
