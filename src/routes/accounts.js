module.exports = (app) => {
  const getAll = (_req, res, next) => {
    app.services.account.findAll()
      .then((result) => {
        return res.status(200).json(result);
      }).catch(err => next(err));
  };

  const get = (req, res, next) => {
    app.services.account.findById({ id: req.params.id })
      .then((result) => {
        return res.status(200).json(result);
      }).catch(err => next(err));
  };

  const createAccount = (req, res, next) => {
    app.services.account.saveAccount(req.body)
      .then((result) => {
        return res.status(201).json(result[0]);
      }).catch(err => next(err));
  };

  const remove = (req, res, next) => {
    app.services.account.deleteAccount({ id: req.params.id })
      .then(() => {
        return res.status(204).json({});
      }).catch(err => next(err));
  };

  const update = (req, res, next) => {
    app.services.account.updateAccount(req.params.id, req.body)
      .then((result) => {
        return res.status(200).json(result[0]);
      }).catch(err => next(err));
  };


  return {
    getAll, get, createAccount, update, remove,
  };
};
