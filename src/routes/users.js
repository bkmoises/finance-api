module.exports = (app) => {
  const findAll = (_req, res) => {
    app.services.user.findAll()
      .then((result) => res.status(200).json(result));
  };

  const createUser = async (req, res) => {
    const result = await app.services.user.saveUser(req.body);
    if (result.error) return res.status(400).json(result);
    return res.status(201).json(result[0]);
  };

  return { findAll, createUser };
};
