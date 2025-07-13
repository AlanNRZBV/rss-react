import { Component } from 'react';
import SearchBar from '../features/SearchBar/SearchBar.tsx';

class App extends Component {
  render() {
    return (
      <div className="border border-amber-600 h-full w-full">
        <SearchBar />
      </div>
    );
  }
}
export default App;
