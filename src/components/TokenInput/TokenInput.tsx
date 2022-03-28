import React from 'react';
import styled from 'styled-components';

import { Button } from '@material-ui/core';
import Input, { InputProps } from '../Input';

interface TokenInputProps extends InputProps {
  max: number | string;
  symbol: string;
  onSelectMax?: () => void;
  icon?: any;
}

const TokenInput: React.FC<TokenInputProps> = ({ max, symbol, onChange, onSelectMax, value, icon }) => {
  return (
    <StyledTokenInput>
      <StyledTokenHeader>
        <StyledSymbolText>
          {symbol}
        </StyledSymbolText>
        <StyledMaxText>
          Balance: {max.toLocaleString()} {symbol}
        </StyledMaxText>
      </StyledTokenHeader>
      <StyledTokenBody>
        <StyledTokenIcon>{icon}</StyledTokenIcon>
        <StyledInputToken>
          <Input
            endAdornment={
              <StyledTokenAdornmentWrapper>
                {/* <StyledTokenSymbol>{symbol}</StyledTokenSymbol> */}
                <StyledSpacer />
                <div>
                  <Button size="small" color="primary" variant="contained" onClick={onSelectMax}>
                    Max
                  </Button>
                </div>
              </StyledTokenAdornmentWrapper>
            }
            onChange={onChange}
            placeholder="0"
            value={value}
          />
        </StyledInputToken>
      </StyledTokenBody>
     
    </StyledTokenInput>
  );
};

/*
            <div>
              <Button size="sm" text="Max" />
            </div>
*/

const StyledTokenInput = styled.div`
    background-color: #eeeeee;
    border-radius: 12px;
    padding: 0 16px;
    `;

const StyledTokenHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTokenBody = StyledTokenHeader;

const StyledTokenIcon = styled.span``;

const StyledInputToken = styled.span`
div {
  background-color: unset;
}
`;

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`;

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledMaxText = styled.span`
  align-items: center;
  color: ${(props) => props.theme.color.grey[400]};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`;

const StyledSymbolText = styled.span`
  align-items: center;
  color: ${(props) => props.theme.color.grey[400]};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-start;
`;

export default TokenInput;
