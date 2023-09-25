module.exports = () => {
  const findAll = (req, res) => {
    const users = [
      { name: 'Moisés Reis', mail: 'moises@mail.com'}
    ];
    res.status(200).send(users);
  };

  const createUser = (req, res) => {
    res.status(201).json(req.body);
  };

  return { findAll, createUser };
};
