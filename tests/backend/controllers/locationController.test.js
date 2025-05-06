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
    const iconId = new mongoose.Types.ObjectId();
    const typeId = new mongoose.Types.ObjectId();
    const imageId = new mongoose.Types.ObjectId();
    const blockId = new mongoose.Types.ObjectId();
    const floorId = new mongoose.Types.ObjectId();
  
    await Icon.create({ _id: iconId, image: Buffer.from('fakeicon') });
    await LocationType.create({ _id: typeId, typeName: 'Toilet', idImage: iconId });
    await Image.create({ _id: imageId, image: Buffer.from('blockimg') });
    await Block.create({ _id: blockId, name: 'Block Test', title: 'Engineering', idImage: imageId });
    await Floor.create({ _id: floorId, id_block: blockId, floorNum: 1 });
  
    await Location.create({
      _id: new mongoose.Types.ObjectId(),
      idFloor: floorId,
      opentime: '08:00',
      closetime: '18:00',
      places: [{
        _id: new mongoose.Types.ObjectId(),
        roomNumber: 'E.101',
        idType: typeId,
        isFacility: false
      }]
    });

    const result = await getLocation(blockId.toString());

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('name', 'Block Test');
    expect(result[0]).toHaveProperty('floors');
    expect(result[0]).toHaveProperty('floorLocation');
    expect(result[0]).toHaveProperty('locationType');
    expect(result[0]).toHaveProperty('locationImage');
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


    