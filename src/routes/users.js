module.exports = (app) => {
  const getAll = (_req, res, next) => {
    app.services.user.findAll()
      .then((result) => res.status(200).json(result))
      .catch(err => next(err));
  };

  const createUser = async (req, res, next) => {
    try {
      const result = await app.services.user.saveUser(req.body);
      return res.status(201).json(result[0]);
    }
    catch (err) {
      return next(err);
    };
  };

  return { getAll, createUser };
};
