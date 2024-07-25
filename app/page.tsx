'use client';

import ProfileSection from "../components/ProfileSection";
import TabSection from "../components/TabSection";
import ContactModal from "../components/ContactModal/ContactModal";

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
