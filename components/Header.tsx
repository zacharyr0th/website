"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

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
    { label: "NFTs", href: "/nfts" },
  ];

  const socialLinks = [
    { href: "https://www.twitter.com/zacharyr0th", Icon: FaTwitter },
    { href: "https://www.linkedin.com/in/zacharyr0th", Icon: FaLinkedin },
    { href: "https://www.github.com/zacharyr0th", Icon: FaGithub },
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
    <header className="w-full bg-[#121212] text-white">
      <nav className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-6">
          {pathname !== "/" && (
            <Link href="/" className="flex items-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-8 rounded-full overflow-hidden">
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

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsMediaOpen(!isMediaOpen)}
              className="text-white hover:text-gray-300 focus:outline-none transition-colors duration-150"
              aria-haspopup="true"
              aria-expanded={isMediaOpen}
            >
              Media
            </button>
            {isMediaOpen && (
              <div className="absolute z-10 w-40 mt-2 bg-gray-200 rounded-md shadow-lg overflow-hidden">
                {mediaItems.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block w-full px-4 py-2 text-left text-black hover:bg-gray-400 transition-colors duration-150"
                    onClick={() => setIsMediaOpen(false)}
                  >
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
              className={`text-white hover:text-gray-300 transition-all duration-300 focus:outline-none transform hover:scale-105 ${
                pathname === `/${item}` ? "font-bold" : ""
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>

        <div className="flex space-x-4">
          {socialLinks.map(({ href, Icon }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-all duration-300 focus:outline-none transform hover:scale-105"
            >
              <Icon size={24} />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;