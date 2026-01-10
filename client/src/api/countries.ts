import { Country } from '../types/country';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/countries`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Failed to connect to server. Please make sure the server is running.');
    }
    throw error;
  }
};

