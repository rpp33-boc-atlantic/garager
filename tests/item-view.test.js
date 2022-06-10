// test('should display something', () => {

const request = require('supertest');
const server = require('../server/index.js');

describe('Test Item View', () => {

  // it ('GET item data request /item/ItemData', (done) => {
  //   request(server)
  //     .get('/item/itemData/ID=16661')
  //     .expect(404)
  //     .end((err, res) => {
  //       if (err) { return done(err); }
  //       return done();
  //     });

  // })



  // beforeAll(done => {
  //   done();
  // });

  // test('Sending GET request to /item/itemData with item number that does not exist', async() => {
  //   await request(server)
  //     .get('/item/itemData/ID=16661')
  //     .expect(404)
  //     // .then((response) => {
  //     //   expect(response.body.message).toEqual('Error 404 Item Not Found');
  //     // });
  // });

  // test('Sending GET request to /item/itemData with appropriate params', async() => {
  //   await request(server)
  //     .get('/asdfasdfs')
  //     .expect(500);
  // });
  // afterAll(done => {
  //   server.close();
  //   done();
  // });
});







//   expect('Item-view!').toMatch(/^Item(.*)/);
// });