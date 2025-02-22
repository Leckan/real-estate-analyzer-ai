// app/not-found.js
"use client" // This is a client component
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'; // For navigation

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; // Occupy full viewport height
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const NotFoundMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const GoHomeLink = styled(Link)`
  color: #007bff; // Example link color
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <NotFoundMessage>Oops! The page you're looking for could not be found.</NotFoundMessage>
      <GoHomeLink href="/">Go back home</GoHomeLink>
    </NotFoundContainer>
  );
};

export default NotFoundPage;