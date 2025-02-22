// app/property/page.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { searchProperties } from '@/lib/attom'; // Import your Attom API function
import PropertyCard from './components/PropertyCard'; // Import the PropertyCard component

const PropertyListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); // Responsive grid
  gap: 1rem;
`;

const SearchForm = styled.form`
  display: flex;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors
      try {
        const results = await searchProperties(searchTerm); // Pass the search term
        if (results && results.property) {
          setProperties(results.property);
        } else {
          setProperties([]); // Clear properties if no results are found
        }
      } catch (err) {
        setError(err.message || "Error fetching properties."); // Set the error message
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) { // Only fetch if there is a search term
        fetchProperties();
    } else {
        setProperties([]); // Clear properties if no search term
    }

  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleSubmit = (e) => {
      e.preventDefault();
  }

  return (
    <div>
      <h1>Property Search</h1>

      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Enter address, city, or zip code"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <SearchButton type="submit">Search</SearchButton>
      </SearchForm>

      {loading && <p>Loading properties...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display the error message */}

      <PropertyListContainer>
        {properties.map((property) => (
          <PropertyCard key={property.attomId} property={property} />
        ))}
      </PropertyListContainer>

        {properties.length === 0 && !loading && !error && <p>No properties found.</p>}

    </div>
  );
};

export default PropertyListPage;