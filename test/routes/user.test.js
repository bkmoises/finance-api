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
    });
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
