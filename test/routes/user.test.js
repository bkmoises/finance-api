const request = require("supertest");
const app = require("../../src/app");

const mail = `${Date.now()}@mail.com`;

test("Deve listar todos os usuários", () => {
  return request(app)
    .get("/users")
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test("Dee inserir um usuário com sucesso", () => {
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

test("Não deve inserir um usuário sem e-mail", () => {
  return request(app)
    .post("/users")
    .send({ name: "John Kramer", passwd: "12345" })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe("Email é um atributo obrigatório");
    });
});

test("Não deve inserir um usuário sem senha", () => {
  return request(app)
    .post("/users")
    .send({ name: "John Kramer", mail: "mail@mail.com" })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe("Senha é um atributo obrigatório");
    });
});

test("Não deve inserir um usuário com email existente", () => {
  return request(app)
    .post("/users")
    .send({ name: "John Kramer", mail, passwd: "12345" })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe("Já existe um usuário com esse e-mail");
    });
});
