// var routes = require('../server/routes/account.routes.js');
const supertest = require('supertest');


describe('account/my-rentals routes', function() {

  test('/account/my-rentals/upcoming should return something', async () => {
    await supertest(server).get('/qa/questions/')
    .expect(404)
    .then((response) => {
      expect(response.text).toEqual('Missing query param product_id  please use format ?product_id=product_id');
    });
  });

  test('/account/my-rentals/past should return something', () => {

    expect('Account view!').toMatch(/^Account(.*)/);
    expect('Successful Test!!').toMatchInlineSnapshot(`"Successful Test!!"`);
  });
});

describe('account/my-listings routes', function() {

  test('/account/my-listings/upcoming should return something', () => {

    expect('Account view!').toMatch(/^Account(.*)/);

  });

  test('/account/my-listngs/past should return something', () => {

    expect('Account view!').toMatch(/^Account(.*)/);
    expect('Successful Test!!').toMatchInlineSnapshot(`"Successful Test!!"`);
  });
});