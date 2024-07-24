'use client';

import ProfileSection from "../components/ProfileSection";
import TabSection from "../components/TabSection";
import ContactModal from "../components/ContactModal/ContactModal";

export default function Home() {
  return (
    <main className="flex-grow">
      <ProfileSection />
      <TabSection />
      <ContactModal />
    </main>
  );
}
