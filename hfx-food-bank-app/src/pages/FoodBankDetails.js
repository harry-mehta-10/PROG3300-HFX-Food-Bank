import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const DetailContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #2a5885;
  text-decoration: none;
  margin-bottom: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const FoodBankName = styled.h1`
  color: #2a5885;
  margin-bottom: 10px;
`;

const MapSection = styled.div`
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const DetailColumn = styled.div`
  flex: 1;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-right: 30px;
  }
`;

const ServiceColumn = styled.div`
  flex: 1;
`;

const Hours = styled.div`
  margin: 20px 0;
`;

const DayRow = styled.div`
  display: flex;
  margin-bottom: 5px;

  strong {
    width: 100px;
  }
`;

const ServicesList = styled.div`
  margin-top: 10px;
`;

const ServiceItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  svg {
    margin-right: 10px;
    color: ${props => (props.available ? '#4caf50' : '#f44336')};
  }
`;

const PrintButton = styled.button`
  background-color: #2a5885;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 20px;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: #1e3f66;
  }
`;

// Icons for services
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
  </svg>
);

const CrossIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor" />
  </svg>
);

const PrintIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" fill="currentColor" />
  </svg>
);

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
  </svg>
);

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function FoodBankDetails() {
  const { id } = useParams();
  const [foodBank, setFoodBank] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB1C0JJidGEB1R-Qko6jB7FkCn-VA9ifSw",
    libraries,
  });
  
  useEffect(() => {
    const fetchFoodBank = async () => {
      try {
        const docRef = doc(db, 'foodBanks', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setFoodBank({
            id: docSnap.id,
            ...docSnap.data()
          });
        } else {
          console.log("No such food bank!");
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching food bank details:", error);
        setLoading(false);
      }
    };
    
    fetchFoodBank();
  }, [id]);
  
  const handlePrint = () => {
    window.print();
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!foodBank) {
    return (
      <DetailContainer>
        <BackButton to="/">
          <BackIcon /> Back to List
        </BackButton>
        <h2>Food Bank not found</h2>
      </DetailContainer>
    );
  }
  
  return (
    <DetailContainer>
      <BackButton to="/">
        <BackIcon /> Back to List
      </BackButton>
      
      <FoodBankName>{foodBank.name}</FoodBankName>
      <p>{foodBank.address}</p>
      
      <MapSection>
        {isLoaded && !loadError ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={foodBank.location}
          >
            <Marker position={foodBank.location} />
          </GoogleMap>
        ) : (
          <div>Loading map...</div>
        )}
      </MapSection>
      
      <InfoSection>
        <DetailColumn>
          <h2>Contact Information</h2>
          {foodBank.phone && <p><strong>Phone:</strong> {foodBank.phone}</p>}
          {foodBank.email && <p><strong>Email:</strong> {foodBank.email}</p>}
          {foodBank.website && (
            <p>
              <strong>Website:</strong>{' '}
              <a href={foodBank.website} target="_blank" rel="noopener noreferrer">
                {foodBank.website}
              </a>
            </p>
          )}
          
          <Hours>
            <h3>Hours of Operation</h3>
            {days.map((day, index) => (
              <DayRow key={day}>
                <strong>{day}:</strong>
                <span>
                  {foodBank.hours && foodBank.hours[index] ? 
                    `${foodBank.hours[index].open} - ${foodBank.hours[index].close}` : 
                    'Closed'}
                </span>
              </DayRow>
            ))}
          </Hours>
        </DetailColumn>
        
        <ServiceColumn>
          <h2>Services and Amenities</h2>
          <ServicesList>
            <ServiceItem available={foodBank.wheelchairAccess}>
              {foodBank.wheelchairAccess ? <CheckIcon /> : <CrossIcon />}
              Wheelchair Accessible
            </ServiceItem>
            
            <ServiceItem available={foodBank.translators}>
              {foodBank.translators ? <CheckIcon /> : <CrossIcon />}
              Translation Services
            </ServiceItem>
            
            <ServiceItem available={foodBank.dietaryOptions}>
              {foodBank.dietaryOptions ? <CheckIcon /> : <CrossIcon />}
              Special Dietary Options
            </ServiceItem>
            
            <ServiceItem available={foodBank.parking}>
              {foodBank.parking ? <CheckIcon /> : <CrossIcon />}
              Parking Available
            </ServiceItem>
            
            <ServiceItem available={foodBank.publicTransport}>
              {foodBank.publicTransport ? <CheckIcon /> : <CrossIcon />}
              Near Public Transport
            </ServiceItem>
          </ServicesList>
          
          {foodBank.additionalServices && (
            <div>
              <h3>Additional Services</h3>
              <ul>
                {foodBank.additionalServices.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          )}

          {foodBank.notes && (
            <div>
              <h3>Notes</h3>
              <p>{foodBank.notes}</p>
            </div>
          )}
        </ServiceColumn>
      </InfoSection>

      <PrintButton onClick={handlePrint}>
        <PrintIcon /> Print Information
      </PrintButton>
    </DetailContainer>
  );
}

export default FoodBankDetails;