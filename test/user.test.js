const request = require('supertest');

const app = require('../src/app');

it('Deve listar todos os usuários', () => {
  return request(app).get('/users')
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty('name', 'Moisés Reis');
    });
});

it('Deve inserir um usuário com sucesso', () => {
  return request(app).post('/users')
    .send({name: "Maria Aparecida", mail: 'maria@mail.com'})
    .then(res => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Maria Aparecida');
      expect(res.body.mail).toBe('maria@mail.com');
    });
});
