import { Country } from '../../types/country';
import { SortKey, SortDirection } from './CountriesPage';

export const filterCountries = (countries: Country[], searchQuery: string): Country[] => {
  if (!searchQuery.trim()) {
    return countries;
  }
  
  const query = searchQuery.toLowerCase().trim();
  return countries.filter((country) =>
    country.name.toLowerCase().includes(query)
  );
};

export const sortCountries = (
  countries: Country[],
  sortKey: SortKey,
  sortDirection: SortDirection
): Country[] => {
  const sorted = [...countries].sort((a, b) => {
    let comparison = 0;

    if (sortKey === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortKey === 'population') {
      comparison = a.population - b.population;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return sorted;
};

export const filterAndSortCountries = (
  countries: Country[],
  searchQuery: string,
  sortKey: SortKey,
  sortDirection: SortDirection
): Country[] => {
  const filtered = filterCountries(countries, searchQuery);
  return sortCountries(filtered, sortKey, sortDirection);
};

