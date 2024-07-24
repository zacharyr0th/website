import React from 'react';
import styles from './ContactModal.module.css';

interface ModalContentProps {
  children: React.ReactNode;
  close: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  return (
    <div className={styles.modalContent}>
      {children}
    </div>
  );
};

export default ModalContent;
