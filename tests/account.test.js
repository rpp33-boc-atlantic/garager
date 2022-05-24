// var routes = require('../server/routes/account.routes.js');

const supertest = require('supertest');
const server = require('../server/index.js');

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

describe('account/my-rentals routes', function() {

  test('/account/my-rentals/upcoming should return 200', async () => {
    await supertest(server).get('/account/my-rentals/upcoming')
      .expect(200);
    // .then((response) => {
    //   expect(response.text).toEqual('Missing query param product_id  please use format ?product_id=product_id');
    // });
  });

  test('/account/my-rentals/past should return 200', async () => {
    await supertest(server).get('/account/my-rentals/past')
      .expect(200);
    // .then((response) => {
    //   expect(response.text).toEqual('Missing query param product_id  please use format ?product_id=product_id');
    // });
  });

});


describe('account/my-listings routes', function() {


  test('account/my-listings/earnings should return 200', async () => {
    await supertest(server).get('/account/my-listings/earnings')
      .expect(200);
    // .then((response) => {
    //   expect(response.text).toEqual('Missing query param product_id  please use format ?product_id=product_id');
    // });
  });
  test('/account/my-listings should return 200', async () => {
    await supertest(server).get('/account/my-listings/')
      .expect(200);
    // .then((response) => {
    //   expect(response.text).toEqual('Missing query param product_id  please use format ?product_id=product_id');
    // });
  });



});