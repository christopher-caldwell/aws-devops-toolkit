export type OperationFunctionName = 'template-creation' | 'recursive-command'

export interface TemplateCreationArgs {
  pathOfTemplate: string
}

export type OperationFunction = (args?: Record<string, unknown>) => Promise<void>

export interface OperationFunctionMap {
  'template-creation': OperationFunction
  'recursive-command': OperationFunction
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
