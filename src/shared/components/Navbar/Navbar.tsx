'use client';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useThemeActions } from '@/lib/hooks/useThemeActions.ts';
import { useTheme } from '@/lib/hooks/useTheme.ts';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation.ts';
import LangSwitcher from '@/shared/components/LangSwitcher/LangSwitcher.tsx';
import { toggleView } from '@/lib/features/DetailedView/detailedViewSlice.ts';
import { useAppDispatch } from '@/lib/hooks.ts';

const Navbar = () => {
  const t = useTranslations('HomePage');
  const actions = useThemeActions();
  const theme = useTheme();
  const dispatch = useAppDispatch();

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
          className="capitalize dark:text-gray-300"
        >
          {t('navHome')}
        </Link>
        <Link className="capitalize dark:text-gray-300" href="/about">
          {t('navAbout')}
        </Link>
        <LangSwitcher />
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
