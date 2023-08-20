const request = require('supertest')
const dbFunctions = require('../db/dbfunctions')
const {v4:uuidv4} = require('uuid')
const app = require('../app.js');
const { describe } = require('node:test');

describe('Room Creation API', () => {
  it('should save a new room in the database', async () => {
    const randomId = uuidv4()
    const res = await request(app)
      .post('/rooms/save-room')
      .send({ room_id: randomId });

    expect(res.statusCode).toBe(200);
    expect(res.body.is_new).toBeTruthy
    expect(res.body.room.room_id).toBe(randomId)
  });

  it('should return details of an existing room', async () => {
    const res = await request(app)
      .post('/rooms/save-room')
      .send({ room_id: '5f6d6a46-0c68-404a-af23-fd6d3da4ebd9' });

    expect(res.statusCode).toBe(200);
    expect(res.body.is_new).toBeFalsy
    expect(res.body.room.room_id).toBe('5f6d6a46-0c68-404a-af23-fd6d3da4ebd9');
  });
  
  it('should handle an invalid room_id', async () => {
    const res = await request(app)
      .post('/rooms/save-room')
      .send({ room_id: 'invalid_id' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  it('should handle database error', async () => {
    dbFunctions.findExistingRoom = jest.fn().mockRejectedValue(new Error('Database Error'));
    dbFunctions.insertNewRoom = jest.fn().mockRejectedValue(new Error('Database Error'));

    const randomId = uuidv4()
    const res = await request(app)
      .post('/rooms/save-room')
      .send({ room_id: randomId });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBeTruthy();
  });

  it('should handle missing room_id', async () => {
    const res = await request(app)
      .post('/rooms/save-room')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

});

describe('Save Relationship API', () => {
  it('should save a new relationship in the database', async () => {
    const room_id = 112;
    const user_id = 1; 
    
    const res = await request(app)
      .post('/rooms/save-relationship')
      .send({ room_id, user_id });

    expect(res.statusCode).toBe(200);
    expect(res.body.room_id).toBe(room_id);
    expect(res.body.user_id).toBe(user_id);
  });

  it('should handle database error', async () => {
    const room_id = 112;
    const user_id = 1;
    
    dbFunctions.insertNewRelationship = jest.fn().mockRejectedValue(new Error('Database Error'));

    const res = await request(app)
      .post('/rooms/save-relationship')
      .send({ room_id, user_id });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBeTruthy();
  });

  it('should handle missing room_id or user_id', async () => {
    const res = await request(app)
      .post('/rooms/save-relationship')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeTruthy();
  });
});
