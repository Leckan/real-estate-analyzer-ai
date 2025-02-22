// app/error.js
"use client" // This is a client component
import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; // Full viewport height
  text-align: center;
`;

const ErrorMessage = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorDetails = styled.p`
  font-size: 1rem;
  color: #777; // Slightly lighter text color
  margin-bottom: 2rem;
`;

 const ErrorPage = ({ error, reset }) => {  // Receive error and reset function
  return (
    <ErrorContainer>
      <ErrorMessage>Oops! An error occurred.</ErrorMessage>
      {error && ( // Conditionally render error details
        <ErrorDetails>
          {/* Display more specific error info if available, but be careful not to expose sensitive data in production */}
          {process.env.NODE_ENV === 'development' && <pre>{error.stack}</pre>} {/* Only show stack trace in development */}
          {/* Example: {error.message} */}
        </ErrorDetails>
      )}
      <button onClick={reset}>Try Again</button> {/* Button to try again */}
    </ErrorContainer>
  );
};

export default ErrorPage;