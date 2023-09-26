module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('users').where(filter).select();
  };

  const saveUser = async (user) => {
    if (!user.name) return { error: 'O campo name é requerido.' };
    if (!user.mail) return { error: 'O campo mail é requerido.' };
    if (!user.passwd) return { error: 'O campo passwd é requerido.' };

    const userDb = await findAll({ mail: user.mail });

    if (userDb && userDb.length > 0) return { error: 'Email já cadastrado!' };

    return app.db('users').insert(user, '*');
  };

  return { findAll, saveUser };
};
