"use client";
import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// This is a client component
import React from "react";
import styled from "styled-components";
import GlobalStyle from "./styles"; // Import global styles
import AuthContext from "../context/AuthContext"; // Example: Import an Auth context
import ErrorBoundary from "./ErrorBoundary";
import { Outfit } from 'next/font/google'
import Head from "./head";
import ErrorPage from "./error";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Styled Components for layout elements
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Ensure full viewport height
`;

const Header = styled.header`
  background-color: #f0f0f0; // Example header background
  padding: 1rem;
  display: flex; // Use flexbox for layout
  justify-content: space-between; // Align items to start and end
  align-items: center; // Vertically center items
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const Navigation = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  li {
    margin-right: 1rem;
  }

  a {
    text-decoration: none;
    color: #333;
  }
`;

const MainContent = styled.main`
  flex: 1; // Allow main content to expand
  padding: 2rem;
`;

const Footer = styled.footer`
  background-color: #333; // Example footer background
  color: white;
  padding: 1rem;
  text-align: center;
`;


export function AnotherRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}


const outfit = Outfit({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false); // Example auth state (replace with actual logic)

  return (
    <ClerkProvider>
       <html lang="en">
        <body
          className={outfit.className}
        >
      {" "}
      {/* Wrap with ClerkProvider for authentication */}
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        {" "}
        {/* Provide Auth context */}
        <AppContainer>
          <GlobalStyle /> {/* Include global styles */}
          <Header>
            <Logo>Real Estate Analyzer</Logo>
            <Navigation>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/property">Properties</a>
                </li>
                {/* ... other navigation links */}
              </ul>
            </Navigation>
          </Header>
          <MainContent>
            <ErrorBoundary
              fallbackRender={({ error, reset }) => (
                <ErrorPage error={error} reset={reset} />
              )}
            >
              {children}
            </ErrorBoundary>
            {/* This is where your page content will be rendered */}
          </MainContent>
          <Footer>
            &copy; {new Date().getFullYear()} Real Estate Analyzer
          </Footer>
        </AppContainer>
      </AuthContext.Provider>
      
        </body>
      </html>
    </ClerkProvider>
  );
}
