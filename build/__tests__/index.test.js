const request = require('supertest')
const {v4:uuidv4} = require('uuid')
const app = require('../app.js')

describe('Room Creation API', () => {
  it('should save a new room in the database', async () => {
    const randomId = uuidv4()
    const res = await request(app)
      .post('/save-room')
      .send({ room_id: randomId });

    expect(res.statusCode).toBe(200);
    expect(res.body.is_new).toBeTruthy
    expect(res.body.room.room_id).toBe(randomId)
  });

  it('should return details of an existing room', async () => {
    const res = await request(app)
      .post('/save-room')
      .send({ room_id: '5f6d6a46-0c68-404a-af23-fd6d3da4ebd9' });

    expect(res.statusCode).toBe(200);
    expect(res.body.is_new).toBeFalsy
    expect(res.body.room.room_id).toBe('5f6d6a46-0c68-404a-af23-fd6d3da4ebd9');
  });

  it('should handle database error', async () => {
    const res = await request(app)
      .post('/save-room')
      .send({ room_id: 'errorRoom' });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBeTruthy();
  });

  it('should handle missing room_id', async () => {
    const res = await request(app)
      .post('/save-room')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeTruthy();
  });

  it('should log request body', async () => {
    console.log = jest.fn(); // Mock console.log
    const res = await request(app)
      .post('/save-room')
      .send({ room_id: 'logRequest' });

    expect(console.log).toHaveBeenCalledWith('Request Body:', { room_id: 'logRequest' });
  });

  it('should log response', async () => {
    console.log = jest.fn(); // Mock console.log
    const res = await request(app)
      .post('/save-room')
      .send({ room_id: 'logResponse' });

    expect(console.log).toHaveBeenCalledWith('Response:', res.body);
  });
});

