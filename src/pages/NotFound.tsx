import { NavLink } from 'react-router';

const NotFound = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col">
        <h1 className="mb-2 text-2xl">Whoops, something went wrong!</h1>
        <NavLink
          className="self-center text-lg font-bold text-blue-400 uppercase"
          to={'/'}
        >
          Click here!
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
