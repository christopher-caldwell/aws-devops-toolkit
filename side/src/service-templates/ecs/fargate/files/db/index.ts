import fs from 'fs-extra'
import path from 'path'

// README
import readme from './files/readme'

// docker-compose
import dockerCompose from './files/dockerCompose'

// package.json
import packageJson from './files/packageJson'

// env.local / example
import { envLocal, envExample } from './files/env'

// sql/
import generateSql from './files/sql'

const createLocalDbFolder = (destination: string): void => {
  fs.mkdirSync(destination + '/db')
  const targetFilePath = path.resolve(destination + '/db')

  // readme
  fs.writeFileSync(targetFilePath + '/README.md', readme)

  // docker-compose
  fs.writeFileSync(targetFilePath + '/docker-compose.yml', dockerCompose)

  // package.json
  fs.writeFileSync(targetFilePath + '/package.json', packageJson)

  // env
  fs.writeFileSync(targetFilePath + '/.env.example', envExample)
  fs.writeFileSync(targetFilePath + '/.env.local', envLocal)

  // sql/
  generateSql(targetFilePath)
}

export default createLocalDbFolder
