import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  height: ${props => props.fullHeight ? '70vh' : 'auto'};
`;

const Spinner = styled.div`
  border: 4px solid rgba(44, 82, 130, 0.1);
  border-radius: 50%;
  border-top: 4px solid #2c5282;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: #4a5568;
  font-size: 16px;
  text-align: center;
`;

function LoadingIndicator({ message = "Loading...", fullHeight = false }) {
  return (
    <LoadingContainer fullHeight={fullHeight}>
      <Spinner />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
}

export default LoadingIndicator;