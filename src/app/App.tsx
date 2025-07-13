import { type ChangeEvent, Component, type FormEvent } from 'react';
import SearchBar from '../features/SearchBar/SearchBar.tsx';
import ItemList from '../features/ItemList/ItemList.tsx';
import ErrorBoundary from '../shared/components/errorBoundary/ErrorBoundary.tsx';
import { errorMessages } from '../shared/lib/errorMessages.ts';
import { baseApi } from '../shared/api/instance.ts';
import axios from 'axios';

class App extends Component<object, AppState> {
  state: AppState = {
    search: '',
    defaultSearch: {
      count: 0,
      next: '',
      previous: null,
      results: [],
    },
    pokemon: {
      id: 0,
      height: 0,
      name: '',
      order: 0,
      weight: 0,
    },
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await baseApi.get<PokemonExtended>(`/${this.state.search}`);
      console.log(res);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 400) {
        throw new Error('');
      } else if (axios.isAxiosError(e) && e.code === 'ERR_NETWORK') {
        console.log('server error', e.message);
      }
    }
  };

  render() {
    const { itemListErrorMsg, searchBarErrorMsg } = errorMessages;
    return (
      <div className="border border-amber-600 h-full w-full flex justify-center">
        <div className="border border-blue-500 w-full mx-4 2xl:mx-32 xl:mx-28 lg:mx-16 sm:mx-8 py-2 px-4">
          <ErrorBoundary message={searchBarErrorMsg}>
            <SearchBar
              onChange={this.handleChange}
              search={this.state.search}
              onSubmit={this.handleSubmit}
            />
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
