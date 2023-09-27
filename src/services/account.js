module.exports = (app) => {
  const saveAccount = (account) => {
    return app.db('accounts').insert(account, '*');
  };

  const findAll = () => {
    return app.db('accounts').select();
  };

  const findById = (filter = {}) => {
    return app.db('accounts').where(filter).first();
  };

  const updateAccount = (id, account) => {
    return app.db('accounts').where({ id }).update(account, '*');
  };

  const deleteAccount = (id) => {
    return app.db('accounts').where(id).delete();
  };

  return {
    saveAccount, findAll, findById, updateAccount, deleteAccount
  };
};
