## Datasource
[https://typeorm.io/data-source](https://typeorm.io/data-source)

## Entity
[https://typeorm.io/entities](https://typeorm.io/entities)

## Relations
[https://typeorm.io/relations](https://typeorm.io/relations)

## OPEN API - Mapped Types
[https://docs.nestjs.com/openapi/mapped-types](https://docs.nestjs.com/openapi/mapped-types)

## Commands

```bash
# create migration
$ yarn migration:create

# run migration
$ yarn migration:run

# revert migration
$ yarn migration:revert
```



curl -d '{"username":"u1","age": 10, "email":"abc@gmail.com","dob": "01-01-2023"}' -H "Content-Type: application/json" -X POST http://localhost:8088/account/v1 | jq .

curl -d '{"title": "new title"}' -H "Content-Type: application/json" -X PUT http://localhost:8088/post/v1/7cbceefc-cb70-490b-b94e-0651e8964f95 | jq .

curl -d '{"title": "new title"}' -H "Content-Type: application/json" -X PUT http://localhost:8088/post/v1/e7b40e1f-75eb-4860-a0f9-c8291af71e20 | jq .

curl -H "Content-Type: application/json" -X GET http://localhost:8088/post/v1 | jq .