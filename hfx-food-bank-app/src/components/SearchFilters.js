// src/components/SearchFilters.js
import React, { useState } from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66,153,225,0.2);
  }
`;

const FiltersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
`;

const OpenNowButton = styled.button`
  background-color: ${props => props.active ? '#2c5282' : 'white'};
  color: ${props => props.active ? 'white' : '#2c5282'};
  border: 1px solid #2c5282;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  box-shadow: ${props => props.active ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'};
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  svg {
    margin-right: 8px;
  }
`;

const FilterCheckbox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  
  input {
    margin-right: 6px;
    appearance: none;
    width: 18px;
    height: 18px;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    position: relative;
    
    &:checked {
      background-color: #2c5282;
      border-color: #2c5282;
    }
    
    &:checked:after {
      content: "";
      position: absolute;
      display: block;
      top: 2px;
      left: 6px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(66,153,225,0.2);
    }
  }
  
  label {
    cursor: pointer;
    font-size: 14px;
    color: #4a5568;
  }
`;

// Clock icon for OpenNow button
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="currentColor" />
  </svg>
);

function SearchFilters({ onSearch, openNowFilter, toggleOpenNowFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    wheelchairAccess: false,
    translators: false,
    dietaryOptions: false
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value, filters);
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: checked
    };
    setFilters(updatedFilters);
    onSearch(searchTerm, updatedFilters);
  };

  return (
    <FiltersContainer>
      <SearchInput 
        type="text" 
        placeholder="Search food banks by name or location..." 
        value={searchTerm}
        onChange={handleSearchChange}
      />
      
      <FiltersRow>
        <OpenNowButton 
          active={openNowFilter} 
          onClick={toggleOpenNowFilter}
        >
          <ClockIcon /> 
          {openNowFilter ? 'Open Now' : 'Open Now'}
        </OpenNowButton>
        
        <FilterCheckbox>
          <input 
            type="checkbox" 
            id="wheelchairAccess" 
            name="wheelchairAccess"
            checked={filters.wheelchairAccess}
            onChange={handleFilterChange}
          />
          <label htmlFor="wheelchairAccess">Wheelchair Access</label>
        </FilterCheckbox>
        
        <FilterCheckbox>
          <input 
            type="checkbox" 
            id="translators" 
            name="translators"
            checked={filters.translators}
            onChange={handleFilterChange}
          />
          <label htmlFor="translators">Translators</label>
        </FilterCheckbox>
        
        <FilterCheckbox>
          <input 
            type="checkbox" 
            id="dietaryOptions" 
            name="dietaryOptions"
            checked={filters.dietaryOptions}
            onChange={handleFilterChange}
          />
          <label htmlFor="dietaryOptions">Dietary Options</label>
        </FilterCheckbox>
      </FiltersRow>
    </FiltersContainer>
  );
}

export default SearchFilters;