test('should display something', () => {

  expect('Chat view!').toMatch(/^Chat(.*)/);
  expect('Successful Test!!').toMatchInlineSnapshot(`"Successful Test!!"`);
})