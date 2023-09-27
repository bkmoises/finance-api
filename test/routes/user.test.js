const request = require('supertest');

const app = require('../../src/app');

const mail = `${Date.now()}@mail.com`;

it('Deve listar todos os usuários', () => {
  return request(app).get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

it('Deve inserir um usuário com sucesso', () => {
  return request(app).post('/users')
    .send({ name: 'Maria Aparecida', mail, passwd: '123' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Maria Aparecida');
      expect(res.body.mail).toBe(mail);
      expect(res.body).not.toHaveProperty('passwd');
    });
});

it('Deve armazenar senha criptografada', async () => {
  const res = await request(app).post('/users')
    .send({
      name: 'Red Jhon',
      mail: `${Date.now()}@mail.com`,
      passwd: '123456',
    });
  expect(res.status).toBe(201);

  const { id } = res.body;
  const userDb = await app.services.user.find({ id });
  expect(userDb.passwd).not.toBeUndefined();
  expect(userDb.passwd).not.toBe('123456');
});

it('Não deve inserir usuário sem nome', () => {
  return request(app).post('/users')
    .send({ mail, passwd: '123' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('O campo name é requerido.');
    });
});

it('Não deve inserir usuário sem email', () => {
  return request(app).post('/users')
    .send({ name: 'Moisés Andrade', passwd: '123' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('O campo mail é requerido.');
    });
});

it('Não deve inserir usuário sem senha', () => {
  return request(app).post('/users')
    .send({ name: 'Moisés Andrade', mail: 'moises@mail.com' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('O campo passwd é requerido.');
    });
});

it('Não deve inserir um e-mail repetido', () => {
  return request(app).post('/users')
    .send({ name: 'Josh Kramer', mail, passwd: '123' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Email já cadastrado!');
    });
});
