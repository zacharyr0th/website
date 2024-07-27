'use client';

import { FaShare } from 'react-icons/fa';

export default function ShareButton({ postSlug }: { postSlug: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Share URL: ' + window.location.href);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
    >
      <FaShare />
      <span>Share</span>
    </button>
  );
}