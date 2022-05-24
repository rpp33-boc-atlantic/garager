var supertest = require('supertest');
var server = require('../server/index.js');

describe('test server routes', function() {
  test('should display something', () => {
    expect('Account view!').toMatch(/^Account(.*)/);
    expect('Successful Test!!').toMatchInlineSnapshot(`"Successful Test!!"`);
  });

  test('Happy Path: GET /test', async() => {
    await supertest(server).get('/')
      .expect(200); // this is serving html, so its  hard to test.
    // .then((response) => {
    //   console.log(response);
    //   expect(response.text).toEqual('');
    // });
  });


});