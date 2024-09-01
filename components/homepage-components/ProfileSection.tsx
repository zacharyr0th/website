import React from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const ProfileSection = () => (
  <div className="flex flex-col p-8 text-gray-300">
    <div className="flex justify-center mt-8">
      <div className="flex flex-col items-center max-w-xl mt-16">
        <div className="w-56 h-56 rounded-full overflow-hidden mb-6">
          <Image
            src="/profile-picture.webp"
            alt="Zachary Roth"
            width={240}
            height={240}
            className="rounded-full"
            priority
          />
        </div>
        <h2 className={`${inter.className} text-4xl mb-3 text-center`}>Zachary Roth</h2>
        <h3 className={`${inter.className} text-lg mb-4 text-center text-gray-400`}>
          Technologist • Writer • Musician
        </h3>
        <p className={`${inter.className} text-base text-center`}>
          Head of Growth for DeFi and AI at
          <a
            href="https://aptoslabs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-semibold ml-1"
          >
            Aptos Labs
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default ProfileSection;
