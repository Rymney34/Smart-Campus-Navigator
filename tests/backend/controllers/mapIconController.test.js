/**
 * @jest-environment node
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { mapIc1 } = require('../../../BackEnd/controllers/mapIconCntrl');
const Icon = require('../../../BackEnd/schemas/icons');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const iconId = new mongoose.Types.ObjectId();

  // Insert icon using the actual schema
  await Icon.create({
    _id: iconId,
    image: Buffer.from('icon-image'),
  });

  // 🔧 Define a temporary model with idIcon for test only
  const TempBlock = mongoose.model(
    'TempBlock',
    new mongoose.Schema(
      {
        name: String,
        idIcon: mongoose.Schema.Types.ObjectId,
      },
      { collection: 'blocks' } // Reuse same collection
    )
  );

  // Create block referencing the icon
  await TempBlock.create({
    name: 'Block Test',
    idIcon: iconId,
  });
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany();
  }
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
    expect(block.image).toBeDefined();
    expect(
      Buffer.isBuffer(block.image) || (block.image && block.image._bsontype === 'Binary')
    ).toBe(true);
  });
});
