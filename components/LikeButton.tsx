'use client';

import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function LikeButton({ postSlug }: { postSlug: string }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = async () => {
    // TODO: Implement API call to update like count
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
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
