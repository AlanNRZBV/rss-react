import { Component } from 'react';
import SearchBar from '../features/SearchBar/SearchBar.tsx';
import ItemList from '../features/ItemList/ItemList.tsx';

class App extends Component {
  render() {
    return (
      <div className="border border-amber-600 h-full w-full flex justify-center">
        <div className="border border-blue-500 w-full mx-4 2xl:mx-32 xl:mx-28 lg:mx-16 sm:mx-8">
          <SearchBar />
          <ItemList />
        </div>
      </div>
    );
  }
}
export default App;
