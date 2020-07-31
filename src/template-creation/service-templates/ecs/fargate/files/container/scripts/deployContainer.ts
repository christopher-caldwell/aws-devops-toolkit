const generateDeployContainer = () => {
  return `#!/bin/sh

Red="\\033[0;31m"       # Red
Green="\\033[0;32m"     # Green
BICyan="\\033[1;96m"    # Bold Cyan

# Reset
Color_Off="\\033[0m"    # Text Reset

printf "\\n\\n$BICyan$( echo Building latest artifact )$Color_Off"
printf "\\n\\n"

# The scope this file is executed from is the root of your job folder
rm -r container/dist
yarn --cwd container build

if [ $? != 0 ]
then 
    exit 1
fi

printf "\\n\\n$BICyan$( echo Deploying the Docker container )$Color_Off"
printf "\\n\\n"

AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

aws ecr get-login-password \\
    --region us-east-1 \\
| docker login \\
    --username AWS \\
    --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# If you have any env variables in your Dockerfile, 
# add them here as \`--build-arg LINK_TO_LOGS=$LINK_TO_LOGS \` after \`IMAGE_TAG\`
docker build -t \\
    $REPOSITORY_NAME:$IMAGE_TAG \\
        --build-arg LINK_TO_LOGS=$LINK_TO_LOGS \\
        --build-arg SLACK_WEBHOOK_URL=$SLACK_WEBHOOK_URL \\
    ./container
    
docker tag $REPOSITORY_NAME:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/$REPOSITORY_NAME:$IMAGE_TAG

docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/$REPOSITORY_NAME:$IMAGE_TAG`
}

export default generateDeployContainer()
