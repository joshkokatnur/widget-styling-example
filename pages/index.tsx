import React from "react";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";

const chains = [polygonMumbai];

import TWAMMWidget, { darkTheme } from "aqueduct-widget";

const theme = {
  ...darkTheme,
  TitleColor: "#10172A",
  bgColor: '#F8FAFC',
  primaryBorderWidth: '0px',
  primaryText: '#000000',
  plusBg: '#00000010',
  plusBorder: '#00000050',
  plusColor: '#00000050',
  streamLengthBox: '#FFFFFF',
  tokenBox: '#FFFFFF',
  accentText: '#000000',
  textFont: "'Neue Haas Grotesk Display Pro Roman', sans-serif",
  numberFont: "'Neue Haas Grotesk Display Pro', sans-serif",
  primaryFontWeight: '500',
  accentBorderColor: '#E2E8F0',
  accentBorderWidth: '1px',
  accentShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  secondaryBorderRadius: '10px',
  swapButtonRadius: '0.8rem',
  swapButton: 'linear-gradient(180deg,#d0e18a,#c4dd60)',
  swapButtonShadow: 'inset 0 -1px 4px 0 rgba(0,0,0,.16), 0 2px 4px 0 rgba(86,116,39,.12)',
  secondaryText: '#00000099',
  brandColor: '#B5D334',
  lightBrandColor: '#B5D334BF',
  accentBackgroundColor: '#FFFFFF',
}

const config = createConfig(
    getDefaultConfig({
        // Required API Keys
        alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY, // or infuraId
        walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,

        // Required
        appName: "Aqueduct",
        chains
    }),
);

const customTokens = [
    {
        name: 'Alongside Crypto Index',
        address: '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f', // this is just the fdaix address, update to 
        symbol: 'AMKT',
        decimals: 18,
        logoURI: '/amkt.png', // references /public directory,
        underlyingToken: {
            name: 'Alongside Crypto Index',
            address: '0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7', // fdai address
            symbol: 'AMKT',
            decimals: 18,
            logoURI: '/amkt.png'
        }
    },
    {
        name: "USD Coin",
        address: "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
        symbol: "USDCx",
        decimals: 18,
        underlyingToken: {
            name: "USD Coin",
            address: "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2",
            symbol: "USDC",
            decimals: 18, // fusdc has 18 decimals
            logoURI: "/usdc-logo.png",
        },
        logoURI: "/usdc-logo.png",
    }
]

function Widget() {
    return (
        <WagmiConfig config={config}>
            <ConnectKitProvider>
                <div
                    style={{
                        background: '#F8FAFC',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div
                        style={{width: '30rem'}}
                    >
                        <TWAMMWidget
                            theme={theme}
                            tokenOption={customTokens}
                        />
                    </div>
                </div>
            </ConnectKitProvider>
        </WagmiConfig>
    );
};

export default Widget;