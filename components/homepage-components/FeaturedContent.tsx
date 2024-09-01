import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaMusic, FaPen } from 'react-icons/fa';

interface FeaturedItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

const featuredItems: FeaturedItem[] = [
  {
    title: 'Full-Stack Development',
    description: 'React, Node.js, GraphQL, RESTful APIs',
    icon: FaCode,
  },
  {
    title: 'Music Technology',
    description: 'AI-assisted composition and production',
    icon: FaMusic,
  },
  { title: 'Technical Writing', description: 'Documenting emerging technologies', icon: FaPen },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const FeaturedContent: React.FC = () => {
  const renderedItems = useMemo(
    () =>
      featuredItems.map((item, index) => (
        <motion.div
          key={item.title}
          variants={itemVariants}
          className="group relative overflow-hidden rounded-lg bg-gray-800/30 p-6 transition-all duration-300 hover:bg-gray-700/40 hover:shadow-lg hover:shadow-pastel-blue/20 flex flex-col h-full w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="flex items-center mb-4">
            <item.icon className="text-2xl mr-3 text-blue-400" />
            <h3 className="text-lg font-semibold">{item.title}</h3>
          </div>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {item.description}
          </p>
        </motion.div>
      )),
    []
  );

  return (
    <div className="px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {renderedItems}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedContent;
