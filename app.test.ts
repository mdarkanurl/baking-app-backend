jest.setTimeout(10000);

import app from './src/app';
import request from 'supertest';

const username = 'mdarkanurl'; //Creating a random username
const recipient = 'thearkan'; //Creating a random recipient
const password = 'Mia6081';

test('Testing the express route', async () => {

    const res = await request(app)
    .post('/api/signup')
    .send({ username, password })
    
    expect(res.status).toBe(201);

});