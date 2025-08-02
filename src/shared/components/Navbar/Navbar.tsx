import { NavLink } from 'react-router';
import { useAppDispatch } from '../../../app/providers/store.ts';
import { toggleView } from '../../../app/appSlice.ts';

const Navbar = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="mb-8 border-b border-b-gray-400 pb-4">
      <div className="flex gap-4">
        <NavLink
          onClick={() => {
            dispatch(toggleView('close'));
          }}
          to="/"
          className={({ isActive }) =>
            isActive ? 'font-bold text-blue-500' : 'text-gray-600'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) =>
            isActive ? 'font-bold text-blue-500' : 'text-gray-600'
          }
        >
          About
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
