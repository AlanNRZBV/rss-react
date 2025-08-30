import type { CellComponentProps } from 'react-window';
import { indexToColumn } from '@/lib/util/indexToColumn.ts';

const CountryListItem = ({
  columnIndex,
  rowIndex,
  style,
  countries,
}: CellComponentProps<{ countries: CountryListItemType[] }>) => {
  const country = countries[rowIndex];
  const field = indexToColumn(columnIndex);
  const content = country[field as keyof typeof country];

  return <div style={style}>{content ?? 'N/A'}</div>;
};

export default CountryListItem;
