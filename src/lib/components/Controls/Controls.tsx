import { useDispatch, useSelector } from 'react-redux';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import {
  addColumn,
  removeColumn,
  selectColumns,
} from '@/lib/features/appSlice.ts';
import CustomButton from '@/lib/ui/CustomButton/CustomButton.tsx';

const Controls = () => {
  const dispatch = useDispatch();
  const selectedColumns = useSelector(selectColumns);

  const [checkboxes, setCheckboxes] = useState({
    methane: selectedColumns.includes('methane'),
    oil_co2: selectedColumns.includes('oil_co2'),
    gdp: selectedColumns.includes('gdp'),
  });

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Object.entries(checkboxes).forEach(([column, checked]) => {
      if (checked && !selectedColumns.includes(column)) {
        dispatch(addColumn(column));
      } else if (!checked && selectedColumns.includes(column)) {
        dispatch(removeColumn(column));
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <label>
        <input
          type="checkbox"
          name="methane"
          checked={checkboxes.methane}
          onChange={handleCheckboxChange}
        />
        Methane
      </label>
      <label>
        <input
          type="checkbox"
          name="oil_co2"
          checked={checkboxes.oil_co2}
          onChange={handleCheckboxChange}
        />
        Oil CO2
      </label>
      <label>
        <input
          type="checkbox"
          name="gdp"
          checked={checkboxes.gdp}
          onChange={handleCheckboxChange}
        />
        GDP
      </label>
      <CustomButton text="submit" type="submit" />
    </form>
  );
};

export default Controls;
