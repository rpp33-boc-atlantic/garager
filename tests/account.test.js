/* eslint-disable camelcase */
// var routes = require('../server/routes/account.routes.js');

const supertest = require('supertest');
const server = require('../server/index.js');
import axios from 'axios';
import getData from '../client/src/account/getData.jsx';


// describe('test server routes', function() {
//   test('should display something', () => {
//     expect('Account view!').toMatch(/^Account(.*)/);
//     expect('Successful Test!!').toMatchInlineSnapshot(`"Successful Test!!"`);
//   });

//   test('Happy Path: GET /test', async() => {
//     await supertest(server).get('/')
//       .expect(200); // this is serving html, so its  hard to test.
//     // .then((response) => {
//     //   console.log(response);
//     //   expect(response.text).toEqual('');
//     // });
//   });


// });


jest.mock('axios');





describe('account/my-rentals routes', function() {

  // test('should fetch users', () => {
  //   const transactions = [{transactions: {
  //     title: 'Inflatable Aero Chair XL',
  //     owner: 'Tom Haverford',
  //     owner_id: 10,
  //     transaction_id: 55,
  //     item_id: 7,
  //     rate: 30,
  //     pickupdate: '2022-06-22T04:00:00.000Z',
  //     returndate: '2022-06-26T04:00:00.000Z',
  //     refunded: false,
  //     photos: [
  //       'https://cdn.shopify.com/s/files/1/0046/9018/2262/products/ACH-XL-01-min.png?v=1626810628',
  //       'https://cdn.shopify.com/s/files/1/0046/9018/2262/products/ACH-XL-03-min.png?v=1626810628',
  //       'https://cdn.shopify.com/s/files/1/0046/9018/2262/products/ACH-XL-05-min.png?v=1626810627'
  //     ]
  //   }}];
  //   const resp = {data: transactions};
  //   axios.get.mockResolvedValue(resp);

  //   // or you could use the following depending on your use case:
  //   // axios.get.mockImplementation(() => Promise.resolve(resp))

  //   return getData(1, 'accounts/my-rentals2').then((data) =>{
  //     expect(data).toEqual(transactions);
  //     console.log(data);
  //   });

  // });

  test('HAPPY: /account/my-rentals/?id=3 should data object with certain keys', async () => {
    await supertest(server).get('/account/my-rentals/?id=3')
      .expect(200)
      .then((response) => {
        expect(response._body.length).toBeGreaterThan(0);
        expect(Object.keys(response._body[0]).sort()).toEqual(['title', 'owner', 'owner_id', 'transaction_id', 'item_id', 'rate', 'pickupdate', 'returndate', 'refunded', 'photos'].sort());
      });
  });
  test('SAD account/my-rentals?id=undefined should ', async () => {
    await supertest(server).get('/account/my-rentals/?id=undefined')
      .expect(400)
      .then((response) => {
        expect(response.text).toEqual('Bad Request');
      });
  });

});


describe('account/my-earnings routes', function() {


  test('HAPPY account/my-earnings/?id=3 should return a object with certain keys', async () => {
    await supertest(server).get('/account/my-earnings/?id=3')
      .expect(200)
      .then((response) => {
        // console.log('listings; ', response);
        expect(Object.keys(response._body[0]).sort()).toEqual(['monthly', 'weekly', 'total', 'owner_id', 'total_transactions', 'monthly_transactions', 'weekly_transactions', 'weekly_items', 'monthly_items', 'total_items'].sort());
      });
  });
  test('SAD account/my-earnings/?id=undefined should ', async () => {
    await supertest(server).get('/account/my-earnings/?id=undefined')
      .expect(400)
      .then((response) => {
        expect(response.text).toEqual('Bad Request');
      });
  });
});

describe('account/my-listings routes', function() {
  test('HAPPY account/my-listings/?id=3 should return a object with certain keys', async () => {
    await supertest(server).get('/account/my-listings/?id=3')
      .expect(200)
      .then((response) => {
        // console.log('listings; ', response);
        expect(Object.keys(response._body[0]).sort()).toEqual(['item_id', 'min_price', 'nyop', 'photos', 'price', 'title', 'to_jsonb'].sort());
      });
  });
  test('SAD account/my-listings?id=undefined should return 400 ', async () => {
    await supertest(server).get('/account/my-listings/?id=undefined')
      .expect(400)
      .then((response) => {
        expect(response.text).toEqual('Bad Request');
      });
  });
});
describe('account/profile routes', function() {

  describe('account/my-profile routes', function() {
    test('HAPPY account/my-listings/?id=3 should return a object with certain keys', async () => {
      await supertest(server).get('/account/my-profile/?id=3')
        .expect(200)
        .then((response) => {
          // console.log('listings; ', response);
          expect(Object.keys(response._body[0]).sort()).toEqual(['address', 'datejoined', 'email', 'firstname', 'lastname', 'phone', 'stripe_id', 'user_id', 'userphoto'].sort());
        });
    });
    test('SAD account/my-profile/?id=undefined should return 400 ', async () => {
      await supertest(server).get('/account/my-profile/?id=undefined')
        .expect(400)
        .then((response) => {
          expect(response.text).toEqual('Bad Request');
        });
    });
  });

});
describe('account/data route', function() {

  describe('account/get-data routes', function() {
    test('HAPPY account/get-data/?table=table&writetable=false', async () => {
      await supertest(server).get('/account/get-data/?table=items&writetable=false')
        .expect(200)
        .then((response) => {
          expect(Object.keys(response._body[0]).sort()).toEqual([
            'item_id', 'user_id',
            'title', 'category',
            'brand', 'model',
            'itemdescription', 'price',
            'nyop', 'min_price',
            'availablefrom', 'availableto',
            'address', 'latlng',
            'photos'
          ].sort());


        });
    });
    // IM NOT SURE WHAT A SAD VERSION OF THIS WOULD BE. THE PARAM is auto filled if it is needed
    test('SAD account/get-data/?id=undefined should return 400 ', async () => {
      await supertest(server).get('/account/get-data/?id=undefined')
        .expect(400)
        .then((response) => {
          expect(response.text).toEqual('Bad Request');
        });
    });
  });
});