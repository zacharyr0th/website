import React, { useState } from 'react';

const AudioSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-16 px-4" style={{
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text-primary)',
      borderRadius: 'var(--border-radius-lg)',
      boxShadow: 'var(--box-shadow)'
    }}>
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--color-primary)' }}>
        Audio Player
      </h2>
      <div className="max-w-3xl mx-auto bg-opacity-50" style={{
        backgroundColor: 'var(--color-secondary)',
        borderRadius: 'var(--border-radius-md)',
        padding: '2rem',
      }}>
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 mr-6 overflow-hidden" style={{
            borderRadius: 'var(--border-radius-sm)',
          }}>
            <img src="/path/to/album-cover.jpg" alt="Album Cover" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Song Title</h3>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Artist Name</p>
          </div>
        </div>
        <div className="mb-4 h-2 w-full relative cursor-pointer" style={{
          backgroundColor: 'var(--color-text-secondary)',
          borderRadius: 'var(--border-radius-full)',
        }}>
          <div className="h-full w-1/3 relative" style={{
            backgroundColor: 'var(--color-primary)',
            borderRadius: 'var(--border-radius-full)',
          }}>
            <div className="absolute right-0 top-1/2 transform translate-y-(-50%) w-4 h-4 rounded-full"
              style={{ backgroundColor: 'var(--color-accent)' }}></div>
          </div>
        </div>
        <div className="flex justify-between text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <span>1:23</span>
          <span>3:45</span>
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <button className="p-2 rounded-full" style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-text-primary)',
          }}>
            &#9664;&#9664;
          </button>
          <button className="p-2 rounded-full" style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-text-primary)',
          }}>
            &#9658;
          </button>
          <button className="p-2 rounded-full" style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-text-primary)',
          }}>
            &#9654;&#9654;
          </button>
        </div>
      </div>
    </section>
  );
};

export default AudioSection;