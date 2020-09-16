const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const { Event } = require('../../models/event');

const userCookie = 'express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalZtTmpJeU1UZzVOak16WkRReU1qQmlZemRrWkRVek9TSXNJbVZ0WVdsc0lqb2liMlIxZEhWemFXNXRiM05sYzBCbmJXRnBiQzVqYjIwaUxDSnBZWFFpT2pFMk1EQXlOekl4TkRGOS5OdmswSHVEd3h5UXN3S3FqcnF1OGRPMEpMSVM2TVRYX2hEQ21sUk53dmpFIn0';

// it('returns an error if invalid details is provided', async () => {
//     const event = {
//         id: mongoose.Types.ObjectId().toHexString(),
//         title: 'concert',
//         location: 'testing',
//         date: '08.23.20',
//         time: '20:20',
//         price: 20,
//     };
//     await event.save();

//     await request(app)
//         .post('/ticket')
//         .set('Cookie', global.signin())
//         .send({ eventId: event.id })
//         .expect(201);

// });

it('returns an error if invalid details is provided', async () => {
    const event = {
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        location: 'testing',
        date: '08.23.20',
        time: '20:20',
        price: 20,
    };
    // await event.save();
    await request(app)
    .post('/events')
    .set('Cookie', userCookie)
    .send({
      id: mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        location: 'testing',
        date: '08.23.20',
        time: '20:20',
        price: 20,
    })
    .expect(201);

    await request(app)
        .post('/tickets')
        .set('Cookie', userCookie)
        .send({ eventId: event.id })
        .expect(404);

});