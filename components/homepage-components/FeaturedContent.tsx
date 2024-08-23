import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaCode, FaMusic, FaPen, FaMicrochip, FaGraduationCap, FaRobot, FaServer, FaLock, FaDatabase, FaDesktop } from 'react-icons/fa';

const featuredItems = [
  {
    icon: <FaCode />,
    title: 'Full-Stack Development',
    description: 'React, Node.js, GraphQL, RESTful APIs',
    color: 'from-[#E3F2FD] to-[#BBDEFB]',
  },
  {
    icon: <FaMusic />,
    title: 'Music Technology',
    description: 'AI-assisted composition and production',
    color: 'from-[#BBDEFB] to-[#90CAF9]',
  },
  {
    icon: <FaPen />,
    title: 'Technical Writing',
    description: 'Documenting emerging technologies',
    color: 'from-[#90CAF9] to-[#64B5F6]',
  },
  {
    icon: <FaMicrochip />,
    title: 'Low-Level Programming',
    description: 'OS development, embedded systems',
    color: 'from-[#64B5F6] to-[#42A5F5]',
  },
  {
    icon: <FaGraduationCap />,
    title: 'Continuous Learning',
    description: 'AI, quantum computing, cybersecurity',
    color: 'from-[#E3F2FD] to-[#BBDEFB]',
  },
  {
    icon: <FaRobot />,
    title: 'AI & Machine Learning',
    description: 'Neural networks, NLP, computer vision',
    color: 'from-[#BBDEFB] to-[#90CAF9]',
  },
  {
    icon: <FaServer />,
    title: 'DevOps & Cloud',
    description: 'CI/CD, containerization, cloud platforms',
    color: 'from-[#90CAF9] to-[#64B5F6]',
  },
  {
    icon: <FaLock />,
    title: 'Cybersecurity',
    description: 'Penetration testing, encryption, secure coding',
    color: 'from-[#64B5F6] to-[#42A5F5]',
  },
  {
    icon: <FaDatabase />,
    title: 'Database Management',
    description: 'SQL, NoSQL, data modeling, optimization',
    color: 'from-[#BBDEFB] to-[#90CAF9]',
  },
  {
    icon: <FaDesktop />,
    title: 'UI/UX Design',
    description: 'Responsive, accessible, user-centered interfaces',
    color: 'from-[#90CAF9] to-[#64B5F6]',
  },
];

interface FeaturedItemProps {
  item: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
  };
  index: number;
  totalItems: number;
}

const FeaturedItem: React.FC<FeaturedItemProps> = ({ item, index, totalItems }) => {
  const controls = useAnimation();

  useEffect(() => {
    const animationDuration = 4; 
    const totalDuration = totalItems * animationDuration;
    const delay = index * animationDuration;

    controls.start({
      opacity: [0, 1, 1, 0],
      scale: [0.8, 1, 1, 0.8],
      transition: {
        times: [0, 0.1, 0.9, 1],
        duration: animationDuration,
        repeat: Infinity,
        repeatDelay: totalDuration - animationDuration,
        delay: delay % totalDuration,
      },
    });
  }, [controls, index, totalItems]);

  return (
    <motion.div
      animate={controls}
      className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-48 flex flex-col"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`} />
      <div className="relative z-10 p-4 flex flex-col h-full">
        <div className="text-2xl text-[#0A192F] mb-2">{item.icon}</div>
        <h3 className="text-lg font-bold text-[#0A192F] mb-1">{item.title}</h3>
        <p className="text-xs text-[#0A192F]/80 flex-grow overflow-hidden">{item.description}</p>
      </div>
    </motion.div>
  );
};

const FeaturedContent = () => {
  return (
    <div className="px-4 py-6 bg-inherit">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {featuredItems.map((item, index) => (
            <FeaturedItem 
              key={index} 
              item={item} 
              index={index} 
              totalItems={featuredItems.length} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;