const indexForLambdaTs = `import ResponseHandler from 'common-aws-actions/dist/util/Responder'
import { ResponseBody } from 'common-aws-actions/dist/shared/interfaces'
import fetchAndRun, { FetchAndRunOptions } from '@ihm-software/fargate-task-initiation'

const Responder = new ResponseHandler({ corsUrl: '*', httpMethod: '*' })

const options: FetchAndRunOptions = {
  // These are the secrets from Secrets Manager that you want your container to be able to use.
  secretsToPassToContainer: {
    db_svc_etl_user: 'PGUSER',
    db_svc_etl_password: 'PGPASSWORD',
    db_encrypt_host: 'PGHOST',
    db_encrypt_database: 'PGDATABASE'
  },
  // If any of the above secrets are base64 encoded, tell the library to decode them if you want them given
  // to the container as plain text
  propertiesToDecode: {
    db_encrypt_host: true,
    db_encrypt_database: true,
  },
}

export const handler = async (event: Record<string, unknown>): Promise<ResponseBody> => {
  // These are a per request override. They must match a specific format
  // https://github.com/ihm-software/music-lab/tree/master/lib/job-initiation-helper/docs#overrides
  options.envOverrides = event.body

  try {
    // will be the response from the aws-sdk ecs runTask function
    const fargateResponse = await fetchAndRun(options)
    return Responder.respond(fargateResponse, 200)
  } catch (error) {
    return Responder.respond(error, error.statusCode || 500)
  }
}
`

const indexForLambdaJs = `const ResponseHandler = require('common-aws-actions/dist/util/Responder')
const fetchAndRun = require('@ihm-software/fargate-task-initiation').default

const Responder = new ResponseHandler({ corsUrl: '*', httpMethod: '*' })

const options = {
  // These are the secrets from Secrets Manager that you want your container to be able to use.
  secretsToPassToContainer: {
    db_svc_etl_user: 'PGUSER',
    db_svc_etl_password: 'PGPASSWORD',
    db_encrypt_host: 'PGHOST',
    db_encrypt_database: 'PGDATABASE'
  },
  // If any of the above secrets are base64 encoded, tell the library to decode them if you want them given
  // to the container as plain text
  propertiesToDecode: {
    db_encrypt_host: true,
    db_encrypt_database: true,
  },
}
exports.handler = async (event) => {
  // These are a per request override. They must match a specific format
  // https://github.com/ihm-software/music-lab/tree/master/lib/job-initiation-helper/docs#overrides
  options.envOverrides = event.body

  try {
    // will be the response from the aws-sdk ecs runTask function
    const fargateResponse = await fetchAndRun(options)
    return Responder.respond(fargateResponse, 200)
  } catch (error) {
    return Responder.respond(error, error.statusCode || 500)
  }
}
`

const indexForLambda = (isUsingTypeScript: boolean): string => (isUsingTypeScript ? indexForLambdaTs : indexForLambdaJs)

export default indexForLambda
