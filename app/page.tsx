'use client';

import ProfileSection from '../components/homepage-components/ProfileSection';
import TabSection from '../components/homepage-components/TabSection';
import ContactModal from '../components/homepage-components/ContactModal/ContactModal';

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
