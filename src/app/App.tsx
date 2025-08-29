import { Component } from 'react';
import Column from '../lib/components/Column/Column.tsx';
import CountryList from '../lib/components/CountryList/CountryList.tsx';

class App extends Component {
  render() {
    return (
      <div className="p-4 w-full grid grid-cols-12 gap-4">
        <Column className="col-span-4">
          <CountryList />
        </Column>
        <Column className="col-span-8">data table</Column>
      </div>
    );
  }
}
export default App;
