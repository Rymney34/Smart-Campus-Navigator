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
    const iconDoc = await Icon.create({ image: Buffer.from('iconimg') });
    const locTypeDoc = await LocationType.create({ typeName: 'Cafe', idImage: iconDoc._id });
    const imgDoc = await Image.create({ image: Buffer.from('blockimg') });

    const blockDoc = await Block.create({ name: 'Block A', title: 'Business', idImage: imgDoc._id });
    const floorDoc = await Floor.create({ id_block: blockDoc._id, floorNum: 1 });

    await Location.create({
      idFloor: floorDoc._id,
      opentime: '08:00',
      closetime: '18:00',
      places: [{ roomNumber: 'A.101', idType: locTypeDoc._id }]
    });

    const results = await getSearchDetails("Cafe");

    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty('name', 'Block A');
    expect(results[0].locationType).toHaveProperty('typeName', 'Cafe');
  });
});
