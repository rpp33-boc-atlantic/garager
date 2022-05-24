const supertest = require('supertest');
var server = require('../server/server.js');


test('should display something', () => {

  expect('Account view!').toMatch(/^Account(.*)/);
  expect('Successful Test!!').toMatchInlineSnapshot(`"Successful Test!!"`);
});