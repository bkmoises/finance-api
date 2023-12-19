const app = require('express')();

app.get('/', (_req, res) => {
  res.status(200).send();
});

app.get('/users', (_req, res) => {
  const users = [
    { name: 'John Doe', email: 'john@mail.com' }
  ]
  res.status(200).json(users);
});

module.exports = app;
