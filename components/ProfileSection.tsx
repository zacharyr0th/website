// Server Component: ProfileSection

import Image from "next/image";

export default function ProfileSection() {
  return (
    <div className="text-center mb-2">
      <div className="profile-picture">
        <Image
          src="/profile-picture.jpg"
          alt="Zachary Roth"
          width={256}
          height={256}
          className="object-cover"
          priority
        />
      </div>
    
      <h1 className="profile-name">
        Zachary Roth
      </h1>
      <p className="profile-title">
        Technologist, Writer, Musician
      </p>
    </div>
  );
}
