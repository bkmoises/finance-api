const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const findAll = () => {
    return app.db('users').select(['id', 'name', 'mail']);
  };

  const find = (filter = {}) => {
    return app.db('users').where(filter).first();
  };

  const getPasswdHash = (passwd) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(passwd, salt);
  };

  const saveUser = async (user) => {

    if (!user.name) throw new ValidationError('O campo name é requerido.');
    if (!user.mail) throw new ValidationError('O campo mail é requerido.');
    if (!user.passwd) throw new ValidationError('O campo passwd é requerido.');

    const userDb = await find({ mail: user.mail });
    if (userDb) throw new ValidationError('Email já cadastrado!');

    const newUser = { ...user };
    newUser.passwd = getPasswdHash(user.passwd);

    return app.db('users').insert(newUser, ['id', 'name', 'mail']);
  };

  return { findAll, saveUser, find };
};
