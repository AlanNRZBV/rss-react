import { type ChangeEvent, Component } from 'react';

class SearchBar extends Component {
  state = {
    search: '',
  };

  handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleSubmit = () => {};

  render() {
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
        <button type="submit" className="border border-gray-400">
          submit
        </button>
      </form>
    );
  }
}

export default SearchBar;
