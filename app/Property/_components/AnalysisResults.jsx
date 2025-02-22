// app/property/components/AnalysisResults.jsx
import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown'; // For rendering Markdown

const AnalysisResultsContainer = styled.div`
  /* Add your styling here */
`;

const AnalysisResults = ({ analysis }) => {
  if (!analysis) {
    return <p>Analysis is not available yet.</p>; // Or a better message/indicator
  }

  return (
    <AnalysisResultsContainer>
      <ReactMarkdown>{analysis}</ReactMarkdown>
    </AnalysisResultsContainer>
  );
};

export default AnalysisResults;