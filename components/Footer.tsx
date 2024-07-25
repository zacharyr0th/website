// Server Component: Footer

import React from "react";

export function Footer() {
    return (
      <footer className="site-footer">
        <p className="copyright">&copy; {new Date().getFullYear()}</p>
      </footer>
    );
}

export default Footer;
