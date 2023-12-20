module.exports = {
  test: {
    client: "pg",
    version: "16.0",
    connection: {
      host: "localhost",
      user: "root",
      password: "root",
      database: "finance",
    },
    migrations: {
      directory: "src/migrations",
    },
  },
};
