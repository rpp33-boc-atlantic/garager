const request = require('supertest');
const server = require('../server/index.js');

describe('Test Item View', () => {

  it('Should return 200 status code for GET request to /item/itemData with appropriate params', async() => {
    await request(server)
      .get('/item/itemData/')
      .query({ ID: 'ID=11' })
      .expect(200);
  });

  it('Should return 404 status code for GET request to /item/itemData for nonexistant item', async() => {
    await request(server)
      .get('/item/itemData/')
      .query({ ID: 'ID=777' })
      .expect(404)
      .then((res) => {
        expect(res.text).toEqual('{\"message\":\"Error 404 Item Not Found\"}');
      });
  });

  it('Should return 500 status code for GET request to /item/itemData', async() => {
    await request(server)
      .get('/item/itemData/')
      .query({ ID: 'ID=p757h' })
      .expect(500);
  });
});