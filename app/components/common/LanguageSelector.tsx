'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { languages } from '../../i18n/settings';
import { LanguageCode } from '@/lib/types';

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as LanguageCode;
    // Instead of calling i18n.changeLanguage, we'll use the router to change the URL
    const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${newLang}`);
    router.push(newPathname);
  };

  return (
    <select onChange={handleChange} value={i18n.language}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
