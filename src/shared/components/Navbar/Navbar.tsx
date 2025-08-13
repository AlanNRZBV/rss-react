'use client';
import Link from 'next/link';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { toggleView } from '@/lib/features/DetailedView/detailedViewSlice.ts';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks.ts';
import { useThemeActions } from '@/lib/hooks/useThemeActions.ts';
import { useTheme } from '@/lib/hooks/useTheme.ts';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const actions = useThemeActions();
  const theme = useTheme();
  const pathname = usePathname();

  const toggleHandle = () => {
    actions.toggleTheme();
  };

  return (
    <div data-testid="navbar" className="mb-8 border-b border-b-gray-400 pb-4">
      <div className="flex items-center gap-4">
        <Link
          onClick={() => {
            dispatch(toggleView('close'));
          }}
          href="/"
          className={
            pathname === '/' ? 'font-bold text-blue-500' : 'text-gray-600'
          }
        >
          Home
        </Link>
        <Link
          href="/about"
          className={
            pathname === '/about' ? 'font-bold text-blue-500' : 'text-gray-600'
          }
        >
          About
        </Link>
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
