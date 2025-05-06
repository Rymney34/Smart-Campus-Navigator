/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { getSearchDetails } = require('../../../BackEnd/controllers/getSearchDetails');

const Block = require('../../../BackEnd/schemas/blocks');
const Floor = require('../../../BackEnd/schemas/floors');
const Location = require('../../../BackEnd/schemas/locations');
const LocationType = require('../../../BackEnd/schemas/locationType');
const Icon = require('../../../BackEnd/schemas/icons');
const Image = require('../../../BackEnd/schemas/images');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
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

describe('getSearchDetails()', () => {
  test('returns blocks matching search term in block name or facility', async () => {
    const imageId = new mongoose.Types.ObjectId();
    const iconId = new mongoose.Types.ObjectId();
    const typeId = new mongoose.Types.ObjectId();
    const blockId = new mongoose.Types.ObjectId();
    const floorId = new mongoose.Types.ObjectId();

    // Insert images and icons
    await Image.create({ _id: imageId, image: Buffer.from('blockimg') });
    await Icon.create({ _id: iconId, image: Buffer.from('iconimg') });

    // Insert location type
    await LocationType.create({ _id: typeId, typeName: 'Cafe', idImage: iconId });

    // Create block and manually set `idImage` (bypassing schema)
    const block = new Block({
      _id: blockId,
      name: 'Block A',
      title: 'Business'
    });
    block.set('idImage', imageId);
    await block.save();

    // Insert floor
    await Floor.create({ _id: floorId, id_block: blockId, floorNum: 1 });

    // Insert location with room and type
    await Location.create({
      _id: new mongoose.Types.ObjectId(),
      idFloor: floorId,
      opentime: '08:00',
      closetime: '18:00',
      places: [{
        roomNumber: 'A.101',
        idType: typeId,
        isFacility: false
      }]
    });

    // Perform the search
    const results = await getSearchDetails("Cafe");

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty('name', 'Block A');
    expect(results[0].locationType).toHaveProperty('typeName', 'Cafe');
  });
});
