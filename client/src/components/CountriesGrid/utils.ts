import { Country } from '../../types/country';

export const preloadImages = (
  countries: Country[],
  onLoad: (code: string) => void,
  onError: (code: string) => void
): void => {
  countries.forEach((country) => {
    const img = new Image();
    img.onload = () => {
      onLoad(country.code);
    };
    img.onerror = () => {
      onError(country.code);
    };
    img.src = country.flagUrl;
  });
};

export const SKELETON_COUNT = 12;

