test('Devo conhecer as principais acertivas do jest', () => {
  let number = null;
  expect(number).toBeNull();
  number = 10
  expect(number).not.toBeNull();
  expect(number).toBe(10);
  expect(number).toEqual(10);
  expect(number).toBeGreaterThan(9);
  expect(number).toBeLessThan(11);
});

test("Devo trabalhar com objetos", () => {
  const obj = { nome: "john", email: 'mail@mail.com' };
  expect(obj).toHaveProperty('nome');
  expect(obj).toHaveProperty('nome', 'john');
  expect(obj.nome).toBe('john');
});
