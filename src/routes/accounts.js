module.exports = (app) => {
  const create = (req, res) => {
    app.services.account.save(req.body).then((result) => {
      return res.status(201).json(result[0]);
    });
  };

  const findAll = (_req, res) => {
    app.services.account.getAll().then((result) => {
      return res.status(200).json(result);
    });
  };

  const find = (req, res) => {
    app.services.account.get({ id: req.params.id }).then((result) => {
      return res.status(200).json(result);
    });
  };

  return { create, find, findAll };
};
