module.exports = (app) => {
  const findAll = (_req, res) => {
    app
      .db("users")
      .select()
      .then((result) => {
        res.status(200).json(result);
      });
  };

  const create = async (req, res) => {
    const result = await app.db("users").insert(req.body, "*");
    return res.status(201).json(result[0]);
  };

  return { findAll, create };
};
