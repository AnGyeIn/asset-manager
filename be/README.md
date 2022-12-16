Asset Manager Backend

# local databse using MySQL Docker

`docker run -p 3306:3306 --name asset_manager_db -e MYSQL_ROOT_PASSWORD=qwer1234 -d mysql:8.0.23`

## access MySQL server in container terminal

- `mysql -u root -p`
- Enter password(`qwer1234`)
- `use assetmangerdb`

# dev run

`./gradlew bootRun`

## openAPI (Swagger 3)

http://localhost:8080/swagger-ui/index.html

# build

`./gradlew build`

## without test

`./gradlew build -x test`
