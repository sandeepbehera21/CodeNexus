import { Metadata } from "next";
import "./globals.css";
import NavbarClient from '../components/common/navigation/NavbarClient';
import { ThemeProvider } from "../context/themecontext"; 
import { UserProvider } from "@auth0/nextjs-auth0/client";
// Ensure the correct path to ChatButton is used

export const metadata = {
  title: "CodeNexus",
  description: "AI Skill Development Platform Tailored for You",
  openGraph: {
    title: "SkillGraph",
    description: "AI Skill Development Platform Tailored for You",
    images: [
      {
        url: "https://raw.githubusercontent.com/moiz2405/codenexus-thumbnails/refs/heads/main/CodeNexus.jpg", // Relative path
        width: 800,
        height: 600,
        alt: "CodeNexus AI Skill Development",
      },
    ],
  },
  metadataBase: new URL("https://code-nexus-delta.vercel.app/"), // Replace with your deployed URL
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
          <ThemeProvider>
            <UserProvider>
            <NavbarClient />
            {children}
            </UserProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
