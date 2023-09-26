module.exports = (app) => {
  const findAll = () => {
    return app.db('users').select();
  };

  const saveUser = async (user) => {
    return app.db('users').insert(user, '*');
  };

  return { findAll, saveUser };
};
