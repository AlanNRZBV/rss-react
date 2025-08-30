import type { RowComponentProps } from 'react-window';

const CountryListItem = ({
  index,
  names,
  style,
}: RowComponentProps<{ names: string[] }>) => {
  return <li style={style}>{names[index]}</li>;
};

export default CountryListItem;
