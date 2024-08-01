'use client';

import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function LikeButton({ postSlug }: { postSlug: string }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = async () => {
    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postSlug, liked: !liked }),
      });

      if (response.ok) {
        const data = await response.json();
        setLiked(data.liked);
        setLikeCount(data.likeCount);
      } else {
        console.error('Failed to update like status');
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center space-x-2 text-gray-600 hover:text-red-500"
    >
      {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      <span>{likeCount}</span>
    </button>
  );
}