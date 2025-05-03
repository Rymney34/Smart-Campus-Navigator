/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Load the controller and Mongoose models
const { ic1 } = require('../../../BackEnd/controllers/getIconController');
const Icon = require('../../../BackEnd/schemas/icons.js');
const LocationType = require('../../../BackEnd/schemas/locationType.js');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Icon.deleteMany();
  await LocationType.deleteMany();
});

describe('Icon Controller - ic1()', () => {
  test('should return an array of location types with icon images', async () => {
    // Insert mock icon
    const mockIcon = await Icon.create({ image: Buffer.from('12345') });

    // Insert mock locationType linked to that icon
    await LocationType.create({
      typeName: 'Cafe',
      idImage: mockIcon._id,
    });

    // Call the controller
    const result = await ic1();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    const first = result[0];
    expect(first).toHaveProperty('_id');
    expect(first).toHaveProperty('typeName', 'Cafe');
    expect(first).toHaveProperty('image');
    expect(Array.isArray(first.image)).toBe(true);
    expect(Buffer.isBuffer(first.image[0]) || typeof first.image[0] === 'object').toBe(true);
  });
});
