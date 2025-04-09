// src/components/DBSeeder.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { seedFoodBanks, clearAllFoodBanks, cleanupDuplicates } from '../utils/seedDatabase';

const SeedContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
  max-width: 300px;
`;

const Title = styled.h4`
  margin-top: 0;
  margin-bottom: 10px;
  color: #2d3748;
`;

const SeedButton = styled.button`
  background-color: ${props => props.color || '#4caf50'};
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8px;
  width: 100%;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const StatusText = styled.p`
  margin: 8px 0;
  font-size: 14px;
  color: ${props => props.error ? '#e53e3e' : '#4a5568'};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

function DBSeeder() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [foodBankCount, setFoodBankCount] = useState(0);
  
  useEffect(() => {
    // Check for food banks in the database
    checkFoodBanks();
  }, []);
  
  const checkFoodBanks = async () => {
    try {
      const foodBanksRef = collection(db, 'foodBanks');
      const snapshot = await getDocs(foodBanksRef);
      setFoodBankCount(snapshot.docs.length);
    } catch (err) {
      console.error("Error checking food banks:", err);
      setError("Failed to check database status");
    }
  };
  
  const handleSeed = async () => {
    setIsProcessing(true);
    setError(null);
    setStatus("Seeding database...");
    
    try {
      const result = await seedFoodBanks();
      setStatus(result.message);
      
      // Refresh food bank count
      await checkFoodBanks();
      
      // Force page reload to show the new data
      window.location.reload();
    } catch (err) {
      console.error("Error seeding database:", err);
      setError("Failed to seed database: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleClearData = async () => {
    if (window.confirm("Are you sure you want to clear all food bank data? This action cannot be undone.")) {
      setIsProcessing(true);
      setError(null);
      setStatus("Clearing all food banks...");
      
      try {
        const result = await clearAllFoodBanks();
        setStatus(result.message);
        
        // Refresh food bank count
        await checkFoodBanks();
        
        // Force page reload to show the changes
        window.location.reload();
      } catch (err) {
        console.error("Error clearing database:", err);
        setError("Failed to clear database: " + err.message);
      } finally {
        setIsProcessing(false);
      }
    }
  };
  
  const handleCleanupDuplicates = async () => {
    setIsProcessing(true);
    setError(null);
    setStatus("Removing duplicate food banks...");
    
    try {
      const deleteCount = await cleanupDuplicates();
      setStatus(`Removed ${deleteCount} duplicate food banks.`);
      
      // Refresh food bank count
      await checkFoodBanks();
      
      // Force page reload to show the changes
      window.location.reload();
    } catch (err) {
      console.error("Error cleaning up duplicates:", err);
      setError("Failed to clean up duplicates: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <SeedContainer>
      <Title>Development Tools</Title>
      <StatusText>Current food banks in database: {foodBankCount}</StatusText>
      
      {status && <StatusText>{status}</StatusText>}
      {error && <StatusText error>{error}</StatusText>}
      
      <ButtonGroup>
        <SeedButton 
          onClick={handleSeed} 
          disabled={isProcessing}
          color="#4caf50"
        >
          {isProcessing ? 'Processing...' : 'Seed Database'}
        </SeedButton>
        
        {foodBankCount > 0 && (
          <>
            <SeedButton 
              onClick={handleCleanupDuplicates}
              disabled={isProcessing}
              color="#3182ce"
            >
              Remove Duplicates
            </SeedButton>
            
            <SeedButton 
              onClick={handleClearData}
              disabled={isProcessing}
              color="#e53e3e"
            >
              Clear All Data
            </SeedButton>
          </>
        )}
      </ButtonGroup>
    </SeedContainer>
  );
}

export default DBSeeder;