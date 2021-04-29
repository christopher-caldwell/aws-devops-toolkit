const generateDockerfile = `FROM node:12.16.3-alpine

# Any environment args used by the container will go here
ARG SLACK_WEBHOOK_URL
ARG LINK_TO_LOGS

ENV SLACK_WEBHOOK_URL=\${SLACK_WEBHOOK_URL}
ENV LINK_TO_LOGS=\${LINK_TO_LOGS}

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

WORKDIR /app

COPY dist/bundle.js /app

CMD [ "node", "bundle.js" ]
`

export default generateDockerfile
