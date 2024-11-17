'use client';

import Image from 'next/image';
import { memo } from 'react';

function ProfileImage() {
  return (
    <div className="relative w-48 h-48">
      <Image
        src="/misc/profile-picture.webp"
        alt="Profile picture"
        width={192}
        height={192}
        className="rounded-full object-cover shadow-lg transition-shadow hover:shadow-xl"
        priority
        quality={90}
      />
      <input 
        type="file"
        accept="image/*"
        aria-label="Upload profile picture"
        className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
      />
    </div>
  );
}

const MemoizedProfileImage = memo(ProfileImage);
MemoizedProfileImage.displayName = 'ProfileImage';

export default MemoizedProfileImage;