export type OperationFunctionName = 'template-creation' | 'install-dependencies'

export type OperationFunction = () => Promise<void>

export interface OperationFunctionMap {
  'template-creation': OperationFunction
}
