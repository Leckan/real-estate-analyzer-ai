// app/property/[id]/not-found.js
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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

const GoBackLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const PropertyNotFoundPage = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <NotFoundMessage>Property not found.</NotFoundMessage>
      <GoBackLink href="/property">Go back to property search</GoBackLink> {/* Link to property search */}
    </NotFoundContainer>
  );
};

export default PropertyNotFoundPage;