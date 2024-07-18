"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import Link from "next/link";
import dynamic from 'next/dynamic';
import Dropdown from "../components/dropdown";

// Dynamically import the components
const FeaturedContent = dynamic(() => import('../components/featuredContent'));
const ProjectsContent = dynamic(() => import('../components/projectsContent'));

const Home = () => {
  const [activeTab, setActiveTab] = useState("bio");
  const [currentPath, setCurrentPath] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const mediaItems = [
    { label: "Audio", href: "/audio" },
    { label: "Visuals", href: "/visuals" },
    { label: "NFTs", href: "/nfts" },
  ];

  const socialLinks = [
    { href: "https://twitter.com/zacharyr0th", Icon: FaTwitter },
    { href: "https://www.linkedin.com/in/zacharyr0th", Icon: FaLinkedin },
    { href: "https://github.com/zacharyr0th", Icon: FaGithub },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full">
        <nav className="navbar">
          <div className="navbar-links">
            {pathname !== "/" && (
              <Link href="/" className="nav-link">
                <div className="profile-icon">
                  <Image
                    src="/profile-picture.jpg"
                    alt="Zachary Roth"
                    width={32}
                    height={32}
                    className="object-cover"
                    priority
                  />
                </div>
              </Link>
            )}

            <Dropdown
              label="Media"
              items={mediaItems}
              className="dropdown-menu media-link"
            />

            {["writing", "research"].map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className={`nav-link ${pathname === `/${item}` ? "active-link" : ""}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>

          <div className="social-links">
            {socialLinks.map(({ href, Icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Icon size={24} />
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <div className="text-center mb-2">
          <div className="profile-picture">
            <Image
              src="/profile-picture.jpg"
              alt="Zachary Roth"
              width={256}
              height={256}
              className="object-cover"
              priority
            />
          </div>
        
          <h1 className="profile-name">
            Zachary Roth
          </h1>
          <p className="profile-title">
            Technologist, Writer, Musician
          </p>
        </div>

        <div className="transition-opacity duration-300 ease-in-out">
          <div className="tabs-container" role="tablist">
            {["bio", "featured", "projects"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`${tab}-content`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "bio" && (
            <div className="bio-section">
              <p className="bio-text">Lorum Ipsum</p>
              <div className="contact-button-container">
                <button onClick={openModal} className="contact-button">
                  Contact Me
                </button>
              </div>
            </div>
          )}

          {activeTab === "featured" && <FeaturedContent />}
          {activeTab === "projects" && <ProjectsContent />}
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-backdrop" onClick={closeModal}></div>
            <div className="modal-content">
              <h2 className="modal-title">Get in Touch</h2>
              <p className="modal-text">
                Feel free to reach out on LinkedIn or Twitter
              </p>

              <div className="modal-social-links">
                <Link
                  href="https://www.linkedin.com/in/zacharyr0th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button linkedin"
                >
                  <FaLinkedin className="social-icon" />
                  LinkedIn
                </Link>
                <Link
                  href="https://twitter.com/zacharyr0th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button twitter"
                >
                  <FaTwitter className="social-icon" />
                  Twitter
                </Link>
              </div>

              <button onClick={closeModal} className="close-button">
                Close
              </button>

            </div>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <p className="copyright">&copy; 2024</p>
      </footer>

    </div>
  );
};

export default Home;
