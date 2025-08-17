'use client';
import { ChangeEvent } from 'react';
import { routing } from '@/i18n/routing';
import { redirect } from '@/i18n/navigation.ts';
import { useLocale } from 'next-intl'; // Import routing

export default function LangSwitcher() {
  const currentLocale = useLocale();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    redirect({ href: '/', locale: newLocale });
  };

  return (
    <select
      onChange={handleChange}
      value={currentLocale}
      className="rounded border p-2 dark:text-gray-400"
    >
      {routing.locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
