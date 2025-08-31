export const indexToColumnCountryGrid = (index: number) => {
  switch (index % 3) {
    case 0:
      return 'name';
    case 1:
      return 'isoCode';
    case 2:
      return 'population';
    default:
      return '';
  }
};
