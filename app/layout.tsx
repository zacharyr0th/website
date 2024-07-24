import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ErrorBoundaryClient from "../components/ErrorBoundaryClient";

import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'), // Update this to your production URL when deploying
  title: "Zachary Roth - Technologist, Writer, Musician",
  description: "Personal website of Zachary Roth - Explore my work in technology, writing, and music.",
  keywords: ["Zachary Roth", "technologist", "writer", "musician", "portfolio"],
  openGraph: {
    title: "Zachary Roth - Technologist, Writer, Musician",
    description: "Personal website of Zachary Roth - Explore my work in technology, writing, and music.",
    type: "website",
    url: "https://www.zacharyroth.com",
    images: [
      {
        url: "/profile-picture.jpg",
        width: 256,
        height: 256,
        alt: "Zachary Roth",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <ErrorBoundaryClient>
            <main className="flex-grow">{children}</main>
          </ErrorBoundaryClient>
          <Footer />
        </div>
      </body>
    </html>
  );
}