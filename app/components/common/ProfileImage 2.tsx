import Image from 'next/image';

const ProfileImage = () => {
  return (
    <div className="relative aspect-square w-48">
      <Image
        src="/misc/profile-picture.webp"
        alt="Profile picture"
        fill
        className="rounded-full object-cover shadow-lg transition-shadow hover:shadow-xl"
      />
      <input
        type="file"
        accept="image/*"
        aria-label="Upload profile picture"
        className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
      />
    </div>
  );
};

export default ProfileImage;
