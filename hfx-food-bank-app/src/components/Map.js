// src/components/Map.js
import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const InfoWindowContent = styled.div`
  padding: 12px;
  max-width: 250px;
`;

const FoodBankTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 16px;
  color: #2c5282;
`;

const FoodBankAddress = styled.p`
  margin-bottom: 12px;
  font-size: 14px;
  color: #4a5568;
`;

const ViewDetailsButton = styled.button`
  background-color: #2c5282;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1e3a8a;
  }
`;

function Map({ foodBanks, userLocation }) {
  const [selectedFoodBank, setSelectedFoodBank] = React.useState(null);
  const navigate = useNavigate();
  
  console.log("Map component received foodBanks:", foodBanks);
  console.log("Map component received userLocation:", userLocation);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB1C0JJidGEB1R-Qko6jB7FkCn-VA9ifSw", // Your actual API key
    libraries,
  });

  if (loadError) {
    console.error("Error loading maps:", loadError);
    return <div>Error loading maps: {loadError.message}</div>;
  }
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={userLocation}
    >
      {/* User location marker */}
      <Marker
        position={userLocation}
        icon={{
          url: `${process.env.PUBLIC_URL}/user-location.svg`,
          scaledSize: new window.google.maps.Size(30, 30),
        }}
      />

      {/* Food bank markers */}
      {foodBanks && Array.isArray(foodBanks) && foodBanks.length > 0 ? (
        foodBanks.map(foodBank => (
          foodBank && foodBank.location && foodBank.location.lat && foodBank.location.lng ? (
            <Marker
              key={foodBank.id}
              position={{
                lat: foodBank.location.lat,
                lng: foodBank.location.lng
              }}
              onClick={() => {
                console.log("Clicked food bank:", foodBank);
                setSelectedFoodBank(foodBank);
              }}
            />
          ) : (
            console.log("Invalid food bank location data:", foodBank) || null
          )
        ))
      ) : (
        console.log("No food banks to display or invalid data:", foodBanks) || null
      )}

      {selectedFoodBank && (
        <InfoWindow
          position={{
            lat: selectedFoodBank.location.lat,
            lng: selectedFoodBank.location.lng
          }}
          onCloseClick={() => {
            setSelectedFoodBank(null);
          }}
        >
          <InfoWindowContent>
            <FoodBankTitle>{selectedFoodBank.name}</FoodBankTitle>
            <FoodBankAddress>{selectedFoodBank.address}</FoodBankAddress>
            <ViewDetailsButton onClick={() => navigate(`/foodbank/${selectedFoodBank.id}`)}>
              View Details
            </ViewDetailsButton>
          </InfoWindowContent>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default Map;