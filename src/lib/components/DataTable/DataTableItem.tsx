import type { CellComponentProps } from 'react-window';
import { indexToColumnDataGrid } from '@/lib/util/indexToColumnDataGrid.ts';

const DataTableItem = ({
  columnIndex,
  rowIndex,
  style,
  dataList,
}: CellComponentProps<{ dataList: CountryData[] }>) => {
  const country = dataList[rowIndex];
  const field = indexToColumnDataGrid(columnIndex);
  const content = country[field as keyof typeof country];
  return <div style={style}>{content ?? 'N/A'}</div>;
};

export default DataTableItem;
