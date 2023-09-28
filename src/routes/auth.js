const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

const ValidationError = require('../errors/ValidationError');

const secret = 'ea1b4eeb6affbd5fa111c9387eaa5b1923cafee8ad69550e38c02cd8c48e1396eb09208a632854308191a5d357f822adccc63941b053ed2bd5880df3a3d90ed4'

module.exports = (app) => {
  const signin = (req, res, next) => {
    app.services.user.find({ mail: req.body.mail })
      .then((user) => {
        if (!user) throw new ValidationError('Usuário ou senha invalida!');
        if (bcrypt.compareSync(req.body.passwd, user.passwd)) {
          const payload = {
            id: user.id,
            name: user.name,
            mail: user.mail,
          };
          const token = jwt.encode(payload, secret);
          res.status(200).json({ token });
        } else {
          throw new ValidationError('Usuário ou senha invalida!');
        }
      }).catch((err) => next(err));
  };
  return { signin };
};
