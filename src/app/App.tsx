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
    isLoading: false,
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => ({ ...prevState, search: e.target.value }));
  };

  async componentDidMount() {
    try {
      this.setState((prevState) => ({ ...prevState, isLoading: true }));
      const savedData = localStorage.getItem('searchData');
      if (!savedData) {
        const res = await baseApi.get<DefaultResponse>(`/?limit=20&offset=0`);
        this.setState((prevState) => ({
          ...prevState,
          defaultSearch: res.data,
          pokemon: undefined,
        }));
        this.setState((prevState) => ({ ...prevState, isLoading: false }));
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
      this.setState((prevState) => ({ ...prevState, isLoading: true }));
      const res = await baseApi.get<PokemonExtended>(`/${this.state.search}`);
      this.setState((prevState) => ({
        ...prevState,
        pokemon: res.data,
        defaultSearch: undefined,
      }));
      this.setState((prevState) => ({ ...prevState, isLoading: false }));
      return;
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
      <div className="flex h-full w-full justify-center">
        <div className="mx-4 flex w-full flex-col gap-8 px-4 py-2 sm:mx-8 lg:mx-16 xl:mx-28 2xl:mx-32">
          <ErrorBoundary message={searchBarErrorMsg}>
            <SearchBar
              onChange={this.handleChange}
              search={this.state.search}
              onSubmit={this.handleSubmit}
              isLoading={this.state.isLoading}
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
