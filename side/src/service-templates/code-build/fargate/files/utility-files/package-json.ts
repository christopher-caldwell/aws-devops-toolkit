/**
 * Writes a package.json for the global scope
 * @param projectName
 */
const generatePackageJson = (projectName: string): string => {
  return `{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "CodeBuild Pipeline for deploying the job",
  "scripts": {
    "deploy:dev": ". ./env/.env.dev && sh scripts/deploy.sh",
    "delete:dev": ". ./env/.env.dev && sh scripts/delete.sh",
    "deploy:qa": ". ./env/.env.qa && sh scripts/deploy.sh",
    "delete:qa": ". ./env/.env.qa && sh scripts/delete.sh",
    "deploy:prod": ". ./env/.env.prod && sh scripts/deploy.sh",
    "delete:prod": ". ./env/.env.prod && sh scripts/delete.sh"
  },
  "private": true
}
`
}

export default generatePackageJson
