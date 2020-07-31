export default `#!/bin/sh

Red="\\033[0;31m"    # Red
Green="\\033[0;32m"  # Green
BICyan="\\033[1;96m" # Bold Cyan

# Reset
Color_Off="\\033[0m" # Text Reset

printf "\\n\\n$BICyan$(echo Running pre-build checks)$Color_Off"
printf "\\n\\n"

# ESlint
printf "\\n\\n$BICyan$(echo Running eslint over the project.)$Color_Off"
printf "\\n\\n"
yarn lint
if [ $? != 0 ]; then
  exit 1
fi

# Container Tests
printf "\\n\\n$BICyan$(echo Running tests in container/)$Color_Off"
yarn --cwd container test
if [ $? == 1 ]; then
  echo 'inside failure block'
  exit 1
fi
printf "\\n\\n"

# Lambda Tests
printf "\\n\\n$BICyan$(echo Running tests in lambdas/)$Color_Off"
yarn --cwd lambdas/src/initiator test
if [ $? != 0 ]; then
  exit 1
fi
printf "\\n\\n"

`
