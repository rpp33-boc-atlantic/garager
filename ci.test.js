test('should display something', () => {

  expect('Successful!').toMatch(/^success(.*)/);
  expect('Successful Test!!').toMatchInlineSnapshot(`"Successful Test!!"`);
})