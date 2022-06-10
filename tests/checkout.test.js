const supertest = require('supertest');
const server = require('../server/index.js');
const stripe = require('stripe');

jest.mock('stripe');

it('returns a 500 error if no stripe account is associated with an owner', async () => {
  await supertest(server).post('/checkout/create-session')
    .send({ owner: 11, dateRange: ['2022-07-23T04:00:00.000Z', '2022-07-25T04:00:00.000Z'] })
    .expect(500)
    .then((res) => {
      expect(res.text).toEqual('Item owner has not setup a Stripe Account');
    });
});

// it('returns a 500 error if stripe account is incomplete', async () => {
//   stripe.accounts.retrieve.mockResolvedValue({
//     details_submitted: false,
//   });

//   await supertest(server).post('/checkout/create-session')
//     .send({ owner: 11, dateRange: ['2022-07-23T04:00:00.000Z', '2022-07-25T04:00:00.000Z'] })
//     .expect(500);
// });

describe('TEST SETUP', function () {
  it('should display something', () => {
    expect('Checkout!').toMatch(/^Checkout(.*)/);
  });

  it('GET /test', async () => {
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

