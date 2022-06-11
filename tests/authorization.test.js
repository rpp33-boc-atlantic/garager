const supertest = require('supertest');
const server = require('../server/index.js');

describe('Get User Id by logged in email', () => {
  it('should return 200 for exisiitng user', async () => {
    const res = await supertest(server).get('/auth')
      .query({email: 'ron.swanson@icloud.com'});
    expect(res.statusCode).toEqual(200);
  });

  it('should return userId', async () => {
    const res = await supertest(server).get('/auth')
      .query({email: 'ron.swanson@icloud.com'});
    expect(res.text).toEqual('{"user_id":1}');
  });
});


describe('Registered user will not be added to the DB', () => {
  it('should return "" with previously registered user', async () => {
    const res = await supertest(server).post('/auth')
      .send({firstName: 'Wen', lastName: 'Dai', email: 'arielddw@gmail.com'});
    expect(res.statusCode).toEqual(201);
    expect(res.text).toEqual('');
  });
});
