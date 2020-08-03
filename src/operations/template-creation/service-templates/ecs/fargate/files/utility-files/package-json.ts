export interface GeneratePackageJsonArgs {
  projectName: string
  description: string
  isUsingTypeScript: boolean
}

/**
 * Writes a package.json for the global scope
 * @param projectName
 */
export const generatePackageJson = ({
  projectName,
  description,
  isUsingTypeScript,
}: GeneratePackageJsonArgs): string => {
  const dependenciesIfUsingTs = isUsingTypeScript
    ? `
    "@typescript-eslint/eslint-plugin": "^2.33.0",
    "@typescript-eslint/parser": "^2.33.0",
    "eslint-import-resolver-typescript": "^2.0.0",`
    : ''

  return `{
  "name": "${projectName}",
  "version": "1.0.0",
  "description": "${description}",
  "private": true,
  "scripts": {
    "install-dependencies": "node scripts/recursiveDependencyInstall.js",
    "prettier": "prettier --write '**/*.(js|ts)'",
    "lint": "eslint .",
    "pre-build": "sh scripts/pre-build.sh",
    "deploy:dev": ". ./env/.env.dev && serverless deploy --region us-east-1",
    "deploy:qa": ". ./env/.env.qa && serverless deploy",
    "deploy:prod": ". ./env/.env.prod && serverless deploy",
    "deploy:container:dev": ". ./env/.env.dev && sh container/scripts/deploy-container.sh",
    "deploy:container:qa": ". ./env/.env.qa && sh container/scripts/deploy-container.sh",
    "deploy:container:prod": ". ./env/.env.prod && sh container/scripts/deploy-container.sh",
    "clean:dev": ". ./env/.env.dev && serverless remove",
    "clean:qa": ". ./env/.env.qa && serverless remove",
    "clean:prod": ". ./env/.env.prod && serverless remove"
  },
  "devDependencies": {${dependenciesIfUsingTs}
    "eslint": "^6.8.0",
    "eslint-config-airbnb-base": "^14.1.0",
    "eslint-plugin-import": "^2.20.2",
    "prettier": "^2.0.5",
    "serverless": "^1.67.3",
    "serverless-webpack": "^5.3.1",
    "webpack": "^4.42.1",
    "webpack-merge": "^4.2.2",
    "eslint-import-resolver-webpack": "^0.12.1"
  }
}
`
}
