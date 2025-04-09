// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Map from '../components/Map';
import FoodBankList from '../components/FoodBankList';
import SearchFilters from '../components/SearchFilters';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  @media (min-width: 768px) {
    flex-direction: row;
    height: calc(100vh - 70px);
  }
`;

const MapContainer = styled.div`
  height: 40vh;
  width: 100%;
  position: relative;
  
  @media (min-width: 768px) {
    height: 100%;
    width: 60%;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  padding: 24px;
  background-color: #f8fafc;
  overflow-y: auto;
  
  @media (min-width: 768px) {
    width: 40%;
    height: 100%;
  }
`;

const PageHeading = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 20px;
`;

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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #f8fafc;
`;

const LoadingSpinner = styled.div`
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
`;

function Home() {
  const [foodBanks, setFoodBanks] = useState([]);
  const [filteredFoodBanks, setFilteredFoodBanks] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openNowFilter, setOpenNowFilter] = useState(false);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to Halifax center
          setUserLocation({ lat: 44.6488, lng: -63.5752 });
        }
      );
    } else {
      // Default to Halifax center
      setUserLocation({ lat: 44.6488, lng: -63.5752 });
    }

    // Fetch food banks from Firestore
    const fetchFoodBanks = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching food banks from Firebase...");
        
        const foodBanksRef = collection(db, 'foodBanks');
        const snapshot = await getDocs(foodBanksRef);
        
        console.log("Raw data from Firebase:", snapshot.docs.length, "items");
        
        if (snapshot.docs.length === 0) {
          console.warn("No food banks found in database!");
          setIsLoading(false);
          return;
        }
        
        // Make sure we're not duplicating data
        const foodBanksList = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log("Food bank data:", doc.id, data);
          return {
            id: doc.id,
            ...data
          };
        });
        
        console.log("Mapped food bank data:", foodBanksList);
        
        setFoodBanks(foodBanksList);
        setFilteredFoodBanks(foodBanksList);
        console.log("Food banks set in state:", foodBanksList.length);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching food banks:", error);
        setIsLoading(false);
      }
    };

    fetchFoodBanks();
  }, []);

  const parseTimeToDecimal = (timeString) => {
    if (!timeString || timeString === 'Closed') return null;
    try {
      const [hours, minutes] = timeString.split(':');
      return parseInt(hours) + (parseInt(minutes) / 60);
    } catch (error) {
      console.error("Error parsing time:", timeString, error);
      return null;
    }
  };

  const handleSearch = (searchTerm, filters) => {
    console.log("Search called with:", searchTerm, filters, openNowFilter);
    console.log("Total food banks before filtering:", foodBanks.length);
    
    let results = [...foodBanks]; // Create a new array to avoid mutating the original
    console.log("Initial food banks data:", results);
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(foodBank => 
        foodBank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        foodBank.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("After search term filter:", results.length);
    }
    
    // Apply "Open Now" filter
    if (openNowFilter) {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTime = currentHour + (currentMinutes / 60);
      
      console.log("Current day:", dayOfWeek, "Current time:", currentTime);
      
      results = results.filter(foodBank => {
        // Skip if no hours data
        if (!foodBank.hours || !foodBank.hours[dayOfWeek]) {
          console.log(`${foodBank.name} - No hours data for today`);
          return false;
        }
        
        const { open, close } = foodBank.hours[dayOfWeek];
        
        // Skip if closed
        if (!open || !close || open === "Closed" || close === "Closed") {
          console.log(`${foodBank.name} - Closed today`);
          return false;
        }
        
        const openTime = parseTimeToDecimal(open);
        const closeTime = parseTimeToDecimal(close);
        
        if (openTime === null || closeTime === null) {
          console.log(`${foodBank.name} - Invalid opening hours`);
          return false;
        }
        
        const isOpen = currentTime >= openTime && currentTime < closeTime;
        console.log(`${foodBank.name} - Open: ${openTime}-${closeTime}, Current: ${currentTime}, Is Open: ${isOpen}`);
        
        return isOpen;
      });
      console.log("After open now filter:", results.length);
    }
    
    // Apply other filters
    if (filters) {
      if (filters.wheelchairAccess) {
        results = results.filter(foodBank => foodBank.wheelchairAccess);
        console.log("After wheelchair filter:", results.length);
      }
      if (filters.translators) {
        results = results.filter(foodBank => foodBank.translators);
        console.log("After translators filter:", results.length);
      }
      if (filters.dietaryOptions) {
        results = results.filter(foodBank => foodBank.dietaryOptions);
        console.log("After dietary options filter:", results.length);
      }
    }
    
    console.log("Final filtered results:", results.length);
    setFilteredFoodBanks(results);
  };

  const toggleOpenNowFilter = () => {
    const newOpenNowValue = !openNowFilter;
    console.log("Toggling Open Now filter:", openNowFilter, "->", newOpenNowValue);
    setOpenNowFilter(newOpenNowValue);
    
    // Use the new value in the filter logic
    handleSearch('', {});
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading food banks...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <HomeContainer>
      <MapContainer>
        {userLocation && (
          <Map 
            foodBanks={filteredFoodBanks} 
            userLocation={userLocation} 
          />
        )}
      </MapContainer>
      <ListContainer>
        <PageHeading>Find Food Banks in Halifax</PageHeading>
        <SearchFilters 
          onSearch={handleSearch} 
          openNowFilter={openNowFilter}
          toggleOpenNowFilter={toggleOpenNowFilter}
        />
        <FoodBankList 
          foodBanks={filteredFoodBanks} 
          userLocation={userLocation}
        />
      </ListContainer>
    </HomeContainer>
  );
}

export default Home;