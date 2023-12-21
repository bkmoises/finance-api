const request = require("supertest");
const app = require("../../src/app");

const MAIN_ROUTE = "/accounts";
let user;

beforeAll(async () => {
  const res = await app.services.user.save({
    name: "User Account",
    mail: `${Date.now()}@mail.com`,
    passwd: "123",
  });
  user = { ...res[0] };
});

test("Deve inserir uma conta com suceso", () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ name: "Acc #1", user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.name).toBe("Acc #1");
    });
});

test("Deve listar todas as contas", () => {
  return app
    .db("accounts")
    .insert({ name: "Acc List", user_id: user.id })
    .then(() => {
      request(app)
        .get(MAIN_ROUTE)
        .then((result) => {
          expect(result.status).toBe(200);
          expect(result.body.length).toBeGreaterThan(0);
        });
    });
});

test("Deve retornar uma conta por id", () => {
  return app
    .db("accounts")
    .insert({ name: "Acc By Id", user_id: user.id }, ["id"])
    .then((acc) => {
      request(app)
        .get(`${MAIN_ROUTE}/${acc[0].id}`)
        .then((result) => {
          expect(result.status).toBe(200);
          expect(result.body.name).toBe("Acc By Id");
          expect(result.body.user_id).toBe(user.id);
        });
    });
});
