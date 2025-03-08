import React, { useState, useCallback, memo } from 'react';
import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TargetAndTransition, VariantLabels } from 'framer-motion';
import Image from 'next/image';

/**
 * ProfileImage component - Displays a user profile image with optional modal view and edit functionality
 */
interface ProfileImageProps {
  /** Size of the profile image: 'sm' (small), 'md' (medium), or 'lg' (large) */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the image can be edited (shows file input) */
  editable?: boolean;
  /** Whether the image is clickable to show modal */
  clickable?: boolean;
  /** Callback when image is changed */
  onImageChange?: (file: File) => void;
}

// Animation constants
const hoverScale: TargetAndTransition = { scale: 1.05 };
const tapScale: TargetAndTransition = { scale: 0.95 };

// Size mapping object for better performance
const SIZE_CLASSES = {
  sm: 'w-24',
  md: 'w-48',
  lg: 'w-96'
};

const ProfileImage = memo(function ProfileImage({
  size = 'md',
  editable = false,
  clickable = true,
  onImageChange,
}: ProfileImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get size class from mapping object
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  // Memoized event handlers
  const handleClick = useCallback(() => {
    if (clickable) setIsModalOpen(true);
  }, [clickable]);
  
  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  }, [onImageChange]);

  const handleModalClick = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <>
      <motion.div
        className={`profile-image relative aspect-square ${sizeClass}`}
        whileHover={clickable ? hoverScale : undefined as unknown as TargetAndTransition | VariantLabels}
        whileTap={clickable ? tapScale : undefined as unknown as TargetAndTransition | VariantLabels}
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
              onClick={handleModalClick}
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
});

export default ProfileImage;
