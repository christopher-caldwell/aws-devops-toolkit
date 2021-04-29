#!/bin/sh

Red="\033[0;31m"    # Red
Green="\033[0;32m"  # Green
BICyan="\033[1;96m" # Bold Cyan
Color_Off="\033[0m" # Text Reset

printf "\n\n$BICyan$(echo Linting.)$Color_Off"
printf "\n\n"

yarn lint

if [ $? != 0 ]; then
  printf "\n\n$Red$(echo Linting failed.)$Color_Off"
  exit 1
fi

printf "\n\n$BICyan$(echo Building the project..:)$Color_Off"
printf "\n\n"

rm -r dist
yarn build
if [ $? != 0 ]; then
  printf "\n\n$Red$(echo Build failed.)$Color_Off"
  exit 1
fi

node ./scripts/writeBinForExecution.js

printf "\n\n$BICyan$(echo Publishing new version..)$Color_Off"
printf "\n\n"

yarn publish
