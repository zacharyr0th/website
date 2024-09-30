import React from 'react';
import Image from 'next/image';

const MusicContent: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">My Music</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Music item 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="/path/to/album-cover-1.jpg"
              alt="Album 1"
              width={300}
              height={300}
              className="w-full"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Album Title 1</h3>
              <p className="text-gray-600 mb-4">Brief description of the album or track.</p>
              <a href="#" className="text-blue-500 hover:underline">
                Listen Now
              </a>
            </div>
          </div>

          {/* Music item 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="/path/to/album-cover-2.jpg"
              alt="Album 2"
              width={300}
              height={300}
              className="w-full"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Album Title 2</h3>
              <p className="text-gray-600 mb-4">Brief description of the album or track.</p>
              <a href="#" className="text-blue-500 hover:underline">
                Listen Now
              </a>
            </div>
          </div>

          {/* Music item 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="/path/to/album-cover-3.jpg"
              alt="Album 3"
              width={300}
              height={300}
              className="w-full"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Album Title 3</h3>
              <p className="text-gray-600 mb-4">Brief description of the album or track.</p>
              <a href="#" className="text-blue-500 hover:underline">
                Listen Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicContent;
