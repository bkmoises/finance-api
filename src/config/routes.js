module.exports = (app) => {
  const authMiddleware = app.config.passport.authenticate();

  app.route('/auth/signin')
    .post(app.routes.auth.signin);

  app.route('/users')
    .all(authMiddleware)
    .get(app.routes.users.getAll)
    .post(app.routes.users.createUser);

  app.route('/accounts')
    .all(authMiddleware)
    .get(app.routes.accounts.getAll)
    .post(app.routes.accounts.createAccount);

  app.route('/accounts/:id')
    .all(authMiddleware)
    .get(app.routes.accounts.get)
    .put(app.routes.accounts.update)
    .delete(app.routes.accounts.remove);
};
