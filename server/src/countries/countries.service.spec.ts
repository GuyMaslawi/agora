import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { CountriesService } from './countries.service';
import { HttpException } from '@nestjs/common';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CountriesService', () => {
  let service: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountriesService],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return normalized countries from API', async () => {
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

      mockedAxios.get.mockResolvedValue({ data: mockApiResponse });

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        code: 'US',
        name: 'United States',
        capital: 'Washington, D.C.',
        population: 331000000,
        flagUrl: 'https://flagcdn.com/w320/us.png',
      });
      expect(result[1]).toEqual({
        code: 'CA',
        name: 'Canada',
        capital: 'Ottawa',
        population: 38000000,
        flagUrl: 'https://flagcdn.com/w320/ca.png',
      });
    });

    it('should handle missing fields gracefully', async () => {
      const mockApiResponse = [
        {
          cca2: 'XX',
          name: { common: 'Test Country' },
          capital: undefined,
          population: undefined,
          flags: undefined,
        },
      ];

      mockedAxios.get.mockResolvedValue({ data: mockApiResponse });

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        code: 'XX',
        name: 'Test Country',
        capital: 'N/A',
        population: 0,
        flagUrl: '',
      });
    });

    it('should throw HttpException when API call fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(service.findAll()).rejects.toThrow(HttpException);
      await expect(service.findAll()).rejects.toThrow('Failed to fetch countries data');
    });
  });
});

