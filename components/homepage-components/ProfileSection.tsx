import React from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const ProfileSection: React.FC = () => (
  <section className="flex justify-center p-8 text-gray-300">
    <div className="flex flex-col items-center max-w-xl mt-16">
      <Image
        src="/profile-picture.webp"
        alt="Zachary Roth"
        width={224}
        height={224}
        className="rounded-full mb-6"
        priority
      />
      <h1 className={`${inter.className} text-4xl mb-3 text-center`}>Zachary Roth</h1>
      <h2 className={`${inter.className} text-base mb-4 text-center text-gray-400 font-normal`}>
        Technologist • Writer • Musician
      </h2>
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
  </section>
);

export default ProfileSection;
