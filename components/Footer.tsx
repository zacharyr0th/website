// Server Component: Footer

import React from "react";

export default function Footer() {
    return (
      <footer className="site-footer">
        <p className="copyright">&copy; {new Date().getFullYear()}</p>
      </footer>
    );
  }