const request = require('supertest');
const express = require('express');

jest.mock('../data/database', () => ({
  getDatabase: () => ({
    db: () => ({
      collection: (name) => ({
        find: () => ({
          toArray: () => Promise.resolve([
            name === "dogs" 
              ? { _id: "1", name: "Test Dog", gender: "male", age: 3, breed: "Labrador", color: "black" }
              : name === "shelters"
              ? { _id: "1", name: "Test Shelter", location: "Test Location", owner: "Test Owner", phone: "1234567890", email: "test@test.com" }
              : name === "owners"
              ? { _id: "1", firstName: "Test", lastName: "Owner", age: 30, occupation: "Engineer", address: "Test Address", adoptionDate: "2024-03-15", dogAdopted: "Rex", dogsAtHome: 1 }
              : { _id: "1", requestDate: "2024-03-15", visitScheduled: "2024-03-20", firstName: "Test", lastName: "Requester", age: 30, occupation: "Engineer", address: "Test Address", dogsAtHome: 0 }
          ])
        }),
        insertOne: (doc) => Promise.resolve({ acknowledged: true }),
        replaceOne: (filter, doc) => Promise.resolve({ modifiedCount: 1 }),
        deleteOne: (filter) => Promise.resolve({ deletedCount: 1 })
      })
    })
  }),
  initDb: (callback) => callback()
}));

jest.mock('mongodb', () => ({
  ObjectId: jest.fn(id => id)
}));

jest.mock('../middleware/authenticate', () => ({
  isAuthenticated: (req, res, next) => next()
}));

const app = require('../server');

describe('Shelters API', () => {
  test('GET /shelters returns a list of shelters', async () => {
    const res = await request(app).get('/shelters');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name', 'Test Shelter');
  });

  test('GET /shelters/:id returns a single shelter', async () => {
    const res = await request(app).get('/shelters/1');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('name', 'Test Shelter');
  });

  test('POST /shelters creates a shelter', async () => {
    const newShelter = {
      name: "New Shelter",
      location: "123 Street",
      owner: "Owner Name",
      phone: "555-1234",
      email: "email@test.com"
    };
    const res = await request(app)
      .post('/shelters')
      .send(newShelter);
    expect(res.status).toBe(200);
  });

  test('PUT /shelters/:id updates a shelter', async () => {
    const updatedShelter = {
      name: "Updated Shelter",
      location: "456 Avenue",
      owner: "Updated Owner",
      phone: "555-5678",
      email: "updated@test.com"
    };
    const res = await request(app)
      .put('/shelters/1')
      .send(updatedShelter);
    expect(res.status).toBe(200);
  });

  test('DELETE /shelters/:id deletes a shelter', async () => {
    const res = await request(app).delete('/shelters/1');
    expect(res.status).toBe(200);
  });
});

describe('Dogs API', () => {
  test('GET /dogs returns a list of dogs', async () => {
    const res = await request(app).get('/dogs');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('name', 'Test Dog');
  });

  test('GET /dogs/:id returns a single dog', async () => {
    const res = await request(app).get('/dogs/1');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('name', 'Test Dog');
  });

  test('POST /dogs creates a dog', async () => {
    const newDog = {
      name: "New Dog",
      gender: "female",
      age: 2,
      breed: "Beagle",
      color: "brown"
    };
    const res = await request(app)
      .post('/dogs')
      .send(newDog);
    expect(res.status).toBe(200);
  });

  test('PUT /dogs/:id updates a dog', async () => {
    const updatedDog = {
      name: "Updated Dog",
      gender: "female",
      age: 4,
      breed: "Beagle",
      color: "white"
    };
    const res = await request(app)
      .put('/dogs/1')
      .send(updatedDog);
    expect(res.status).toBe(200);
  });

  test('DELETE /dogs/:id deletes a dog', async () => {
    const res = await request(app).delete('/dogs/1');
    expect(res.status).toBe(200);
  });
});

describe('Owners API', () => {
  test('GET /owners returns a list of owners', async () => {
    const res = await request(app).get('/owners');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /owners/:id returns a single owner', async () => {
    const res = await request(app).get('/owners/1');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('POST /owners creates an owner', async () => {
    const newOwner = {
      firstName: "John",
      lastName: "Doe",
      age: 30,
      occupation: "Software Engineer",
      address: "123 Main St, City, State 12345",
      adoptionDate: "2024-03-15",
      dogAdopted: "Rex",
      dogsAtHome: 1,
      email: "john.doe@email.com",
      phone: "123-456-7890"
    };
    const res = await request(app)
      .post('/owners')
      .send(newOwner);
    expect(res.status).toBe(200);
  });

  test('PUT /owners/:id updates an owner', async () => {
    const updatedOwner = {
      firstName: "Jane",
      lastName: "Smith",
      age: 28,
      occupation: "Software Developer",
      address: "456 Oak St, City, State 12345",
      adoptionDate: "2024-03-16",
      dogAdopted: "Max",
      dogsAtHome: 2,
      email: "jane.smith@email.com",
      phone: "987-654-3210"
    };
    const res = await request(app)
      .put('/owners/1')
      .send(updatedOwner);
    expect(res.status).toBe(200);
  });

  test('DELETE /owners/:id deletes an owner', async () => {
    const res = await request(app).delete('/owners/1');
    expect(res.status).toBe(200);
  });
});

describe('Requests API', () => {
  test('GET /requests returns a list of requests', async () => {
    const res = await request(app).get('/requests');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /requests/:id returns a single request', async () => {
    const res = await request(app).get('/requests/1');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('POST /requests creates a request', async () => {
    const newRequest = {
      requestDate: "2024-03-15",
      visitScheduled: "2024-03-20",
      firstName: "John",
      lastName: "Doe",
      age: 30,
      occupation: "Engineer",
      address: "123 Main St",
      dogsAtHome: 0
    };
    const res = await request(app)
      .post('/requests')
      .send(newRequest);
    expect(res.status).toBe(200);
  });

  test('PUT /requests/:id updates a request', async () => {
    const updatedRequest = {
      requestDate: "2024-03-16",
      visitScheduled: "2024-03-21",
      firstName: "Jane",
      lastName: "Smith",
      age: 28,
      occupation: "Designer",
      address: "456 Oak St",
      dogsAtHome: 1
    };
    const res = await request(app)
      .put('/requests/1')
      .send(updatedRequest);
    expect(res.status).toBe(200);
  });

  test('DELETE /requests/:id deletes a request', async () => {
    const res = await request(app).delete('/requests/1');
    expect(res.status).toBe(200);
  });
});