import fs from 'fs-extra'
import path from 'path'

const sql = `CREATE SCHEMA dbo;

CREATE TABLE dbo."iHRCustomStreamHistory" (
  "some_column" varchar(30)
);
`

const createSqlFolder = (filePath: string): void => {
  fs.mkdirSync(filePath + '/sql')
  const targetFilePath = path.resolve(process.cwd(), filePath + '/sql')

  // write setup.sql
  fs.writeFileSync(targetFilePath + '/setup.sql', sql)
}

export default createSqlFolder
