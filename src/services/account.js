module.exports = (app) => {
  const save = (account) => {
    return app.db("accounts").insert(account, "*");
  };

  const getAll = () => {
    return app.db("accounts");
  };

  const get = (filter = {}) => {
    return app.db("accounts").where(filter).select().first();
  };

  return { save, get, getAll };
};
