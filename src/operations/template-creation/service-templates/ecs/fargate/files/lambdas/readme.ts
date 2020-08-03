/* eslint-disable max-len */

export default `# Lambda Initiator of Fargate Job

Here is the lambda that gets the container started. It runs on a configurable cron schedule by default.

## Usage

The main driving force behind this Lambda is [@ihm-software/fargate-task-initiation](https://github.com/ihm-software/music-lab/packages/272074).
This library helps with the execution of fargate tasks.

In the [function code](./src/initiator/index.js), you can see the overrides available. You can also check out the [docs](https://github.com/ihm-software/music-lab/tree/master/lib/job-initiation-helper/docs#overrides) for a more in depth explanation.

## Env Override

This function can send per request overrides to the container. 
From the AWS console, or any other means of executing the Lambda, add the following to the event.

\`\`\`json
// The following are the ONLY supported env overrides

{
  "body": {
    "LoadProcess": {
      "name": "TYPE_OF_OPERATION",
      "value": "Manual"
    }
  }
}
\`\`\`
`
