import { type FC } from 'react';
interface DataDisplayProps {
  data: FormDataDisplay;
}
const DataDisplay: FC<DataDisplayProps> = ({ data }) => {
  const {
    name,
    email,
    age,
    password,
    confirmPassword,
    gender,
    country,
    tAndC,
    lastModified,
  } = data;
  return (
    <ul>
      <li>name: {name}</li>
      <li>email: {email}</li>
      <li>age: {age}</li>
      <li>password: {password}</li>
      <li>confirm password: {confirmPassword}</li>
      <li>gender: {gender}</li>
      <li>country: {country}</li>
      <li>images: ---</li>
      <li>terms and conditions: {tAndC ? 'accepted' : 'not accepted'}</li>
      <li>last modified: {lastModified ? lastModified : 'never'}</li>
    </ul>
  );
};

export default DataDisplay;
