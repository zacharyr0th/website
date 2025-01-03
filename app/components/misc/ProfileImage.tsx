import React, { useState, MouseEvent } from 'react';
import { motion, AnimatePresence, TargetAndTransition } from 'framer-motion';
import Image from 'next/image';

interface ProfileImageProps {
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
  clickable?: boolean;
  onImageChange?: (file: File) => void;
}

const sizes = {
  sm: 'w-24',
  md: 'w-48',
  lg: 'w-96',
};

const hoverScale: TargetAndTransition = { scale: 1.05 };
const tapScale: TargetAndTransition = { scale: 0.95 };

const ProfileImage = ({ size = 'md', editable = false, clickable = true, onImageChange }: ProfileImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => clickable && setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <>
      <motion.div
        className={`profile-image relative aspect-square ${sizes[size]}`}
        whileHover={clickable ? hoverScale : {}}
        whileTap={clickable ? tapScale : {}}
        onClick={handleClick}
        style={{ cursor: clickable ? 'pointer' : 'default' }}
      >
        <Image
          src="/misc/profile-picture.webp"
          alt="Profile picture of Zachary Roth"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover shadow-lg transition-all duration-300 hover:shadow-2xl"
        />
        {editable && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            aria-label="Upload profile picture"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        )}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="profile-image relative aspect-square w-[80vh] max-w-3xl bg-surface p-4 rounded-2xl shadow-2xl"
              onClick={(e: MouseEvent) => e.stopPropagation()}
            >
              <Image
                src="/misc/profile-picture.webp"
                alt="Profile picture of Zachary Roth"
                fill
                priority
                sizes="80vh"
                className="object-cover shadow-lg"
              />
              <button
                onClick={handleClose}
                className="absolute -top-2 -right-2 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                aria-label="Close modal"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileImage;
