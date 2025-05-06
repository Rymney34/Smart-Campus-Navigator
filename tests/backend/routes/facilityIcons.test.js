/**
 * @jest-environment node
 */
import request from 'supertest';
import express from 'express';
import facilityIconsRoute from '../../../BackEnd/routes/getFacilitiesIcons.js'; 

// Mock the controller
jest.mock('../../../BackEnd/controllers/getIconController.js', () => ({
  ic1: jest.fn()
}));

import { ic1 } from '../../../BackEnd/controllers/getIconController.js';

// Create a dummy app to mount the route
const app = express();
app.use(facilityIconsRoute);

describe('GET /getFacilitiesicons', () => {
  it('should return facility icons successfully', async () => {
    const mockIcons = [
      { typeName: 'Cafe', image: 'base64string1' },
      { typeName: 'Library', image: 'base64string2' }
    ];
    ic1.mockResolvedValue(mockIcons);

    const res = await request(app).get('/getFacilitiesicons');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockIcons);
  });

  it('should return 500 on controller error', async () => {
    ic1.mockRejectedValue(new Error('DB error'));

    const res = await request(app).get('/getFacilitiesicons');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to fetch image' });
  });
});
