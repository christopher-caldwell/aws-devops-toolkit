export default `module.exports = () => {
  // these values are required by the Fargate task library. Change them to reflect your testable values if needed.
  process.env.SUBNETS = '123,123'
  process.env.SECURITY_GROUP_ID = ''
  process.env.ECS_CLUSTER_NAME = ''
  process.env.ECS_TASK_DEFINITION = ''
  process.env.SERVICE_CONTAINER_NAME = ''
  process.env.SECRET_ID = ''
}
`
