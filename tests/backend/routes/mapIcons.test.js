/**
 * @jest-environment node
 */
import request from 'supertest';
import express from 'express';
import iconsRoute from '../../../BackEnd/routes/getMapIcon.js'; // Adjust if needed

// Mock the controller function
jest.mock('../../../BackEnd/controllers/mapIconCntrl.js', () => ({
  mapIc1: jest.fn()
}));

import { mapIc1 } from '../../../BackEnd/controllers/mapIconCntrl.js';

// Setup test server
const app = express();
app.use(iconsRoute);

describe('GET /getIcons', () => {
  it('should return icon data from controller', async () => {
    const mockIcons = [
      { name: 'Block A', image: 'base64stringA' },
      { name: 'Block B', image: 'base64stringB' }
    ];
    mapIc1.mockResolvedValue(mockIcons);

    const res = await request(app).get('/getIcons');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockIcons);
    expect(mapIc1).toHaveBeenCalled();
  });

  it('should return 500 and error message on failure', async () => {
    mapIc1.mockRejectedValue(new Error('Test error'));

    const res = await request(app).get('/getIcons');

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to fetch image' });
  });
});
