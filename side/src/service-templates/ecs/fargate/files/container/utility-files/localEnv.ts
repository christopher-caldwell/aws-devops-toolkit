export default `# Here is the env that the container will use for local development. 
# Things like keys, passwords, etc will go here. 
# When running on Fargate, your container will accept env overrides from a Lambda function. You can provide those here
# The container's script will use them as if they were given by the Lambda override

export STAGE='local'

# For this example, we store the password in Secrets Manager, and the initiating Lambda will provide it to the container. 
# Instead of doing that, I keep the password here to maybe a local Dockerized DB
  # or the dev credentials out of version control, but still accessible.

export PGPASSWORD='password1'
export PGUSER='postgres'
export PGDATABASE='musiclab'
export PGHOST='localhost' # docker container running postgress with port exposed. 

export SLACK_WEBHOOK_URL='https://hooks.slack.com/services/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'
`
