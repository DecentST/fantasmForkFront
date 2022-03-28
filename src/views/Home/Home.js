import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/soul-background.jpg';
import CashImage from '../../assets/img/Soul-Train.svg';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useYTokenStats from '../../hooks/useYTokenStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { soul as soulTesting, tShare as tShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { yToken as yTokenProd, tShare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';

import MetamaskFox from '../../assets/img/metamask-fox.svg';
import LockIcon from '../../assets/img/lock-icon.png';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';
import { device } from '../../theme/colors';

const BackgroundImage = createGlobalStyle`
  body {
    background-color: #b7edff !important;
    background-size: cover !important;
  }

  .banner-header {
    font-size: 14px;
    padding: 18px;
    flex-direction: column;
    align-items:flex-start;
    justify-content: center;

    @media ${device.tablet} { 
      font-size: 16px;
      flex-direction: row;
      align-items:center;
    }

    @media ${device.desktop} {
      font-size: 14px;
      flex-direction: column;
    }
  }

  .banner-icon {
    width: 60px ;
    position: absolute;
    right: 20px; 
    top: 32px;

    @media ${device.tablet} { 
      width: 60px;
      position: absolute;
      right: 20px; 
      top: 18px;
    }

    @media ${device.desktop} {
      width: 60px ;
      position: absolute;
      right: 20px; 
      top: 32px;
    }
  } 

  .token-name {
    font-size:20px;

    @media ${device.tablet} { 
      font-size:28px;
    }

    @media ${device.desktop} {
      font-size:20px;
    }
  }

  .link-contract {
    font-size:14px;

    @media ${device.tablet} { 
      font-size:18px;
    }

    @media ${device.desktop} {
      font-size:14px;
    }
  }

  .card-icon div img{
    width: 45px !important;
    height: 45px !important;

    @media ${device.tablet} { 
      width: 64px !important;
      height: 64px !important;
    }

    @media ${device.desktop} {
      width: 45px !important;
      height: 45px !important;
    }
  }

  .home-info-box {
    display : flex; 
    flex-direction: row; 
    gap: 15px; 
    align-items: center; 
    justify-content: space-between; 
    padding: 16px !important;
  }

  .home-info-box__left {
    display : flex; 
    flex-direction: row; 
    gap: 15px; 
    align-items: center; 
    justify-content: flex-start; 
  }

  .home-info-box__data {
    font-size: 18px;
    font-weight: 600;

    @media ${device.tablet} { 
    font-size: 22px;
    }

    @media ${device.desktop} {
    font-size: 18px;
    }
  }

  .home-button {
    display : flex; 
    flex-direction: row; 
    gap: 15px; 
    align-items: center; 
    justify-content: flex-start; 
    padding: 16px !important;
  }

  .home-button:hover {
    cursor: pointer; 
    background-color: rgb(2 67 130);
  }

  .home-button__image, .home-info-box__image {
    width: 30px;

    @media ${device.tablet} { 
      width: 50px;
    }

    @media ${device.desktop} {
      width: 30px;
    }
  }

  .home-button__right-block {
    display: flex; 
    flex-direction: column; 
  }

  .home-button__right-block__title, .home-info-box__right-block__title {
    color: rgb(229, 229, 229);
    font-weight:600;
    font-size: 14px;

    @media ${device.tablet} { 
      font-size: 20px;
    }

    @media ${device.desktop} {
      font-size: 14px;
    }
  }

  .home-button__right-block__data, .home-info-box__right-block__data {
    color: rgb(229, 229, 229);
    font-size: 12px;
    font-weight: 400;

    @media ${device.tablet} { 
      font-size: 16px;
    }

    @media ${device.desktop} {
      font-size: 12px;
    }
  }

  .home-button__link {
    text-decoration: none !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const StyledSpanPrice = styled.span`
  font-size: 14px;

  @media ${device.tablet} { 
    font-size: 16px;
  }

  @media ${device.desktop} {
    font-size: 14px;
  }
`;

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const tombFtmLpStats = useLpStats('TOMB-FTM-LP');
  const tShareFtmLpStats = useLpStats('TSHARE-FTM-LP');
  const yTokenStats = useYTokenStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  let yToken;
  let tShare;

  yToken = yTokenProd;
  tShare = tShareProd;
  

  const buyFxmAddress = 'https://spookyswap.finance/swap?outputCurrency=' + yToken.address;
  const buyTShareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tShare.address;

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tombPriceInDollars = useMemo(
    () => (yTokenStats ? Number(yTokenStats.priceInDollars).toFixed(2) : null),
    [yTokenStats],
  );
  const yTokenPriceInFTM = useMemo(() => (yTokenStats ? Number(yTokenStats.tokenInFtm).toFixed(4) : null), [yTokenStats]);
  const tombCirculatingSupply = useMemo(() => (yTokenStats ? String(yTokenStats.circulatingSupply) : null), [yTokenStats]);
  const tombTotalSupply = useMemo(() => (yTokenStats ? String(yTokenStats.totalSupply) : null), [yTokenStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombLpZap = useZap({ depositTokenName: 'TOMB-FTM-LP' });
  const tshareLpZap = useZap({ depositTokenName: 'TSHARE-FTM-LP' });

  const StyledLink = styled.a`
    font-weight: 700;
    text-decoration: none;
  `;

  const [onPresentTombZap, onDissmissTombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTombZap();
      }}
      tokenName={'TOMB-FTM-LP'}
    />,
  );

  const [onPresentTshareZap, onDissmissTshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTshareZap();
      }}
      tokenName={'TSHARE-FTM-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid container item justify="center">
          <h2>Welcome to tiktok</h2> <br/>
        </Grid>
        < Grid container item justify = "center" style = {{ textAlign: 'center' }} >
         <div>Fractional-Algorithmic Synthetic Token pegged to the value of 1 FTM on Fantom Opera</div>
        </Grid>

        {/* TVL */}
        <Grid item xs={12} sm={12} lg={12}>
          <Card>
            <CardContent align="center" className="banner-header" style={{ position:'relative', display:'flex', gap:'5px' }}>
              <h2>Total Value Locked</h2>
              <CountUp  style={{ fontSize: '40px', color: 'rgb(0, 255, 63)' }} end={TVL} separator="," prefix="$" />
              <img className="banner-icon" alt="banner icon lock" src={LockIcon} />
            </CardContent>
          </Card>
        </Grid>

        {/* FXM */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent align="left" style={{ position: 'relative', padding:'20px 20px 60px 20px' }}>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('FXM');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', bottom: '10px', right: '20px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box style={{ display: 'flex', justifyContent:'space-between' }}>
                <div style={{ display: 'flex' , alignItems: 'center'}}>
                  <Box className="card-icon">
                    <CardIcon>
                      <TokenSymbol symbol="FXM" />
                    </CardIcon>
                  </Box>
                  <Box style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', marginLeft:'10px' }}>
                    <h2 class="token-name">FXM</h2>
                    <a href="" target="_blank" className="link-contract" style={{ color:'rgb(241 136 29)', textDecoration:'none' }}>
                      View contract
                    </a>
                  </Box>
                </div>
                <div style={{ display: 'flex', flexDirection:'column',gap: '5px', alignItems:'flex-end'}}>
                  <Box>
                    <StyledSpanPrice>
                      Price:&nbsp;
                      <span style={{ color: '#00ff3f' }}>{yTokenPriceInFTM ? yTokenPriceInFTM : '-.----'} FTM</span>
                    </StyledSpanPrice>
                  </Box>
                  <Box>
                    <span style={{ alignContent: 'flex-start' }}>
                      <StyledSpanPrice>
                        ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
                      </StyledSpanPrice>
                    </span>
                  </Box>
                </div>
              </Box>
              
              <Box style={{ fontSize:'14px',display:'flex', flexDirection:'column',gap:'5px',marginTop: '18px', padding: '18px', borderRadius: '20px', border: '1px solid rgb(39, 92, 138)', backgroundColor: 'rgb(20, 57, 94)' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                      <StyledSpanPrice>Circulating Supply</StyledSpanPrice>
                    </div>
                    <div style={{ borderBottom: '1px dashed rgba(255, 255, 255, 0.16)', flex: '1 1 0%', margin:'14px 10px 4px'}}>
                    </div>
                    <div>
                      <StyledSpanPrice>{formatter.format(tombCirculatingSupply).substring(1)}</StyledSpanPrice>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                      <StyledSpanPrice>Market Cap</StyledSpanPrice>
                    </div>
                    <div style={{ borderBottom: '1px dashed rgba(255, 255, 255, 0.16)', flex: '1 1 0%', margin:'14px 10px 4px'}}>
                    </div>
                    <div>
                      <StyledSpanPrice>{formatter.format((tombCirculatingSupply * tombPriceInDollars).toFixed(2))}</StyledSpanPrice>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <StyledSpanPrice>Total Supply</StyledSpanPrice>
                  </div>
                  <div style={{ borderBottom: '1px dashed rgba(255, 255, 255, 0.16)', flex: '1 1 0%', margin:'14px 10px 4px'}}>
                  </div>
                  <div>
                    <StyledSpanPrice>{formatter.format(tombTotalSupply).substring(1)}</StyledSpanPrice>
                  </div>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* TSHARE */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent align="left" style={{ position: 'relative', padding:'20px 20px 60px 20px' }}>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('FTMX');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', bottom: '10px', right: '20px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box style={{ display: 'flex', justifyContent:'space-between' }}>
                <div style={{ display: 'flex' }}>
                  <Box class="card-icon">
                    <CardIcon>
                      <TokenSymbol symbol = "TSHARE" />
                    </CardIcon>
                  </Box>
                  <Box style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', marginLeft:'10px' }}>
                    <h2 class="token-name">FTMX</h2>
                    <a href="" target="_blank" className="link-contract" style={{ color:'rgb(241 136 29)', textDecoration:'none' }}>
                      View contract
                    </a>
                  </Box>
                </div>
                <div style={{ display: 'flex', flexDirection:'column',gap: '5px', alignItems:'flex-end'}}>
                  <Box>
                    <StyledSpanPrice>
                      Price:&nbsp;<span style={{ color: '#00ff3f' }}>{tSharePriceInFTM ? tSharePriceInFTM : '-.----'} FTM</span>
                    </StyledSpanPrice>
                  </Box>
                  <Box>
                    <span style={{ alignContent: 'flex-start' }}>
                      <StyledSpanPrice>
                        ${tSharePriceInDollars ? tSharePriceInDollars : '-.--'}
                      </StyledSpanPrice>
                    </span>
                  </Box>
                </div>
              </Box>
              
              <Box style={{ fontSize:'14px', display:'flex', flexDirection:'column',gap:'5px',marginTop: '18px', padding: '18px', borderRadius: '20px', border: '1px solid rgb(39, 92, 138)', backgroundColor: 'rgb(20, 57, 94)' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <StyledSpanPrice>
                      Circulating Supply
                    </StyledSpanPrice>
                  </div>
                  <div style={{ borderBottom: '1px dashed rgba(255, 255, 255, 0.16)', flex: '1 1 0%', margin:'14px 10px 4px'}}>
                  </div>
                  <div>
                    <StyledSpanPrice>
                      {formatter.format(tShareCirculatingSupply).substring(1)}
                    </StyledSpanPrice>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <StyledSpanPrice>
                      Market Cap
                    </StyledSpanPrice>
                  </div>
                  <div style={{ borderBottom: '1px dashed rgba(255, 255, 255, 0.16)', flex: '1 1 0%', margin:'14px 10px 4px'}}>
                  </div>
                  <div>
                    <StyledSpanPrice>
                      {formatter.format((tShareCirculatingSupply * tSharePriceInDollars).toFixed(2))}
                    </StyledSpanPrice>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <StyledSpanPrice>
                      Total Supply
                    </StyledSpanPrice>
                  </div>
                  <div style={{ borderBottom: '1px dashed rgba(255, 255, 255, 0.16)', flex: '1 1 0%', margin:'14px 10px 4px'}}>
                  </div>
                  <div>
                    <StyledSpanPrice>
                      {formatter.format(tShareTotalSupply).substring(1)}
                    </StyledSpanPrice>
                  </div>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <Card>
            <a href="/staking" class="home-button__link">
              <CardContent className="home-button">
                <img alt="metamask fox" className="home-button__image" src={MetamaskFox} />
                <div class="home-button__right-block">
                  <div className="home-button__right-block__title">
                    STAKE FXM
                  </div>
                  <div className="home-button__right-block__data">
                    APR : 
                  </div>
                </div>
              </CardContent>
            </a>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Card>
            <a href="/staking" class="home-button__link">
              <CardContent className="home-button">
                <img alt="metamask fox" className="home-button__image" src={MetamaskFox} />
                <div class="home-button__right-block">
                  <div className="home-button__right-block__title">
                    LOCK FXM
                  </div>
                  <div className="home-button__right-block__data">
                    APR : 
                  </div>
                </div>
              </CardContent>
            </a>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Card>
            <a href="/farms" class="home-button__link">
              <CardContent className="home-button">
                <img alt="metamask fox" className="home-button__image" src={MetamaskFox} />
                <div class="home-button__right-block">
                  <div className="home-button__right-block__title">
                    FXM/FTM
                  </div>
                  <div className="home-button__right-block__data">
                    APR : 
                  </div>
                </div>
              </CardContent>
            </a>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>  
          <Card>
            <a href="/farms" class="home-button__link">
              <CardContent className="home-button">
                <img alt="metamask fox" className="home-button__image" src={MetamaskFox} />
                <div class="home-button__right-block">
                  <div className="home-button__right-block__title">
                    FTMX/FTM
                  </div>
                  <div className="home-button__right-block__data">
                    APR : 
                  </div>
                </div>
              </CardContent>
            </a>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Card>
            <CardContent className="home-info-box">
              <div className="home-info-box__left">
                <img alt="metamask fox" className="home-info-box__image" src={MetamaskFox} />
                <div class="home-info-box__right-block">
                  <div className="home-info-box__right-block__title">
                    COLLATERAL RATIO
                  </div>
                  <div className="home-info-box__right-block__data">
                    Last update : 
                  </div>
                </div>
              </div>
              {/* TODO : bind datas */}
              <div className="home-info-box__data">
                100%
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>  
          <Card>
            <CardContent className="home-info-box">
              <div className="home-info-box__left">
                <img alt="metamask fox" className="home-info-box__image" src={MetamaskFox} />
                <div class="home-info-box__right-block">
                  <div className="home-info-box__right-block__title">
                    FTMX 60-MIN TWAP
                  </div>
                  <div className="home-info-box__right-block__data">
                    Last update : 
                  </div>
                </div>
              </div>
              {/* TODO : bind datas */}
              <div className="home-info-box__data">
                1.004 FTM
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
