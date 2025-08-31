export const indexToColumnDataGrid = (index: number) => {
  switch (index % 5) {
    case 0:
      return 'year';
    case 1:
      return 'population';
    case 2:
      return 'co2';
    case 3:
      return 'co2_per_capita';
    case 4:
      return 'methane';
    case 5:
      return 'oil_co2';
    case 6:
      return 'temperature_change_from_co2';
    default:
      return '';
  }
};
