'use client';

import React from 'react';
import { motion } from 'framer-motion';

const VisualPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1>Visuals Page</h1>
      <p>This is the Visual page content.</p>
    </motion.div>
  );
};

export default VisualPage;
