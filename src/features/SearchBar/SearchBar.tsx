import { type ChangeEvent, Component, type FormEvent } from 'react';

interface Props {
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

class SearchBar extends Component<Props> {
  render() {
    const isEmpty = this.props.search === '';
    return (
      <form
        onSubmit={this.props.onSubmit}
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
              value={this.props.search}
              onChange={this.props.onChange}
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
