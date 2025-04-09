import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #2c5282;
  color: white;
  padding: 40px 24px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: white;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;
  font-size: 14px;
  transition: color 0.2s;
  
  &:hover {
    color: white;
  }
`;

const ExternalLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;
  font-size: 14px;
  transition: color 0.2s;
  
  &:hover {
    color: white;
  }
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 1.5;
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>HFX Food Bank Locator</SectionTitle>
          <FooterText>
            Helping connect people with food resources in Halifax since 2025.
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>Navigation</SectionTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>Resources</SectionTitle>
          <ExternalLink href="https://feednovascotia.ca/" target="_blank" rel="noopener noreferrer">
            Feed Nova Scotia
          </ExternalLink>
          <ExternalLink href="https://www.foodbankscanada.ca/" target="_blank" rel="noopener noreferrer">
            Food Banks Canada
          </ExternalLink>
          <ExternalLink href="https://www.halifax.ca/home/community-support" target="_blank" rel="noopener noreferrer">
            Halifax Community Support
          </ExternalLink>
        </FooterSection>
        
        <FooterSection>
          <SectionTitle>Contact</SectionTitle>
          <FooterText>
            <strong>Email:</strong> info@hfxfoodbanks.org
          </FooterText>
          <FooterText>
            <strong>Report an issue:</strong> support@hfxfoodbanks.org
          </FooterText>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {new Date().getFullYear()} HFX Food Bank Locator | All Rights Reserved</p>
        <p>A capstone project by NSCC students(Harry,Jay,Miracle,Frank)</p>
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;