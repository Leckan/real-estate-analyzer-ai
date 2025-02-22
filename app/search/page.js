// app/search/page.js
'use client'; // Client component because we use hooks

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // For search params and navigation
import PropertyList from '@/app/property/components/PropertyList'; // Assuming you have this component
import { searchProperties } from '@/lib/attom'; // Import Attom API function
import styled from 'styled-components';

const SearchPageContainer = styled.div`
  /* Add styling as needed */
`;

const SearchResultsContainer = styled.div`
    /* Add styling as needed */
`

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(''); // Store the current search term
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performSearch = async () => {
        setLoading(true);
        setError(null);

      try {
        const results = await searchProperties(searchTerm);
        if (results) {
            setProperties(results)
        } else {
            setError("No properties found for that search term.")
        }
      } catch (err) {
        console.error("Error searching properties:", err);
        setError("Error searching properties.")
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) { // Only perform search if searchTerm is not empty
      performSearch();
    } else {
        setProperties([]) // Clear results if search term is empty
    }
  }, [searchTerm]); // Run effect when searchTerm changes

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    // You can update the URL with the search term if you want to support shareable links
    // router.push(`/search?term=${searchTerm}`);
  };

  return (
    <SearchPageContainer>
      <h1>Property Search</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter address, city, or zip code"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Searching properties...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <SearchResultsContainer>
          {properties.length > 0 && <PropertyList properties={properties} />}
          {properties.length === 0 && !loading && !error && <p>No properties found. Please try another search.</p>}
      </SearchResultsContainer>
    </SearchPageContainer>
  );
};

export default SearchPage;