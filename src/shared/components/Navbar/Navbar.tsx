import { NavLink } from 'react-router';
import { useAppDispatch } from '../../../app/providers/store.ts';
import { toggleView } from '../../../app/appSlice.ts';
import { useContext } from 'react';
import { ThemeActionsContext } from '../../../app/context/themeActionsContext.ts';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { ThemeContext } from '../../../app/context/themeContext.ts';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const actions = useContext(ThemeActionsContext);
  const theme = useContext(ThemeContext);

  if (!actions) {
    throw new Error('Cant find context');
  }

  const toggleHandle = () => {
    actions.toggleTheme();
  };

  return (
    <div className="mb-8 border-b border-b-gray-400 pb-4">
      <div className="flex items-center gap-4">
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
        <button
          type="button"
          className="ml-auto h-[24px] w-[24-px] cursor-pointer text-black dark:border-gray-400 dark:text-gray-300"
          onClick={toggleHandle}
        >
          {theme === 'dark' ? (
            <MoonIcon className="h-full" />
          ) : (
            <SunIcon className="h-full" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
