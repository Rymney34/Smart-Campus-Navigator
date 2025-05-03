/**
 * @jest-environment node
 */
import request from 'supertest';
import express from 'express';
import searchRoute from '../../../BackEnd/routes/getSearchData.js'; 

// Mock the controller function
jest.mock('../../../BackEnd/controllers/getSearchDetails.js', () => ({
  getSearchDetails: jest.fn()
}));

import { getSearchDetails } from '../../../BackEnd/controllers/getSearchDetails.js';

// Setup test app
const app = express();
app.use(searchRoute);

describe('GET /getSearchData/:searchTerm', () => {
  it('should return search results from the controller', async () => {
    const mockData = [
      { name: 'Block A', title: 'Engineering' },
      { name: 'Block B', title: 'Design' }
    ];

    getSearchDetails.mockResolvedValue(mockData);

    const res = await request(app).get('/getSearchData/library');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
    expect(getSearchDetails).toHaveBeenCalledWith('library');
  });

  it('should return 500 on error from controller', async () => {
    getSearchDetails.mockRejectedValue(new Error('Search error'));

    const res = await request(app).get('/getSearchData/fail');

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to fetch search data' });
  });
});
