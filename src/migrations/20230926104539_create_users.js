exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('mail').notNullable().unique();
    table.string('passwd').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
