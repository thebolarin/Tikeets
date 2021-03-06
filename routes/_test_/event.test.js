/* eslint-disable no-undef */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const userCookie = 'express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalZtTmpJNFpETmtNRGd5WldRMk56TXdZVFprWldFeVlpSXNJbVZ0WVdsc0lqb2liMlIxZEhWemFXNXRiM05sYzBCbmJXRnBiQzVqYjIwaUxDSnliMnhsSWpvaVlXUnRhVzRpTENKcFlYUWlPakUyTURBek5ETXpPRFo5LllybHRYaWZNYW1GQjlqUjFQaHpva29KZjdSSGJac3o2SFAzMm1FUGNjZmcifQ';

it('has a route handler listening to /events for post requests', async () => {
  const response = await request(app).post('/events').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/events').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/events')
    .set('Cookie', userCookie)
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/events')
    .set('Cookie', userCookie)
    .send({
      title: '',
      location: 'testing',
      date: '08.23.20',
      time: '20:20',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/events')
    .set('Cookie', userCookie)
    .send({
      location: 'testing',
      date: '08.23.20',
      time: '20:20',
      price: 10,
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/events')
    .set('Cookie', userCookie)
    .send({
      title: 'asldkjf',
      location: 'testing',
      date: '08.23.20',
      time: '20:20',
      price: -10,
    })
    .expect(400);

  await request(app)
    .post('/events')
    .set('Cookie', userCookie)
    .send({
      title: 'laskdfj',
      location: 'testing',
      date: '08.23.20',
      time: '20:20',
    })
    .expect(400);
});

it('creates an event with valid inputs', async () => {
  const title = 'asldkfj';

  await request(app)
    .post('/events')
    .set('Cookie', userCookie)
    .send({
      title,
      location: 'testing',
      date: '08.23.20',
      time: '20:20',
      price: 20,
    })
    .expect(201);

});

// //* GET EVENTS

it('returns a 200 if the events are found', async () => {

  await request(app).get('/events').send().expect(200);
});



it('returns a 404 if the provided id does not exist', async () => {
  const eventId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .patch(`/events/${eventId}`)
    .set('Cookie', userCookie)
    .send({
      title: 'aslkdfj',
      location: 'testing',
      date: '08.23.20',
      time: '20:20',
      price: 20,
    })
    .expect(404);
});

it('returns a 401 if the user authenticated but the event does not exist', async () => {
  const eventId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .patch(`/events/${eventId}`)
    .set('Cookie', userCookie)
    .send({
      title: 'aslkdfj',
      location: 'testing',
      date: '08.23.20',
      time: '20:20',
      price: 20,
    })
    .expect(404);
});




