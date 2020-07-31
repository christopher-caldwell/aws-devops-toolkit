export default `{
  "name": "db",
  "version": "1.0.0",
  "description": "Postgres Local DB",
  "scripts": {
    "start": ". ./.env.local && docker-compose up",
    "stop": "docker-compose down"
  },
  "license": "ISC"
}
`
