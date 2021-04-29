export default `#!/bin/sh

aws cloudformation delete-stack \\
  --stack-name $STACK_NAME
`
