import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';

describe('CountriesController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpService = moduleFixture.get<HttpService>(HttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('/api/countries (GET) should return countries array with required fields', async () => {
    const mockApiResponse = [
      {
        cca2: 'US',
        name: { common: 'United States' },
        capital: ['Washington, D.C.'],
        population: 331000000,
        flags: { png: 'https://flagcdn.com/w320/us.png', svg: 'https://flagcdn.com/us.svg' },
      },
      {
        cca2: 'CA',
        name: { common: 'Canada' },
        capital: ['Ottawa'],
        population: 38000000,
        flags: { png: 'https://flagcdn.com/w320/ca.png', svg: 'https://flagcdn.com/ca.svg' },
      },
    ];

    mockHttpService.get.mockReturnValue(of({ data: mockApiResponse }));

    const response = await request(app.getHttpServer()).get('/api/countries').expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    const country = response.body[0];
    expect(country).toHaveProperty('code');
    expect(country).toHaveProperty('name');
    expect(country).toHaveProperty('capital');
    expect(country).toHaveProperty('population');
    expect(country).toHaveProperty('flagUrl');

    expect(typeof country.code).toBe('string');
    expect(typeof country.name).toBe('string');
    expect(typeof country.capital).toBe('string');
    expect(typeof country.population).toBe('number');
    expect(typeof country.flagUrl).toBe('string');
  });

  it('/api/countries (GET) should return 502 when external API fails', async () => {
    mockHttpService.get.mockReturnValue(throwError(() => new Error('Network error')));

    await request(app.getHttpServer())
      .get('/api/countries')
      .expect(502)
      .expect((res) => {
        expect(res.body.message).toContain('Failed to fetch countries data');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

