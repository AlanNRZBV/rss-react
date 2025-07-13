import { type ChangeEvent, Component, type FormEvent } from 'react';
import SearchBar from '../features/SearchBar/SearchBar.tsx';
import PokemonsList from '../features/PokemonsList/PokemonsList.tsx';
import ErrorBoundary from '../shared/components/errorBoundary/ErrorBoundary.tsx';
import { errorMessages } from '../shared/lib/errorMessages.ts';
import { baseApi } from '../shared/api/instance.ts';
import axios from 'axios';

class App extends Component<object, AppState> {
  state: AppState = {
    search: '',
    defaultSearch: undefined,
    pokemon: undefined,
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => ({ ...prevState, search: e.target.value }));
  };

  async componentDidMount() {
    try {
      const savedData = localStorage.getItem('searchData');
      if (!savedData) {
        const res = await baseApi.get<DefaultResponse>(`/?limit=20&offset=0`);
        this.setState((prevState) => ({
          ...prevState,
          defaultSearch: res.data,
          pokemon: undefined,
        }));
        return;
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 400) {
        throw new Error('');
      } else if (axios.isAxiosError(e) && e.code === 'ERR_NETWORK') {
        console.log('server error', e.message);
      }
    }
  }

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await baseApi.get<PokemonExtended>(`/${this.state.search}`);
      this.setState((prevState) => ({
        ...prevState,
        pokemon: res.data,
        defaultSearch: undefined,
      }));
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
            <PokemonsList
              defaultSearch={this.state.defaultSearch}
              pokemon={this.state.pokemon}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}
export default App;
