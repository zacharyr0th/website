import React from 'react';
import Image from 'next/image';

const ProfileSection = () => (
  <div className="profile-section">
    <div className="profile-info">
      <div className="profile-text">
        <div className="profile-photo-container">
          <Image
            src="/profile-picture.webp"
            alt="Zachary Roth"
            width={240}
            height={240}
            className="rounded-full"
            priority
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
      }
      .profile-text {
        max-width: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 4rem;
      }
      .profile-photo-container {
        width: 220px;
        height: 220px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 1.5rem;
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

export default ProfileSection;