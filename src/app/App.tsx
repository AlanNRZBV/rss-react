import { type ChangeEvent, Component, type FormEvent } from 'react';
import { baseApi } from '../shared/api/instance.ts';
import axios from 'axios';
import { Outlet } from 'react-router';

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
    localStorage.setItem('searchData', this.state.search);

    this.setState((prevState) => ({
      ...prevState,
      search: e.target.value.toLowerCase().trim(),
    }));
  };

  defaultRequest = async () => {
    const res = await baseApi.get<DefaultResponse>(`/?limit=20&offset=0`);
    this.setState((prevState) => ({
      ...prevState,
      defaultSearch: res.data,
      pokemon: undefined,
    }));
    this.setState((prevState) => ({ ...prevState, isLoading: false }));
  };

  async componentDidMount() {
    const searchData = localStorage.getItem('searchData');
    try {
      this.setState((prevState) => ({ ...prevState, isLoading: true }));
      this.setState((prevState) => ({ ...prevState, isError: false }));

      if (!searchData) {
        await this.defaultRequest();
        return;
      }
      this.setState((prevState) => ({
        ...prevState,
        search: searchData,
      }));
      const res = await baseApi.get<PokemonExtended>(`/${searchData}`);
      this.setState((prevState) => ({
        ...prevState,
        pokemon: res.data,
        defaultSearch: undefined,
      }));
      this.setState((prevState) => ({ ...prevState, isLoading: false }));
    } catch (e) {
      this.handleError(e);
    }
  }

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const isEmpty = this.state.search.length === 0;

      if (isEmpty) {
        await this.defaultRequest();
        return;
      }

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
      this.handleError(e);
    }
  };

  handleError = (e: unknown) => {
    this.setState((prevState) => ({ ...prevState, isLoading: false }));

    if (axios.isAxiosError(e)) {
      const status = e.response?.status;
      const { message, code } = e;

      const errorStates: { [key: string]: string } = {
        403: 'Forbidden',
        404: 'Not found',
        500: 'Server error',
        ERR_NETWORK: 'Network error',
        ERR_CANCELED: 'Request canceled',
      };

      if (status && errorStates[status]) {
        this.setState((prevState) => ({
          ...prevState,
          isError: true,
          error: { status, message },
        }));
        console.error(`${errorStates[status]} ---`, e.message);
      } else if (code && errorStates[code]) {
        this.setState((prevState) => ({
          ...prevState,
          isError: true,
          error: { status: status || 0, message },
        }));
        console.error(`${errorStates[code]} ---`, e.message);
      } else {
        this.setState((prevState) => ({
          ...prevState,
          isError: true,
          error: { status: status || 0, message: e.message || 'Unknown error' },
        }));
        console.error('Unknown error ---', e);
      }
    } else {
      this.setState((prevState) => ({
        ...prevState,
        isError: true,
        error: { status: 0, message: 'Unexpected error' },
      }));
      console.error('Unexpected error ---', e);
    }
  };

  render() {
    return <Outlet />;
  }
}
export default App;
