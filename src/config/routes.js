module.exports = (app) => {
  app.route('/users')
    .get(app.routes.users.getAll)
    .post(app.routes.users.createUser);

  app.route('/accounts')
    .get(app.routes.accounts.getAll)
    .post(app.routes.accounts.createAccount);

  app.route('/accounts/:id')
    .get(app.routes.accounts.get)
    .put(app.routes.accounts.update)
    .delete(app.routes.accounts.remove);
};
