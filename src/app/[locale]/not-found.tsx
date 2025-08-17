import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="dark:text-gray-400">
      Custom 404 page. Nothing to do here.
      <Link href="/public">Return Home</Link>
    </div>
  );
};

export default NotFound;
