export default `postgres:
  image: postgres:10.11
  environment: 
    POSTGRES_PASSWORD: password1
    POSTGRES_USER: postgres
    POSTGRES_DB: musiclab
  ports:
    - "5432:5432"
  volumes:
    - ./sql/setup.sql:/docker-entrypoint-initdb.d/init.sql
`
