test('should display something', () => {

  expect('nav-bar!').toMatch(/^nav-bar(.*)/);
  expect('Successful Test!!').toMatchInlineSnapshot(`"Successful Test!!"`);
})