'use client';

import ProfileSection from './HomePage/ProfileSection';
import TabSection from './HomePage/TabSection';
import ContactModal from './HomePage/ContactModal/ContactModal';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <ProfileSection />
        <TabSection />
        <ContactModal />
      </div>
    </main>
  );
}
