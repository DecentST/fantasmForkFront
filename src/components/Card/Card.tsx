import React from 'react';
import styled from 'styled-components';

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  background: linear-gradient(to left, rgb(2, 46, 89) 100%, rgba(21, 62, 103, 0.38) 50%, rgba(74, 125, 175, 0.56) 0%);
  color: #2c2560 !important;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default Card;
