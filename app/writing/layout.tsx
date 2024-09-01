import React from 'react';

const WritingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="writing-layout">
    {children}
  </main>
);

export default WritingLayout;
