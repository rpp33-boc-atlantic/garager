const supertest = require('supertest');
const server = require('../server/index.js');

describe('TEST SETUP', function () {
  test('should display something', () => {
    expect('Checkout!').toMatch(/^Checkout(.*)/);
  });

  test('GET /test', async () => {
    await supertest(server).get('/test')
      .expect(200) // this is serving html, so its  hard to test.
      .then((response) => {
        expect(response.text).toEqual('TEST OK');
      });
  });
});

// describe('SERVER ROUTES', function () {
//   test('should display something', () => {
//     expect('Checkout!').toMatch(/^Checkout(.*)/);
//   });

//   test('GET /test', async () => {
//     await supertest(server).get('/test')
//       .expect(200) // this is serving html, so its  hard to test.
//       .then((response) => {
//         expect(response.text).toEqual('TEST OK');
//       });
//   });
// });

