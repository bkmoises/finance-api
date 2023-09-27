module.exports = (app) => {
  const getAll = (_req, res) => {
    app.services.account.findAll()
      .then((result) => {
        return res.status(200).json(result);
      });
  };

  const get = (req, res) => {
    app.services.account.findById({ id: req.params.id })
      .then((result) => {
        return res.status(200).json(result);
      });
  };

  const createAccount = (req, res) => {
    app.services.account.saveAccount(req.body)
      .then((result) => {
        return res.status(201).json(result[0]);
      });
  };

  const remove = (req, res) => {
    app.services.account.deleteAccount({ id: req.params.id })
      .then(() => {
        return res.status(204).json({});
      });
  };

  const update = (req, res) => {
    app.services.account.updateAccount(req.params.id, req.body)
      .then((result) => {
        return res.status(200).json(result[0]);
      });
  };


  return {
    getAll, get, createAccount, update, remove,
  };
};
