import React from 'react';

const BioPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Bio</h1>
      <div className="prose">
        <p>
          Welcome to my bio page. Here you can add information about yourself,
          your background, interests, and achievements.
        </p>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default BioPage;

