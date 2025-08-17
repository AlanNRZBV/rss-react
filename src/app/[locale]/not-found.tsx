import React from 'react';
import { Link } from '@/i18n/navigation.ts';

const NotFound = () => {
  return (
    <div className="dark:text-gray-400">
      Custom 404 page. Nothing to do here.
      <Link href="/">Return Home</Link>
    </div>
  );
};

export default NotFound;
