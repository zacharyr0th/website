"use client";

import { useState, useRef, useEffect, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";
import "../styles/layout/Header.css"; 

interface DropdownItem {
  label: string;
  href: string;
}

const Header = () => {
  const pathname = usePathname();
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mediaItems: DropdownItem[] = [
    { label: "Audio", href: "/audio" },
    { label: "Visuals", href: "/visuals" },
    { label: "Minting", href: "/minting" },
  ];

  const socialLinks = [
    { href: "https://x.com/zacharyr0th", Icon: FaXTwitter, label: "X Profile" },
    { href: "https://www.linkedin.com/in/zacharyr0th", Icon: FaLinkedin, label: "LinkedIn Profile" },
    { href: "https://www.github.com/zacharyr0th", Icon: FaGithub, label: "GitHub Profile" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMediaOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-links">
          {pathname !== "/" && (
            <Link href="/" aria-label="Home">
              <div className="home-link">
                <Image
                  src="/profile-picture.jpg"
                  alt="Zachary Roth"
                  width={32}
                  height={32}
                  className="profile-picture"
                  priority
                />
              </div>
            </Link>
          )}

          <div className="dropdown" ref={dropdownRef}>
            <button
              onClick={() => setIsMediaOpen(!isMediaOpen)}
              aria-haspopup="true"
              aria-expanded={isMediaOpen}
              aria-controls="media-menu"
              className="dropdown-button"
            >
              Media
            </button>
            {isMediaOpen && (
              <div id="media-menu" className="dropdown-menu" role="menu" aria-labelledby="media-button">
                {mediaItems.map(({ label, href }) => (
                  <Link key={href} href={href} role="menuitem" onClick={() => setIsMediaOpen(false)}>
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {["writing", "research"].map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className={pathname === `/${item}` ? "active" : ""}
              aria-current={pathname === `/${item}` ? "page" : undefined}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>

        <div className="social-links">
          {socialLinks.map(({ href, Icon, label }) => (
            <Link key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon size={24} />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default memo(Header);