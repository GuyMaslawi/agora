import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { CountryDto } from './countries.dto';

interface RestCountriesResponse {
  cca2: string;
  name: { common: string };
  capital?: string[];
  population: number;
  flags: { png: string; svg: string };
}

@Injectable()
export class CountriesService {
  private readonly API_URL = 'https://restcountries.com/v3.1/all?fields=cca2,name,capital,population,flags';

  async findAll(): Promise<CountryDto[]> {
    try {
      const { data } = await axios.get<RestCountriesResponse[]>(this.API_URL);
      return data.map((country) => ({
        code: country.cca2 || '',
        name: country.name?.common || 'Unknown',
        capital: country.capital?.[0] || 'N/A',
        population: country.population || 0,
        flagUrl: country.flags?.png || country.flags?.svg || '',
      }));
    } catch (error) {
      throw new HttpException(
        'Failed to fetch countries data. Please try again later.',
        HttpStatus.BAD_GATEWAY
      );
    }
  }
}

