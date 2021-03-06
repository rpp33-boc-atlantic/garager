/* eslint-disable camelcase */
const supertest = require('supertest');
const server = require('../server/index.js');
const { Stripe } = require('stripe');

describe('CHECKOUT SESSION', () => {
  it('returns a 500 error if no stripe account is associated with an owner', async () => {
    await supertest(server).post('/checkout/create-session')
      .send({ ownerID: 13, dateRange: ['2022-07-23T04:00:00.000Z', '2022-07-25T04:00:00.000Z'] })
      .expect(500)
      .then((res) => {
        expect(res.text).toEqual('Item owner has not setup a Stripe Account');
      });
  });

  it('returns a 500 error if stripe account has not filled out all the details', async () => {
    const details_submitted = jest.fn(() => ({
      details_submitted: false,
    }));

    Stripe.prototype.accounts = {
      retrieve: details_submitted,
    };

    await supertest(server).post('/checkout/create-session')
      .send({ ownerID: 8, dateRange: ['2022-07-23T04:00:00.000Z', '2022-07-25T04:00:00.000Z'] })
      .expect(500)
      .then((res) => {
        expect(res.text).toEqual('Item owner has an incomplete Stripe Account Setup');
      });
  });

  it('returns a 500 error if stripe account has not been verified', async () => {
    const charges_enabled = jest.fn(() => ({
      charges_enabled: false,
    }));

    Stripe.prototype.accounts = {
      retrieve: charges_enabled,
    };

    await supertest(server).post('/checkout/create-session')
      .send({ ownerID: 8, dateRange: ['2022-07-23T04:00:00.000Z', '2022-07-25T04:00:00.000Z'] })
      .expect(500)
      .then((res) => {
        expect(res.text).toEqual('Item owner has an incomplete Stripe Account Setup');
      });
  });

  it('returns 200 if item owner has a stripe account', async () => {
    const bothTrue = jest.fn(() => ({
      charges_enabled: true,
      details_submitted: true,
    }));

    Stripe.prototype.accounts = {
      retrieve: bothTrue,
    };

    const checkoutSuccess = jest.fn(() => ({
      url: 'http://localhost:3000/CheckoutSuccess'
    }));

    Stripe.prototype.checkout = {
      sessions: {
        create: checkoutSuccess,
      }
    };

    await supertest(server).post('/checkout/create-session')
      .send({ ownerID: 5, dateRange: ['2022-07-23T04:00:00.000Z', '2022-07-25T04:00:00.000Z'], rate: 55.00 })
      .expect(200);
  });
});

describe('STRIPE ACCOUNT SETUP', () => {
  it('should allow stripe account creation', async () => {
    const returnNull = jest.fn(() => ({
      id: '',
    }));

    Stripe.prototype.accounts = {
      create: returnNull,
    };

    const returnURL = jest.fn(() => ({
      url: 'http://localhost:3000/Stripe-Account-Setup',
    }));

    Stripe.prototype.accountLinks = {
      create: returnURL,
    };

    await supertest(server).post('/checkout/onboard-user')
      .send({ userID: 12 })
      .expect(200)
      .expect((res) => {
        expect(res.body.url).toEqual('http://localhost:3000/Stripe-Account-Setup');
      });
  });

  it('should allow continuation of stripe setup process', async () => {
    const returnURL = jest.fn(() => ({
      url: 'http://localhost:3000/Stripe-Account-Setup',
    }));

    Stripe.prototype.accountLinks = {
      create: returnURL,
    };

    await supertest(server).post('/checkout/onboard-user')
      .send({ userID: 8 })
      .expect(200)
      .expect((res) => {
        expect(res.body.url).toEqual('http://localhost:3000/Stripe-Account-Setup');
      });
  });

  it('should return "incomplete" if user has not started the setup process', async () => {
    await supertest(server).get('/checkout/check-account-completion')
      .query({ userID: 12 })
      .expect(200)
      .then((response) => {
        expect(response.text).toEqual('Incomplete - please create an account.');
      });
  });

  it('should return "in-progress" if user has not submitted all the details for the account', async () => {
    const details_submitted = jest.fn(() => ({
      details_submitted: false,
    }));

    Stripe.prototype.accounts = {
      retrieve: details_submitted,
    };

    await supertest(server).get('/checkout/check-account-completion')
      .query({ userID: 8 })
      .expect(200)
      .then((response) => {
        expect(response.text).toEqual('In-progress - please continue to fill out the details to setup your account.');
      });
  });
});

describe('REFUNDS', () => {
  it('returns a 500 error if the owner of the item does not have a Stripe account', async () => {
    await supertest(server).put('/checkout/refund')
      .send({ ownerID: 11 })
      .expect(500)
      .then((res) => {
        expect(res.text).toEqual('The owner does not have a Stripe Account. Please message the owner directly for a refund.');
      });
  });

  it('returns a 500 error if the refund does not have a Stripe payment record', async () => {
    await supertest(server).put('/checkout/refund')
      .send({ ownerID: 5, transactionID: 232 })
      .expect(500)
      .then((res) => {
        expect(res.text).toEqual('There are no Stripe payment records for this transaction. Please message the owner directly for a refund.');
      });
  });

  it('should allow continuation of stripe refund process', async () => {
    const returnOK = jest.fn(() => ({
      result: 'ok',
    }));

    Stripe.prototype.refunds = {
      create: returnOK,
    };

    await supertest(server).put('/checkout/refund')
      .send({ ownerID: 5, transactionID: 226 })
      .expect(200);
  });

  it('should throw an error if refund already occurred', async () => {
    const error = jest.fn(() => {
      throw new Error();
    });

    Stripe.prototype.refunds = {
      create: error,
    };

    await supertest(server).put('/checkout/refund')
      .send({ ownerID: 5, transactionID: 226 })
      .expect(500)
      .then((res) => {
        expect(res.text).toEqual('This transaction has already been refunded.');
      });
  });
});

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
