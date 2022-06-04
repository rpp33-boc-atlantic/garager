const request = require('supertest');
const server = require('../server/index.js');

describe ('Test route', () => {
  it ('POST item request /postItem', (done) => {
    request(server)
      .post('/postItem')
      .send({
        address: '905 Capitol Expressway, San Jose, CA, USA',
        availableFrom: '2022-06-04',
        availableTo: '2022-06-12',
        brand: 'n/a',
        category: '1',
        itemDescription: 'Wedding Arch -In usable condition',
        latLng: {lat: 37.2756643, lng: -121.8710813},
        minimunAcceptedPrice: '35',
        model: 'n/a',
        nameYourOwnPrice: true,
        photos: [],
        price: '50.00',
        title: 'Oriental Trading Company Wedding Arch'
      })
      .expect(201)
      .end((err, res) => {
        if (err) { return done(err); }
        return done();
      });
  });
});

// describe ('Test error handling', () => {
//   it ('POST item with missing user_id', (done) => {});
//   it ('POST item with missing field', (done) => {});
// });

// test('should display something', () => {

//   expect('Post-item!').toMatch(/^Post(.*)/);
// });

