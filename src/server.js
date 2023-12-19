const express = require('express');

const app = express();

const PORT = 3001

app.get('/', (_req, res) => {
  res.status(200).send();
});

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))
