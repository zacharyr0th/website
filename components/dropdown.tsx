"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DropdownProps {
  label: string;
  items: { label: string; href: string }[];
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, items, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-base font-normal focus:outline-none transition-colors duration-200 ${className}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label}
      </button>
      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10 py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`block px-4 py-2 text-sm hover:bg-gray-300 transition-colors duration-200 ${
                pathname === item.href ? "bg-gray-100 font-normal" : ""
              }`}
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
