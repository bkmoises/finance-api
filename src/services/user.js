const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('users').where(filter).select();
  };

  const saveUser = async (user) => {

    if (!user.name) throw new ValidationError('O campo name é requerido.');
    if (!user.mail) throw new ValidationError('O campo mail é requerido.');
    if (!user.passwd) throw new ValidationError('O campo passwd é requerido.');

    const userDb = await findAll({ mail: user.mail });

    if (userDb && userDb.length > 0) throw new ValidationError('Email já cadastrado!');

    return app.db('users').insert(user, '*');
  };

  return { findAll, saveUser };
};
