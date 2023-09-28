const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const secret = 'ea1b4eeb6affbd5fa111c9387eaa5b1923cafee8ad69550e38c02cd8c48e1396eb09208a632854308191a5d357f822adccc63941b053ed2bd5880df3a3d90ed4';

module.exports = (app) => {
  const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(params, (payload, done) => {
    app.services.user.find({ id: payload.id })
      .then((user) => {
        if (user) done(null, { ...payload });
        else done(null, false);
      })
      .catch((err) => done(err, false));
  });

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
};
