'use client';

import { motion } from 'framer-motion';
import ProfileSection from '../components/homepage-components/ProfileSection';
import TabSection from '../components/homepage-components/TabSection';
import ContactModal from '../components/homepage-components/ContactModal/ContactModal';

export default function Home() {
  return (
    <motion.main
      className="flex flex-col items-center justify-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center">
        <ProfileSection />
        <TabSection />
        <ContactModal />
      </div>
    </motion.main>
  );
}
