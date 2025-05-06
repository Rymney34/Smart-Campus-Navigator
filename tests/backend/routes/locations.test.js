/**
 * @jest-environment node
 */
import request from 'supertest';
import express from 'express';
import locationRoute from '../../../BackEnd/routes/getLocations.js'; // adjust if needed

// Mock the controller
jest.mock('../../../BackEnd/controllers/getLocationController.js', () => ({
  getLocation: jest.fn()
}));

import { getLocation } from '../../../BackEnd/controllers/getLocationController.js';

// Setup express app
const app = express();
app.use(locationRoute);

describe('GET /getLocations/:blockId', () => {
  it('should return location data for a valid block ID', async () => {
    const mockResult = [{ name: 'Block A', lat: 51.5, lng: -3.2 }];
    getLocation.mockResolvedValue(mockResult);

    const res = await request(app).get('/getLocations/block-a');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockResult);
    expect(getLocation).toHaveBeenCalledWith('block-a');
  });

  it('should return 500 on internal error', async () => {
    getLocation.mockRejectedValue(new Error('DB error'));

    const res = await request(app).get('/getLocations/block-b');

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to fetch loc data' });
  });
});
