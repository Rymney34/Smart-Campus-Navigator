/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');
const User = require('../../../BackEnd/schemas/User');
const Feedback = require('../../../BackEnd/schemas/feedback');
const {
  createUser,
  loginUser,
  postFeedback
} = require('../../../BackEnd/controllers/userController');

let mongoServer;
let req, res;

beforeEach(() => {
  req = { body: {} };
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
});

afterEach(async () => {
  await User.deleteMany();
  await Feedback.deleteMany();
});

describe('User Controller', () => {
  test('should create a user and hash password', async () => {
    req.body = {
      firstName: 'Test',
      surname: 'User',
      email: 'test@example.com',
      password: 'secret123'
    };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    const createdUser = await User.findOne({ email: req.body.email });
    expect(createdUser).toBeDefined();
    expect(await bcrypt.compare('secret123', createdUser.password)).toBe(true);
  });

  test('should login a user with correct password', async () => {
    const hashed = await bcrypt.hash('mypassword', 10);
    await new User({
      firstName: 'Jane',
      surname: 'Doe',
      email: 'jane@example.com',
      password: hashed
    }).save();

    req.body = {
      email: 'jane@example.com',
      password: 'mypassword'
    };

    await loginUser(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Login successful',
        user: expect.objectContaining({ email: 'jane@example.com' })
      })
    );
  });

  test('should reject login with incorrect password', async () => {
    const hashed = await bcrypt.hash('goodpass', 10);
    await new User({ firstName: 'Bob', surname: 'Smith', email: 'bob@example.com', password: hashed }).save();

    req.body = {
      email: 'bob@example.com',
      password: 'wrongpass'
    };

    await loginUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
  });

  test('should prevent feedback after 3 submissions', async () => {
    const user = await new User({ firstName: 'User', surname: 'Test', email: 'a@a.com', password: 'pass' }).save();

    // Submit 3 feedbacks
    for (let i = 0; i < 3; i++) {
      await new Feedback({
        userId: user._id,
        name: 'Test',
        category: 'UI/UX',
        message: `Test ${i}`,
        submittedAt: new Date()
      }).save();
    }

    req.body = {
      userId: user._id,
      name: 'Test',
      category: 'UI/UX',
      message: 'Another one'
    };

    await postFeedback(req, res);
    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Daily feedback limit reached. Come back tomorrow!'
    });
  });
});
