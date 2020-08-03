export type OperationFunctionName = 'template-creation' | 'install-dependencies'

export interface TemplateCreationArgs {
  pathOfTemplate: string
}

export type OperationFunction = (args?: Record<string, unknown>) => Promise<void>

export interface OperationFunctionMap {
  'template-creation': OperationFunction
  'install-dependencies': OperationFunction
}

export interface ProgramArgs {
  action: OperationFunctionName
  pathOfTemplate?: string
  flags: { [key: string]: string }
}

export interface RecursiveCommandArgs {
  filePath: string
  command: string
}
