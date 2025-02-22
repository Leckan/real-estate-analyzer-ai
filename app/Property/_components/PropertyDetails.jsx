// app/property/components/PropertyDetails.jsx
import React from 'react';
import styled from 'styled-components';
import { formatAddress, formatPropertySize, formatCurrency, formatBedrooms, formatBathrooms } from '@/lib/utils'; // Import utility functions

const PropertyDetailsContainer = styled.div`
  /* Add styling as needed */
`;

const Address = styled.h2`
  /* Add styling as needed */
`;

const DetailItem = styled.div`
  margin-bottom: 0.5rem;
`;

const PropertyDetails = ({ property }) => {
  if (!property) {
    return <p>Loading property details...</p>; // Or a better loading indicator
  }

  const { address, details } = property; // Destructure address and details

  if (!details) {
    return <p>Property details not available.</p>
  }

  const {
      yearBuilt,
      lotSize,
      buildingSize,
      bedrooms,
      bathrooms,
      stories,
      parking,
      // ... other relevant details
      assessment,
  } = details;

  return (
    <PropertyDetailsContainer>
      <Address>{formatAddress(address)}</Address>

      {/* Display other property details */}
      <DetailItem><strong>Year Built:</strong> {yearBuilt}</DetailItem>
      <DetailItem><strong>Lot Size:</strong> {formatPropertySize(lotSize)}</DetailItem>
      <DetailItem><strong>Building Size:</strong> {formatPropertySize(buildingSize)}</DetailItem>
      <DetailItem><strong>Bedrooms:</strong> {formatBedrooms(bedrooms)}</DetailItem>
      <DetailItem><strong>Bathrooms:</strong> {formatBathrooms(bathrooms)}</DetailItem>
      <DetailItem><strong>Stories:</strong> {stories}</DetailItem>
      <DetailItem><strong>Parking:</strong> {parking || "Not Available"}</DetailItem>
      {/* ... other details */}
      {assessment && (
          <div>
              <h3>Assessment</h3>
              <DetailItem><strong>Total Value:</strong> {formatCurrency(assessment.totalValue)}</DetailItem>
              {/* ... other assessment details */}
          </div>
      )}
    </PropertyDetailsContainer>
  );
};

export default PropertyDetails;