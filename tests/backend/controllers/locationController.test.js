/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { getLocation } = require('../../../BackEnd/controllers/getLocationController');

const Block = require('../../../BackEnd/schemas/blocks');
const Floor = require('../../../BackEnd/schemas/floors');
const Location = require('../../../BackEnd/schemas/locations');
const LocationType = require('../../../BackEnd/schemas/locationType');
const Icon = require('../../../BackEnd/schemas/icons');
const Image = require('../../../BackEnd/schemas/images');

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
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});

describe('getLocation()', () => {
  test('returns full block info with nested data', async () => {
    // Create mock icon
    const iconDoc = await Icon.create({ image: Buffer.from('fakeicon') });

    // Create locationType referencing icon
    const locTypeDoc = await LocationType.create({
      typeName: 'Toilet',
      idImage: iconDoc._id,
    });

    // Create image for block
    const imageDoc = await Image.create({ image: Buffer.from('blockimg') });

    // Create block
    const blockDoc = await Block.create({
      name: 'Block Test',
      title: 'Engineering',
      idImage: imageDoc._id,
    });

    // Create floor that belongs to block
    const floorDoc = await Floor.create({
      id_block: blockDoc._id,
      floorNum: 1,
    });

    // Create location with place referencing locationType
    await Location.create({
      idFloor: floorDoc._id,
      opentime: '08:00',
      closetime: '18:00',
      places: [
        {
          roomNumber: 'E.101',
          idType: locTypeDoc._id,
        },
      ],
    });

    // Now run the actual controller
    const result = await getLocation(blockDoc._id.toString());

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    const data = result[0];
    expect(data).toHaveProperty('name', 'Block Test');
    expect(data).toHaveProperty('floors');
    expect(data).toHaveProperty('floorLocation');
    expect(data).toHaveProperty('locationType');
    expect(data).toHaveProperty('locationImage');
  });

  test('returns mock error response for invalid blockId', async () => {
    const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
    };

    // Patch res into global scope so your controller uses it
    global.res = mockRes;

    const result = await getLocation('invalid-id');

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid blockId' });
});
});


    