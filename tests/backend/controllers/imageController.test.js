/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { imag1 } = require('../../../BackEnd/controllers/imageController');
const Image = require('../../../BackEnd/schemas/images');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Insert a mock image document with the specific _id
  await Image.create({
    _id: new mongoose.Types.ObjectId("67d42d5a7a0dbb296e871bca"),
    image: Buffer.from("mockbinarydata"),
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});

describe('imag1()', () => {
  test('returns the correct image for the hardcoded ID', async () => {
    const result = await imag1();

    expect(result).toBeDefined();
    expect(result).toHaveProperty('image');
    expect(result.image.buffer).toBeInstanceOf(Buffer);
  });
});
