// Server Component: ProfileSection

import Image from 'next/image';

export default function ProfileSection() {
  return (
    <div className="text-center pt-8">
      <div className="profile-picture">
        <Image
          src="/profile-picture.webp"
          alt="Zachary Roth"
          width={256}
          height={256}
          className="object-cover"
          priority
        />
      </div>

      <h1 className="profile-name">Zachary Roth</h1>
      <p className="profile-title">Technologist, Writer, Musician</p>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .profile-picture {
          animation: fadeIn 0.8s ease-out;
        }

        .profile-name,
        .profile-title {
          animation: fadeInUp 0.8s ease-out;
        }

        .profile-name {
          animation-delay: 0.2s;
        }

        .profile-title {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}