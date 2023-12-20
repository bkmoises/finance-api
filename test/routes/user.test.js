const request = require("supertest");

const app = require("../../src/app");

test("Deve listar todos os usuários", () => {
  return request(app)
    .get("/users")
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test("Dee inserir um usuário com sucesso", () => {
  const mail = `${Date.now()}@mail.com`;
  return request(app)
    .post("/users")
    .send({ name: "John Kramer", mail, passwd: "12345" })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("John Kramer");
      expect(res.body.mail).toBe(mail);
    });
});

test("Não deve inserir um usuário sem nome", () => {
  return request(app)
    .post("/users")
    .send({ mail: "mail@mail.com", passwdd: "12345" })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Nome é um atributo obrigatório");
    });
});
