test('should display something', () => {

  expect('Account view!').toMatch(/^Account(.*)/);
  expect('Successful Test!!').toMatchInlineSnapshot(`"Successful Test!!"`);
});