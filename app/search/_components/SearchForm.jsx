// app/search/components/SearchForm.jsx
'use client'; // Client component because we use hooks

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const SearchFormContainer = styled.form`
  display: flex; /* Or whatever layout you prefer */
  /* Add other styles here */
`;

const SearchInput = styled.input`
  /* Style your input */
  flex-grow: 1; /* Allow input to expand */
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const SearchButton = styled.button`
  /* Style your button */
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;


const SearchForm = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (searchTerm.trim() !== '') {  // Only navigate if search term is not empty or just whitespace.
        router.push(`/search?term=${encodeURIComponent(searchTerm.trim())}`); // Push the search term to the URL
    }
  };

  return (
    <SearchFormContainer onSubmit={handleSearchSubmit}>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Enter address, city, or zip code"
      />
      <SearchButton type="submit">Search</SearchButton>
    </SearchFormContainer>
  );
};

export default SearchForm;