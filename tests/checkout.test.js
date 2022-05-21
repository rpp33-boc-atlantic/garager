test('should display something', () => {

  expect('Checkout!').toMatch(/^Checkout(.*)/);
  expect('Successful Test!!').toMatchInlineSnapshot(`"Successful Test!!"`);
})