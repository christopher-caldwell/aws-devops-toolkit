# Create AWS Templates

<p >
  This tool is used to quickly create AWS infrastructure templates with little to no manual configuration. Answer some questions, adjust a few fields for your specific use case, and you're ready to go.
</p>

<p align="center">
  <h4>Specs</h4>
  <img src="https://img.shields.io/badge/types-TypeScript%20v3.9.5-blue">
  <img src="https://img.shields.io/badge/npm-v0.0.4-blue">
</p>

---

## Setup

**_You first need a GitHub access token, that has has permissions to read packages from the `music-lab` repository._**

Create or add to `.yarnrc` or `.npmrc` to the root level of the consumer. If you want your entire repository to use the same settings, add this file at the root of your repository.

This has already been done for Music Lab.

    For npm:
    @ihm-software:registry=https://npm.pkg.github.com/ihm-software

    For yarn:
    "@ihm-software:registry" "https://npm.pkg.github.com/ihm-software"

You will need to be authenticated through either logging in via
`npm login --registry=https://npm.pkg.github.com --scope=@ihm-software`

or have your access token in the rc file.

**npm:**
`//npm.pkg.github.com/:_authToken=TOKEN`

**NOTE**

> Yarn does not recognize the token in the `.npmrc`. You will need to login via npm to be able to use yarn.

## Usage

Run the script by using

```bash
npx @ihm-software/create-aws-template FILE_PATH_TO_WHERE_YOU_WANT_A_PROJECT_MADE/NAME_OF_NEW_FOLDER
```

This will create a folder at the location specified. Meaning if you give `../../jobs/some-folder`,
the script will attempt to make a directory called `some-folder` at the `jobs/` directory, 2 levels up from your current location.

The first and only argument is the file path where your template will be created.

You will be asked a few questions, then a project will be generated for you.

### Example

```sh
npx -p @ihm-software/create-aws-template node . ./some-path
```

This will create a folder called `some-path/` then create all the files underneath that folder.

This argument must not already be a folder, it will error out.
