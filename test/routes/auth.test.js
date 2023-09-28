const request = require('supertest');
const app = require('../../src/app');

it('Deve receber token ao se logar', () => {
  const mail = `${Date.now()}@mail.com`;
  return app.services.user.saveUser({
    name: 'João',
    mail,
    passwd: '123456',
  })
    .then(() => request(app).post('/auth/signin')
      .send({ mail, passwd: '123456' }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
});

it('Não deve autenticar usuário com senha errada', () => {
  const mail = `${Date.now()}@mail.com`;
  return app.services.user.saveUser({
    name: 'João',
    mail,
    passwd: '123456',
  })
    .then(() => request(app).post('/auth/signin')
      .send({ mail, passwd: '123321' }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Usuário ou senha invalida!');
    });
});

it('Não deve autenticar usuários não cadastrados', () => {
  return request(app).post('/auth/signin')
    .send({ mail: 'nãoexiste@mail.com', passwd: '123321' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Usuário ou senha invalida!');
    });
});
