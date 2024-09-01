'use client';

import React, { useState, useCallback } from 'react';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import styled from 'styled-components';

// Add styled components
const ContactButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: white;
  transition: colors 0.3s;
`;

const ContactButton = styled(Button)`
  background-color: var(--color-accent);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    color: #4a90e2;
    background-color: #e1f5fe;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  position: relative;
  padding: 1.5rem;
  width: 100%;
  max-width: 24rem;
  background-color: #121212;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const ModalTitle = styled.h2`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ModalText = styled.p`
  color: white;
  margin-bottom: 1rem;
`;

const ModalSocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SocialButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TwitterButton = styled(SocialButton)`
  background-color: #000000;
  &:hover {
    background-color: #1a1a1a;
  }
`;

const LinkedInButton = styled(SocialButton)`
  background-color: #0e76a8;
  &:hover {
    background-color: #0a5a84;
  }
`;

const CloseButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
  background-color: #4b5563;
  &:hover {
    background-color: #374151;
  }
`;

const ContactModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <ContactButtonContainer>
        <ContactButton onClick={openModal}>Contact Me</ContactButton>
      </ContactButtonContainer>

      {isModalOpen && (
        <ModalOverlay className="animate-fadeIn">
          <ModalContent>
            <ModalTitle>Get in Touch</ModalTitle>
            <ModalText>Feel free to reach out on X or LinkedIn</ModalText>
            <ModalSocialLinks>
              <TwitterButton
                as="a"
                href="https://x.com/zacharyr0th"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter aria-hidden="true" /> Twitter
              </TwitterButton>
              <LinkedInButton
                as="a"
                href="https://www.linkedin.com/in/zacharyr0th"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin aria-hidden="true" /> LinkedIn
              </LinkedInButton>
            </ModalSocialLinks>
            <CloseButton onClick={closeModal}>Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default ContactModal;
