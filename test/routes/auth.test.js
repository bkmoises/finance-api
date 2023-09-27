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
