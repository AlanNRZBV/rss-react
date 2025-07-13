import { type ChangeEvent, Component, type FormEvent } from 'react';
import axios from 'axios';
import { baseApi } from '../../shared/api/instance.ts';

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type Pokemon = {
  id: number;
  height: number;
  name: string;
  order: number;
  weight: number;
  types: PokemonType[];
};

class SearchBar extends Component {
  state = {
    search: '',
  };

  handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await baseApi.get<Pokemon>(`/${this.state.search}`);
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
    const isEmpty = this.state.search === '';
    return (
      <form
        onSubmit={this.handleSubmit}
        className="flex items-center border border-amber-600 px-4 py-2"
      >
        <div className="flex flex-col grow gap2">
          <label htmlFor="search" className="">
            Search
          </label>
          <div>
            <input
              type="text"
              id="search"
              className="border border-gray-400"
              placeholder="type here"
              value={this.state.search}
              onChange={this.handleNameChange}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isEmpty}
          className="border border-gray-400"
        >
          submit
        </button>
      </form>
    );
  }
}

export default SearchBar;
