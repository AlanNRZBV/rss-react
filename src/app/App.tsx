import { Component } from 'react';
import SearchBar from '../features/SearchBar/SearchBar.tsx';
import ItemList from '../features/ItemList/ItemList.tsx';
import ErrorBoundary from '../shared/components/errorBoundary/ErrorBoundary.tsx';
import { errorMessages } from '../shared/lib/errorMessages.ts';

class App extends Component {
  render() {
    const { itemListErrorMsg, searchBarErrorMsg } = errorMessages;
    return (
      <div className="border border-amber-600 h-full w-full flex justify-center">
        <div className="border border-blue-500 w-full mx-4 2xl:mx-32 xl:mx-28 lg:mx-16 sm:mx-8 py-2 px-4">
          <ErrorBoundary message={searchBarErrorMsg}>
            <SearchBar />
          </ErrorBoundary>
          <ErrorBoundary message={itemListErrorMsg}>
            <ItemList />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}
export default App;
