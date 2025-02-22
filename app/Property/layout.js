// app/property/layout.js
import React from 'react';
import styled from 'styled-components';

const PropertyLayoutContainer = styled.div`
  display: flex;
  flex-direction: column; // Or row, depending on your layout
  min-height: calc(100vh - 80px); /* Adjust 80px for header/footer if needed */
`;

const Sidebar = styled.aside`
  width: 250px; // Or your desired width
  background-color: #f0f0f0; // Example sidebar background
  padding: 1rem;
`;

const MainContent = styled.main`
  flex: 1; // Allow main content to expand
  padding: 2rem;
`;

const PropertyLayout = ({ children }) => {
  return (
    <PropertyLayoutContainer>
      {/* Example Sidebar */}
      <Sidebar>
        <h2>Property Filters</h2>
        {/* Your property filter components here */}
        <ul>
            <li>Filter 1</li>
            <li>Filter 2</li>
            {/* ... */}
        </ul>
      </Sidebar>
      <MainContent>
        {children}
      </MainContent>
    </PropertyLayoutContainer>
  );
};

export default PropertyLayout;