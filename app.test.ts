import { testDB } from './src/config/db';
import request from 'supertest';
import app from './src/app';
import { faker } from '@faker-js/faker';

const username = faker.internet.userName();
const recipient = faker.internet.userName();
const password = faker.internet.password();

describe('Testing the express route', () => {
 beforeAll(async () => {
   await testDB().catch(err => {
     console.log('err', err.message);
   });
 }, 30000);


 describe('Testing the signup route', () => {
   test('successful signup test', async () => {
     await request(app)
       .post('/api/signup')
       .send({ username, password })
       .then(res => {
         expect(res.status).toBe(201);
       });

     await request(app)
       .post('/api/signup')
       .send({
         username: recipient,
         password
       })
       .then(res => {
         expect(res.status).toBe(201);
       });
   });


   test('failed signup test', async () => {
     await request(app)
       .post('/api/signup')
       .send({})
       .then(res => {
         expect(res.status).toBe(400); //Checking if the status code is 400
       });
   });
 });
});