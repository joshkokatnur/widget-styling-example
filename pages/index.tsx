import React from "react";
import { DynamicContextProvider, useDynamicContext } from "@dynamic-labs/sdk-react";
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import TWAMMWidget, { darkTheme } from "aqueduct-widget";
import { useAccount } from "wagmi";

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

const customTokens = [
    {
        name: 'Alongside Crypto Index',
        address: '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f' as `0x${string}`, // this is just the fdaix address, update to correct address for testing
        symbol: 'AMKT',
        decimals: 18,
        logoURI: '/amkt.png', // references /public directory,
        underlyingToken: {
            name: 'Alongside Crypto Index',
            address: '0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7' as `0x${string}`, // fdai address
            symbol: 'AMKT',
            decimals: 18,
            logoURI: '/amkt.png'
        }
    },
    {
        name: "USD Coin",
        address: "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7" as `0x${string}`,
        symbol: "USDCx",
        decimals: 18,
        underlyingToken: {
            name: "USD Coin",
            address: "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2" as `0x${string}`,
            symbol: "USDC",
            decimals: 18, // fusdc has 18 decimals
            logoURI: "/usdc-logo.png",
        },
        logoURI: "/usdc-logo.png",
    }
]

function Widget() {
    return (
        <DynamicContextProvider
            settings={{
                initialAuthenticationMode: 'connect-only',
                environmentId: process.env.NEXT_PUBLIC_ENV_ID ?? ''
            }}
        >
            <DynamicWagmiConnector>
                <WidgetWrapper/>
            </DynamicWagmiConnector>
        </DynamicContextProvider>
    );
};

function WidgetWrapper() {

    const { setShowAuthFlow } = useDynamicContext();

    return (
        <div
            className="flex flex-col h-screen bg-[#F8FAFC]"
        >
            <WalletActions />
            <div className="h-full flex items-center justify-center">
                <div className="w-[30rem] pb-[12rem]">
                    <TWAMMWidget
                        theme={theme}
                        tokenOption={customTokens}
                        onConnectWalletClick={() => {setShowAuthFlow(true)}}
                    />
                </div>
            </div>
        </div>
    )
}

function WalletActions() {

    const { handleLogOut } = useDynamicContext();
    const { address, isConnected } = useAccount();

    return (
        <div className="p-4 space-y-2 text-xs">
            <p>wallet address: {address}</p>
            <button
                className="bg-black/5 border-2 rounded-xl px-3 py-2 disabled:opacity-25"
                onClick={() => {handleLogOut()}}
                disabled={!isConnected}
            >
                disconnect wallet
            </button>
        </div>
    )
}

export default Widget;