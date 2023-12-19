### Instanciar uma migration

npx knex migrate:make create_users --env test

### Iniciar uma migration

npx knex migrate:latest --env test

### Destruir uma tabela

npx knex migrate:rollback --env test
