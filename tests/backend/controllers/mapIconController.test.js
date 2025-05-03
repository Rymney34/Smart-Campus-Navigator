/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { mapIc1 } = require('../../../BackEnd/controllers/mapIconCntrl');
const Block = require('../../../BackEnd/schemas/blocks');
const Icon = require('../../../BackEnd/schemas/icons');

let mongoServer;
let iconId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  // Create an icon first and store the ID
  const iconDoc = await Icon.create({
    image: Buffer.from('dummy-image-data')
  });
  iconId = iconDoc._id;

  // Create a block that references the icon
  await Block.create({
    name: 'Block Test',
    idIcon: iconId
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('mapIc1()', () => {
  test('should return blocks with embedded icon images', async () => {
    const result = await mapIc1();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    const block = result.find(b => b.name === 'Block Test');
    expect(block).toBeDefined();
    expect(block).toHaveProperty('image');

    // Depending on how it's returned
    expect(block.image).toBeDefined();
    expect(
      Buffer.isBuffer(block.image) || block.image._bsontype === 'Binary'
    ).toBe(true);
  });
});


