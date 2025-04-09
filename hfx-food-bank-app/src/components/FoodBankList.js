// src/components/FoodBankList.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ListContainer = styled.div`
  margin-top: 20px;
`;

const FoodBankCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.08);
  }
`;

const FoodBankName = styled.h2`
  margin-top: 0;
  color: #2c5282;
  font-size: 20px;
  font-weight: 600;
`;

const FoodBankAddress = styled.p`
  color: #4a5568;
  margin-bottom: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 6px;
    min-width: 16px;
  }
`;

const FoodBankDistance = styled.p`
  color: #718096;
  margin-bottom: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 6px;
    min-width: 16px;
  }
`;

const FoodBankPhone = styled.p`
  color: #4a5568;
  margin-bottom: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 6px;
    min-width: 16px;
  }
`;

const FoodBankServices = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const ServiceTag = styled.span`
  background-color: ${props => props.active ? '#ebf8ff' : '#f7fafc'};
  color: ${props => props.active ? '#2c5282' : '#a0aec0'};
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 4px;
  }
`;

const ViewDetailsButton = styled(Link)`
  display: inline-block;
  background-color: #2c5282;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  margin-top: 16px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background-color: #1e3a8a;
    transform: translateY(-1px);
  }
`;

// Add this NoResults component that was missing
const NoResults = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #4a5568;
  
  h3 {
    font-size: 20px;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 16px;
  }
`;

// Icons
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
  </svg>
);

const DistanceIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="currentColor" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor" />
  </svg>
);

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

function FoodBankList({ foodBanks, userLocation }) {
  // Sort food banks by distance if user location is available
  const sortedFoodBanks = [...foodBanks];
  
  if (userLocation) {
    sortedFoodBanks.sort((a, b) => {
      const distA = calculateDistance(
        userLocation.lat, 
        userLocation.lng, 
        a.location.lat, 
        a.location.lng
      );
      const distB = calculateDistance(
        userLocation.lat, 
        userLocation.lng, 
        b.location.lat, 
        b.location.lng
      );
      return distA - distB;
    });
  }

  if (sortedFoodBanks.length === 0) {
    return (
      <NoResults>
        <h3>No food banks match your search</h3>
        <p>Try adjusting your filters or search term</p>
      </NoResults>
    );
  }

  return (
    <ListContainer>
      {sortedFoodBanks.map(foodBank => (
        <FoodBankCard key={foodBank.id}>
          <FoodBankName>{foodBank.name}</FoodBankName>
          
          <FoodBankAddress>
            <LocationIcon /> {foodBank.address}
          </FoodBankAddress>
          
          {userLocation && (
            <FoodBankDistance>
              <DistanceIcon />
              {calculateDistance(
                userLocation.lat,
                userLocation.lng,
                foodBank.location.lat,
                foodBank.location.lng
              ).toFixed(1)} km away
            </FoodBankDistance>
          )}
          
          {foodBank.phone && (
            <FoodBankPhone>
              <PhoneIcon /> {foodBank.phone}
            </FoodBankPhone>
          )}
          
          <FoodBankServices>
            <ServiceTag active={foodBank.wheelchairAccess}>
              Wheelchair Access
            </ServiceTag>
            <ServiceTag active={foodBank.translators}>
              Translators
            </ServiceTag>
            <ServiceTag active={foodBank.dietaryOptions}>
              Dietary Options
            </ServiceTag>
          </FoodBankServices>
          
          <ViewDetailsButton to={`/foodbank/${foodBank.id}`}>
            View Details
          </ViewDetailsButton>
        </FoodBankCard>
      ))}
    </ListContainer>
  );
}

export default FoodBankList;