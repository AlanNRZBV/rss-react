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
    isError: false,
    error: undefined,
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => ({ ...prevState, search: e.target.value }));
  };

  async componentDidMount() {
    try {
      this.setState((prevState) => ({ ...prevState, isLoading: true }));
      this.setState((prevState) => ({ ...prevState, isError: false }));
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
      this.setState((prevState) => ({ ...prevState, isLoading: false }));
      if (axios.isAxiosError(e)) {
        const status = e.response?.status;
        const { message, code } = e;

        if (status === 403) {
          this.setState((prevState) => ({
            ...prevState,
            isError: true,
            error: {
              status: status,
              message: message,
            },
          }));
          console.error('Forbidden ---', e.message);
        } else if (status === 404) {
          this.setState((prevState) => ({
            ...prevState,
            isError: true,
            error: {
              status: status,
              message: message,
            },
          }));
          console.error('Not found ---', e.message);
        } else if (status === 500) {
          this.setState((prevState) => ({
            ...prevState,
            isError: true,
            error: {
              status: status,
              message: message,
            },
          }));
          console.error('Server error ---', e.message);
        } else if (code === 'ERR_NETWORK' && status) {
          this.setState((prevState) => ({
            ...prevState,
            isError: true,
            error: {
              status: status,
              message: message,
            },
          }));
          console.error('Network error ---', e.message);
        } else if (code === 'ERR_CANCELED' && status) {
          this.setState((prevState) => ({
            ...prevState,
            isError: true,
            error: {
              status: status,
              message: message,
            },
          }));
          console.error('Request canceled ---', e.message);
        } else {
          this.setState((prevState) => ({
            ...prevState,
            isError: true,
            error: {
              status: status ? status : 0,
              message: e.message ? e.message : 'Unknown error',
            },
          }));
          console.error('Unknown error ---', e);
        }
      } else {
        this.setState((prevState) => ({
          ...prevState,
          isError: true,
          error: {
            status: 0,
            message: 'Unexpected error',
          },
        }));
        console.error('Unexpected error ---', e);
      }
    }
  }

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      this.setState((prevState) => ({ ...prevState, isLoading: true }));
      this.setState((prevState) => ({ ...prevState, isError: false }));
      const res = await baseApi.get<PokemonExtended>(`/${this.state.search}`);
      this.setState((prevState) => ({
        ...prevState,
        pokemon: res.data,
        defaultSearch: undefined,
      }));
      this.setState((prevState) => ({ ...prevState, isLoading: false }));
      return;
    } catch (e) {
      this.setState((prevState) => ({ ...prevState, isLoading: false }));
      if (axios.isAxiosError(e)) {
        const status = e.response?.status;
        const { message, code } = e;

        if (status === 403) {
          this.setState((prevState) => ({
            ...prevState,
            isError: true,
            error: {
              status: status,
              message: message,
            },
          }));
          console.error('Forbidden ---', e.message);
        } else if (status === 404) {
          console.log(e);
          this.setState((prevState) => ({
            ...prevState,
            isError: true,
            error: {
              status: status,
              message: message,
            },
          }));
          console.error('Not found ---', e.message);
        } else if (status === 500) {
          this.setState((prevState) => ({
            ...prevState,
            isError: true,
            error: {
              status: status,
              message: message,
            },
          }));
          console.error('Server error ---', e.message);
        } else if (code === 'ERR_NETWORK' && status) {
          this.setState((prevState) => ({
            ...prevState,
            isError: true,
            error: {
              status: status,
              message: message,
            },
          }));
          console.error('Network error ---', e.message);
        } else if (code === 'ERR_CANCELED' && status) {
          this.setState((prevState) => ({
            ...prevState,
            isError: true,
            error: {
              status: status,
              message: message,
            },
          }));
          console.error('Request canceled ---', e.message);
        } else {
          this.setState((prevState) => ({
            ...prevState,
            isError: true,
            error: {
              status: status ? status : 0,
              message: e.message ? e.message : 'Unknown error',
            },
          }));
          console.error('Unknown error ---', e);
        }
      } else {
        this.setState((prevState) => ({
          ...prevState,
          isError: true,
          error: {
            status: 0,
            message: 'Unexpected error',
          },
        }));
        console.error('Unexpected error ---', e);
      }
    }
  };

  render() {
    const { itemListErrorMsg, searchBarErrorMsg } = errorMessages;
    const { search, defaultSearch, isError, isLoading, error, pokemon } =
      this.state;
    return (
      <div className="flex h-full w-full justify-center">
        <div className="mx-4 flex w-full flex-col gap-8 px-4 py-2 sm:mx-8 lg:mx-16 xl:mx-28 2xl:mx-32">
          <ErrorBoundary message={searchBarErrorMsg}>
            <SearchBar
              onChange={this.handleChange}
              search={search}
              onSubmit={this.handleSubmit}
              isLoading={isLoading}
            />
          </ErrorBoundary>
          <ErrorBoundary message={itemListErrorMsg}>
            <PokemonsList
              defaultSearch={defaultSearch}
              pokemon={pokemon}
              isLoading={isLoading}
              isError={isError}
              error={error}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}
export default App;
