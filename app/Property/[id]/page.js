// app/property/[id]/page.js
'use client'; // This is a Client Component because we use hooks

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // For accessing the dynamic ID
import PropertyDetailsLayout from './layout'; // Import the layout for this route segment
import PropertyDetails from './components/PropertyDetails';
import AnalysisResults from './components/AnalysisResults';
import { getPropertyDetails } from '@/lib/attom'; // Import Attom API function
import { generatePropertyAnalysis } from '@/lib/gemini'; // Import Gemini API function
import styled from 'styled-components'; // For styling if needed

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh; /* Or adjust as needed */
`

const PropertyDetailPage = () => {
  const params = useParams(); // Get the property ID from the URL
  const propertyId = params.id;

  const [propertyData, setPropertyData] = useState(null);
  const [geminiAnalysis, setGeminiAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      setLoading(true);
      setError(null);

      try {
        const details = await getPropertyDetails(propertyId);
        if (details) {
          setPropertyData(details);

          // Generate Gemini analysis after fetching property details
          const analysis = await generatePropertyAnalysis(details);
          setGeminiAnalysis(analysis);
        } else {
            setError("Failed to load property details.")
        }
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Error fetching property details.")
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [propertyId]); // Run effect when propertyId changes

  if (loading) {
      return (
          <PropertyDetailsLayout>
              <LoadingContainer>
                  <p>Loading property details...</p>
              </LoadingContainer>
          </PropertyDetailsLayout>
      )
  }

  if (error) {
    return (
        <PropertyDetailsLayout>
            <p style={{ color: 'red' }}>{error}</p>
        </PropertyDetailsLayout>
    )
  }

  if (!propertyData) {
    return (
        <PropertyDetailsLayout>
            <p>Property not found.</p>
        </PropertyDetailsLayout>
    )
  }

  return (
    <PropertyDetailsLayout>
      <PropertyDetails property={propertyData} />
      {geminiAnalysis && <AnalysisResults analysis={geminiAnalysis} />}
    </PropertyDetailsLayout>
  );
};

export default PropertyDetailPage;