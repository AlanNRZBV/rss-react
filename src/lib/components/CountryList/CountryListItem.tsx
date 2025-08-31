import type { CellComponentProps } from 'react-window';
import { indexToColumnCountryGrid } from '@/lib/util/indexToColumnCountryGrid.ts';

const CountryListItem = ({
  columnIndex,
  rowIndex,
  style,
  countries,
  onClick,
}: CellComponentProps<{
  countries: CountryListItemType[];
  onClick: (arg: string) => void;
}>) => {
  const country = countries[rowIndex];
  const field = indexToColumnCountryGrid(columnIndex);
  const content = country[field as keyof typeof country];

  return (
    <div
      onClick={() => {
        onClick(country.name);
      }}
      className="hover:text-blue-500 cursor-pointer"
      style={style}
    >
      {content ?? 'N/A'}
    </div>
  );
};

export default CountryListItem;
