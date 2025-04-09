import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  margin-top: 40px;
  margin-bottom: 40px;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #2c5282;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #2d3748;
  margin-top: 32px;
  margin-bottom: 16px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #4a5568;
  margin-bottom: 20px;
`;

const FeaturesList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 16px;
  margin-bottom: 24px;
`;

const FeatureItem = styled.li`
  padding: 12px 0;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #f0f4f8;
  
  &:last-child {
    border-bottom: none;
  }
  
  svg {
    margin-right: 12px;
    color: #2c5282;
    min-width: 24px;
  }
`;

const TeamSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const TeamMember = styled.div`
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
`;

const MemberName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c5282;
  margin-top: 12px;
  margin-bottom: 8px;
`;

const MemberRole = styled.p`
  font-size: 14px;
  color: #718096;
  margin-bottom: 12px;
`;

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
  </svg>
);

function About() {
  return (
    <AboutContainer>
      <PageTitle>About HFX Food Bank Locator</PageTitle>
      
      <Paragraph>
        The HFX Food Bank Locator is a web application designed to help individuals and families in Halifax find nearby food banks and access essential services. Our mission is to make food resources more accessible to those in need by providing a convenient way to locate food banks, view their hours of operation, and learn about the services they offer.
      </Paragraph>
      
      <SectionTitle>Our Features</SectionTitle>
      <Paragraph>
        We've designed this application with user-friendly features to make it easier for anyone to find the help they need:
      </Paragraph>
      
      <FeaturesList>
        <FeatureItem>
          <CheckIcon />
          <div>
            <strong>Interactive Map</strong>: Visualize all food banks in Halifax with an easy-to-use map interface.
          </div>
        </FeatureItem>
        <FeatureItem>
          <CheckIcon />
          <div>
            <strong>Detailed Information</strong>: Access crucial details about each food bank including hours, services, and contact information.
          </div>
        </FeatureItem>
        <FeatureItem>
          <CheckIcon />
          <div>
            <strong>Accessibility Filters</strong>: Quickly find food banks with wheelchair access, translators, and special dietary options.
          </div>
        </FeatureItem>
        <FeatureItem>
          <CheckIcon />
          <div>
            <strong>"Open Now" Filter</strong>: See which food banks are currently open and available for immediate assistance.
          </div>
        </FeatureItem>
        <FeatureItem>
          <CheckIcon />
          <div>
            <strong>Distance Calculation</strong>: Food banks are automatically sorted by distance from your current location.
          </div>
        </FeatureItem>
        <FeatureItem>
          <CheckIcon />
          <div>
            <strong>Print-Friendly Information</strong>: Easily print food bank details for offline reference.
          </div>
        </FeatureItem>
      </FeaturesList>
      
      <SectionTitle>Our Team</SectionTitle>
      <Paragraph>
        HFX Food Bank Locator was developed by a dedicated team of students as part of a capstone project at NSCC in Halifax:
      </Paragraph>
      
      <TeamSection>
        <TeamMember>
          <MemberName>Miracle Fasaye</MemberName>
          <MemberRole>UI/UX Design & Frontend Development</MemberRole>
        </TeamMember>
        <TeamMember>
          <MemberName>Frank Zhu</MemberName>
          <MemberRole>Backend & Database Development</MemberRole>
        </TeamMember>
        <TeamMember>
          <MemberName>Harry Mehta</MemberName>
          <MemberRole>Research & Data Collection</MemberRole>
        </TeamMember>
        <TeamMember>
          <MemberName>Jay Singh</MemberName>
          <MemberRole>Geolocation & API Integration</MemberRole>
        </TeamMember>
      </TeamSection>
      
      <SectionTitle>Project Timeline</SectionTitle>
      <Paragraph>
        This project was developed from January to April 2025 as part of an integrated programming course. The application was designed with input from local community organizations to ensure it meets the needs of Halifax residents.
      </Paragraph>
      
      <SectionTitle>Contact Us</SectionTitle>
      <Paragraph>
        If you have questions, feedback, or would like to report an issue with the application, please contact us at <a href="mailto:info@hfxfoodbanks.org">info@hfxfoodbanks.org</a>.
      </Paragraph>
    </AboutContainer>
  );
}

export default About;