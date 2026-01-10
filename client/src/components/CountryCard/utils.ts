export const formatPopulation = (population: number): string => {
  return new Intl.NumberFormat('en-US').format(population);
};

