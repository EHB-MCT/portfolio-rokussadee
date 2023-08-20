const request = require('supertest');
const dbFunctions = require('../db/dbfunctions');
const { v4: uuidv4 } = require('uuid');
const app = require('../app.js');
const helpers = require('../common/helper');

describe('User Creation API', () => {
  it('should save a new user in the database', async () => {
    const randomName = helpers.createRandomString(12)
    const res = await request(app)
      .post('/users/save-user')
      .send({ user_name: randomName });

    expect(res.statusCode).toBe(200);
    expect(res.body.is_new).toBeTruthy();
    expect(res.body.user.name).toBe(randomName);
  });

  it('should return details of an existing user', async () => {
    const res = await request(app)
      .post('/users/save-user')
      .send({ user_name: 'existing_user' }); // Use an existing user's name here

    expect(res.statusCode).toBe(200);
    expect(res.body.is_new).toBeFalsy();
    expect(res.body.user.name).toBe('existing_user');
  });

  it('should handle an invalid user name', async () => {
    const res = await request(app)
      .post('/users/save-user')
      .send({ user_name: 'invalid' }); // Use an invalid name here

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  it('should handle database error', async () => {
    dbFunctions.findExistingUserByName = jest.fn().mockRejectedValue(new Error('Database Error'));
    dbFunctions.insertNewUser = jest.fn().mockRejectedValue(new Error('Database Error'));

    const randomName = helpers.createRandomString(12)
    const res = await request(app)
      .post('/users/save-user')
      .send({ user_name: randomName });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBeTruthy();
  });

  it('should handle missing user name', async () => {
    const res = await request(app)
      .post('/users/save-user')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  // Add more test cases as needed
});
