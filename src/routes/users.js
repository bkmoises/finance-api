module.exports = (app) => {
  const getAll = (_req, res) => {
    app.services.user.findAll()
      .then((result) => res.status(200).json(result));
  };

  const createUser = async (req, res) => {
    try {
      const result = await app.services.user.saveUser(req.body);
      return res.status(201).json(result[0]);
    }
    catch (err) {
      return res.status(400).json({ error: err.message });
    };
  };

  return { getAll, createUser };
};
