import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CountryDto } from './countries.dto';

interface RestCountriesResponse {
  cca2: string;
  name: {
    common: string;
  };
  capital?: string[];
  population: number;
  flags: {
    png: string;
    svg: string;
  };
}

interface CacheEntry {
  data: CountryDto[];
  expiresAt: number;
}

@Injectable()
export class CountriesService {
  private readonly logger = new Logger(CountriesService.name);
  private cache: CacheEntry | null = null;
  private readonly CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
  private readonly API_URL = 'https://restcountries.com/v3.1/all?fields=cca2,name,capital,population,flags';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<CountryDto[]> {
    // Check cache
    if (this.cache && this.cache.expiresAt > Date.now()) {
      this.logger.log('Returning cached countries data');
      return this.cache.data;
    }

    try {
      this.logger.log('Fetching countries from external API');
      const response = await firstValueFrom(
        this.httpService.get<RestCountriesResponse[]>(this.API_URL)
      );

      const countries = this.normalizeCountries(response.data);

      // Update cache
      this.cache = {
        data: countries,
        expiresAt: Date.now() + this.CACHE_TTL_MS,
      };

      return countries;
    } catch (error) {
      this.logger.error('Failed to fetch countries from external API', error);
      throw new HttpException(
        'Failed to fetch countries data. Please try again later.',
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  private normalizeCountries(data: RestCountriesResponse[]): CountryDto[] {
    return data
      .map((country) => {
        try {
          return {
            code: country.cca2 || '',
            name: country.name?.common || 'Unknown',
            capital: country.capital?.[0] || 'N/A',
            population: country.population || 0,
            flagUrl: country.flags?.png || country.flags?.svg || '',
          };
        } catch (error) {
          this.logger.warn(`Failed to normalize country: ${JSON.stringify(country)}`, error);
          return null;
        }
      })
      .filter((country): country is CountryDto => country !== null);
  }
}

