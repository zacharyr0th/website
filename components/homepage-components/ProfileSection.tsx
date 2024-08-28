// Server Component: ProfileSection

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

const logos = [
  '/images/logos/aptos-logo.webp',
  '/images/logos/solana-logo.webp',
  '/images/logos/ethereum-logo.webp',
];

export default function ProfileSection() {
  const logoRef = React.useRef(null);
  const isLogoInView = useInView(logoRef, { once: true, amount: 0.5 });

  return (
    <div className="profile-section">
      <div className="profile-info">
        <div className="profile-text">
          <div className="profile-photo-container">
            <Image
              src="/profile-picture.webp"
              alt="Zachary Roth"
              width={240}
              height={240}
              className="profile-photo"
            />
          </div>
          <h2 className="profile-name">Zachary Roth</h2>
          <h3 className="profile-subtitle">Technologist • Writer • Musician</h3>
          <p className="profile-description">
            Head of Growth for DeFi and AI at
            <a
              href="https://aptoslabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pastel-blue hover:underline font-semibold ml-1"
            >
              Aptos Labs
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .profile-section {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          color: #d1d5db;
        }
        .profile-info {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
          border-radius: 1rem;
          padding: 0rem;
        }
        .profile-text {
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 4rem;
        }
        .profile-photo-container {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        .profile-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-name {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .profile-subtitle {
          font-size: 1.15rem;
          margin: 1rem;
          text-align: center;
          color: #9ca3af;
        }
        .profile-description {
          font-size: 1rem;
          line-height: 1.5;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
