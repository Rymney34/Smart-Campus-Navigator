/**
 * @jest-environment node
 */
import request from 'supertest';
import express from 'express';
import userRoutes from '../../../BackEnd/routes/userRoutes.js'; // Adjust if needed

// Mock controller functions
jest.mock('../../../BackEnd/controllers/userController.js', () => ({
  getUsers: jest.fn(),
  createUser: jest.fn(),
  loginUser: jest.fn(),
  postFeedback: jest.fn(),
}));

import {
  getUsers,
  createUser,
  loginUser,
  postFeedback
} from '../../../BackEnd/controllers/userController.js';

const app = express();
app.use(express.json()); // Needed to parse JSON request bodies
app.use(userRoutes);

describe('User Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /users - returns list of users', async () => {
    const mockUsers = [{ name: 'Alice' }, { name: 'Bob' }];
    getUsers.mockImplementation((req, res) => res.json(mockUsers));

    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockUsers);
    expect(getUsers).toHaveBeenCalled();
  });

  test('POST /users - creates a new user', async () => {
    createUser.mockImplementation((req, res) =>
      res.status(201).json({ message: 'User created' })
    );

    const newUser = { name: 'John', email: 'john@example.com', password: '1234' };
    const res = await request(app).post('/users').send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ message: 'User created' });
    expect(createUser).toHaveBeenCalled();
  });

  test('POST /login - logs in user', async () => {
    loginUser.mockImplementation((req, res) =>
      res.status(200).json({ message: 'Login successful' })
    );

    const loginData = { email: 'john@example.com', password: '1234' };
    const res = await request(app).post('/login').send(loginData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Login successful' });
    expect(loginUser).toHaveBeenCalled();
  });

  test('POST /feedback - posts feedback', async () => {
    postFeedback.mockImplementation((req, res) =>
      res.status(200).json({ message: 'Feedback received' })
    );

    const feedback = { name: 'Test', message: 'Great app!' };
    const res = await request(app).post('/feedback').send(feedback);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Feedback received' });
    expect(postFeedback).toHaveBeenCalled();
  });
});
