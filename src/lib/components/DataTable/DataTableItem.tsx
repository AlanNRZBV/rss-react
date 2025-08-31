import type { CellComponentProps } from 'react-window';

const DataTableItem = ({
  columnIndex,
  rowIndex,
  style,
  dataList,
  selectedColumns,
}: CellComponentProps<{
  dataList: CountryData[];
  selectedColumns: string[];
}>) => {
  const country = dataList[rowIndex];
  const field = selectedColumns[columnIndex];
  const content = country[field as keyof typeof country];
  let displayContent = content ?? 'N/A';

  if (typeof content === 'number') {
    if (!Number.isInteger(content)) {
      displayContent = content.toFixed(4);
    } else {
      displayContent = content.toString();
    }
  }

  return (
    <div
      style={style}
      title={field}
      className="border-l border-b border-gray-300 pl-2"
    >
      {displayContent}
    </div>
  );
};

export default DataTableItem;
