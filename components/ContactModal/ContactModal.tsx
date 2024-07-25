'use client';

import React, { useState } from 'react';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import styles from '../../styles/components/ContactModal.module.css';

const ContactModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className={styles.contactButtonContainer}>
        <button
          onClick={openModal}
          className={`${styles.contactButton} tab-button active`}
        >
          Contact Me
        </button>
      </div>

      {isModalOpen && (
        <div className={`${styles.modalOverlay} animate-fadeIn`}>
          <div className={styles.modalBackdrop} onClick={closeModal}></div>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Get in Touch</h2>
            <p className={styles.modalText}>
              Feel free to reach out on LinkedIn or X
            </p>
            <div className={styles.modalSocialLinks}>
              <a
                href="https://www.linkedin.com/in/zacharyr0th"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialButton} ${styles.linkedin}`}
              >
                <FaLinkedin className={styles.socialIcon} /> 
              </a>
              <a
                href="https://x.com/zacharyr0th"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialButton} ${styles.twitter}`}
              >
                <FaXTwitter className={styles.socialIcon} />
              </a>
            </div>
            <button onClick={closeModal} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactModal;
