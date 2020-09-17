const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const  Event  = require('../../models/event');

const userCookie = 'express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalZtTmpJNFpETmtNRGd5WldRMk56TXdZVFprWldFeVlpSXNJbVZ0WVdsc0lqb2liMlIxZEhWemFXNXRiM05sYzBCbmJXRnBiQzVqYjIwaUxDSnliMnhsSWpvaVlXUnRhVzRpTENKcFlYUWlPakUyTURBek5ETXpPRFo5LllybHRYaWZNYW1GQjlqUjFQaHpva29KZjdSSGJac3o2SFAzMm1FUGNjZmcifQ';


it('returns an error if the ticket does not exist', async () => {
  
    await request(app)
      .post('/user/tickets')
      .set('Cookie', userCookie)
      .expect(404);
  });

