const request = require('supertest');
const app = require('../app');

describe('CareConnect Healthcare App', () => {
  test('GET / should return homepage content', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('CareConnect');
  });

  test('GET /health should return service status UP', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('UP');
    expect(response.body.service).toBe('CareConnect Healthcare App');
  });

  test('POST /triage should return High Priority for serious symptoms', async () => {
    const response = await request(app)
      .post('/triage')
      .send({
        name: 'Test Patient',
        symptoms: 'chest pain and breathing difficulty'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.triagePriority).toBe('High Priority');
  });

  test('POST /triage should return error when data is missing', async () => {
    const response = await request(app)
      .post('/triage')
      .send({
        name: 'Test Patient'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Patient name and symptoms are required.');
  });

  test('POST /appointment should submit appointment request', async () => {
    const response = await request(app)
      .post('/appointment')
      .send({
        name: 'Test Patient',
        preferredDate: '2026-05-15',
        reason: 'Skin rash consultation'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe('Appointment request submitted successfully.');
  });
});
