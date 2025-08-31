import type { CellComponentProps } from 'react-window';
import { indexToColumnCountryGrid } from '@/lib/util/indexToColumnCountryGrid.ts';
import { useCallback } from 'react';

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

  const clickHandle = useCallback(() => {
    onClick(country.name);
  }, [country.name, onClick]);

  return (
    <div
      onClick={clickHandle}
      className="hover:text-blue-500 cursor-pointer"
      style={style}
    >
      {content ?? 'N/A'}
    </div>
  );
};

export default CountryListItem;
