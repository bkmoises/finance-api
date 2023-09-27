const request = require('supertest');
const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';

let user;


beforeAll(async () => {
  const result = await app.services.user.saveUser({
    name: 'John Kramer',
    mail: `${Date.now()}@mail.com`,
    passwd: '123'
  });
  user = { ...result[0] };
});

it('Deve inserir uma conta com sucesso', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Conta 1', user_id: user.id })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Conta 1');
    });
});

it('Deve listar todas as contas', () => {
  return app.db('accounts')
    .insert({ name: 'Acc List', user_id: user.id })
    .then(() => request(app).get(MAIN_ROUTE))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

it('Deve retornar uma conta por ID', () => {
  return app.db('accounts')
    .insert({ name: 'Account By Id', user_id: user.id }, ['id'])
    .then((acc) => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Account By Id');
      expect(res.body.user_id).toBe(user.id);
    });
});

it('Deve alterar uma conta', () => {
  return app.db('accounts')
    .insert({ name: 'Account To Update', user_id: user.id }, ['id'])
    .then((acc) => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
      .send({ name: 'Account Updated' }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Account Updated');
    });
});

it('Deve remover uma conta', () => {
  return app.db('accounts')
    .insert({ name: 'Account To Delete', user_id: user.id }, ['id'])
    .then((acc) => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`))
    .then((res) => {
      expect(res.status).toBe(204);
    });
});
