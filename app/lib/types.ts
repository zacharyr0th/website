export interface WritingProject { // Structure for writing projects
  id: string;        // Unique identifier for the writing
  title: string;     // Writing title
  description: string; // Writing description
  link: string;      // URL to the writing
}

export interface NavItem { // Navigation item structure
  label: string;  // Display text for the navigation item
  href: string;   // URL or path for the navigation item
}