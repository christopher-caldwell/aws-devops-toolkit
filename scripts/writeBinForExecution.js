const fs = require('fs-extra')
const path = require('path')

const textForBinFile = `#!/usr/bin/env node


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\\ DO NOT MODIFY THIS FILE /!\\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 
// 
// The purpose of this file is call the functionality while declaring that this bin is for Node.

require('./bundle.js')
`

const basePath = path.resolve(process.cwd())

fs.ensureDirSync(basePath + '/dist')

fs.writeFileSync(basePath + '/dist/index.js', textForBinFile)
