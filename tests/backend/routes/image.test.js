/**
 * @jest-environment node
 */
import request from 'supertest';
import express from 'express';
import imageRoute from '../../../BackEnd/routes/getImage.js'; 

// Mock the controller
jest.mock('../../../BackEnd/controllers/imageController.js', () => ({
  imag1: jest.fn()
}));

import { imag1 } from '../../../BackEnd/controllers/imageController.js';

// Setup Express app
const app = express();
app.use(imageRoute);

describe('GET /image', () => {
  it('should return image data successfully', async () => {
    const mockResult = { image: 'mockBase64ImageData' };
    imag1.mockResolvedValue(mockResult);

    const res = await request(app).get('/image');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockResult);
  });

  it('should return 500 if imag1 throws', async () => {
    imag1.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/image');

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to fetch image' });
  });
});
