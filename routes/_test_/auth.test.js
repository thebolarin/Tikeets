/* eslint-disable no-undef */
const request = require ('supertest');
const  app  = require ('../../app');

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/signup')
    .send({
      name: 'tester',
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/signup')
    .send({
      name: 'tester',
      email: 'alskdflaskjfd',
      password: 'password'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/signup')
    .send({
      name: 'tester',
      email: 'alskdflaskjfd',
      password: 'p'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/signup')
    .send({
      name: 'tester',
      email: 'test@test.com'
    })
    .expect(400);

  await request(app)
    .post('/signup')
    .send({
      name: 'tester',
      password: 'alskjdf'
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/signup')
    .send({
      name: 'tester',
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
    .post('/signup')
    .send({
      name: 'tester',
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/signup')
    .send({
      name: 'tester',
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});



it('fails when a email that does not exist is supplied', async () => {
    await request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(400);
  });
  
  it('fails when an incorrect password is supplied', async () => {
    await request(app)
      .post('/signup')
      .send({
        name: 'tester',
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  
    await request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: 'aslkdfjalskdfj'
      })
      .expect(400);
  });
  
  it('responds with a cookie when given valid credentials', async () => {
    await request(app)
      .post('/signup')
      .send({
        name: 'tester',
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(200);
  
    expect(response.get('Set-Cookie')).toBeDefined();
  });




  it('clears the cookie after signing out', async () => {
    await request(app)
      .post('/signup')
      .send({
        name: 'tester',
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  
    const response = await request(app)
      .post('/logout')
      .send({})
      .expect(200);
  
    expect(response.get('Set-Cookie')[0]).toEqual(
      'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
  });