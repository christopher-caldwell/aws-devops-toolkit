/* eslint-disable max-len */

const generateReadme = `# Container for Job Execution

The containerized service to do wild things.

## Setup

From the root, run \`yarn install-dependencies\` to install all the dependencies needed to run this job.

Create a \`.env.local\` using the example as a template. This can be used for local development without having to build and deploy the container

## Running

"Nodemon is used to watch the \`dist/\`, while webpack is used to watch \`src/\`. Any changes to the code are re-built, then executed, very similar to Webpack's hot module reloading."

Use \`yarn dev\` to start the development server.

If that gives any sort of error like it can't find the file, use \`yarn build\` to create a base, then try \`yarn dev\` again.

## Environment Variables

In order for the container to consume env variables, you need to add the declaration in 3 places.

1. The \`deploy.sh\` file, under \`scripts/\`. Under the \`docker build\` command, add your ENV name as a build arg:
  \`--build-arg LINK_TO_LOGS=$LINK_TO_LOGS \`

2. The Dockerfile, as a build arg, and as an env:

\`\`\`Dockerfile
ARG LINK_TO_LOGS

ENV LINK_TO_LOGS=\${LINK_TO_LOGS}
\`\`\`

3. Finally in the \`.env\` of your given environment. In the root, there is a folder called \`env/\`, add the new var in the same format as the others.


`

export default generateReadme
