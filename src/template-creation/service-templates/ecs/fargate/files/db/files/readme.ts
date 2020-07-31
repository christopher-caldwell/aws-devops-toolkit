export default `# Local Postgres Instance

This folder contains a local Docker image of the Music Lab Postgres DB applicable to the job. 

## Setup

Copy the contents of [.env.example](.env.example), and paste them into a new file called \`.env.local\`. This is the configuration for your user, so ensure that the [local project root env](../.env.example) matches this one.

## Running

Simply run \`yarn start\` to start the container and run the SQL seeder scripts. 

When done, cancel the process, and run \`yarn stop\` to stop the DB container.

## Seeder Files

To change the setup of the db inside the container, make any necessary edits to [the seed file](sql/setup.sql). 
This file is ran when the container starts, hydrating your local DB.
`
