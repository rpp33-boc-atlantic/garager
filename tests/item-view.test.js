// test('should display something', () => {

const request = require('supertest');
const server = require('../server/index.js');

describe('Test Item View', () => {

  beforeAll(done => {
    done();
  });

  test('Sending GET request to /item/itemData with appropriate params', async() => {
    await request(server)
      .get('/item/itemData/ID=11')
      .expect(200);
  });

  test('Sending GET request to /item/itemData with item number that does not exist', async() => {
    await request(server)
      .get('/item/itemData/ID=hh')
      .expect(404)
      .then((response) => {
        expect(response.body.message).toEqual('Error 404 Item Not Found');
      });
  });
  // afterAll(done => {
  //   server.close();
  //   done();
  // });
});







//   expect('Item-view!').toMatch(/^Item(.*)/);
// });