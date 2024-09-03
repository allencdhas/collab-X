import { useEffect, useState } from 'react';
import { createKintoSDK, KintoAccountInfo } from 'kinto-web-sdk';
import {
  encodeFunctionData, Address, getContract,
  defineChain, createPublicClient, http, parseAbi
} from 'viem';

import Header from 'components/Header/Header';
import Projects from 'components/Projects/Projects';


import { BREAKPOINTS } from 'config';
import { ReactComponent as CreditImage } from './credit.svg';
import numeral from 'numeral';
import contractsJSON from '../public/abis/7887.json';
import './App.css';
import 'index.css';
import appAbi from '../public/abis/appAbi.json';
import { readContract } from 'viem/_types/actions/public/readContract';

interface KYCViewerInfo {
  isIndividual: boolean;
  isCorporate: boolean;
  isKYC: boolean;
  isSanctionsSafe: boolean;
  getCountry: string;
  getWalletOwners: Address[];
}

export const counterAbi = appAbi.abi;


const kinto = defineChain({
  id: 7887,
  name: 'Kinto',
  network: 'kinto',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.kinto-rpc.com/'],
      webSocket: ['wss://rpc.kinto.xyz/ws'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://kintoscan.io' },
  },
});

const KintoConnect = () => {
  const [accountInfo, setAccountInfo] = useState<KintoAccountInfo | undefined>(undefined);
  const [kycViewerInfo, setKYCViewerInfo] = useState<any | undefined>(undefined);
  const [counter, setCounter] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const kintoSDK = createKintoSDK('0x32F237f3b0BE5B5e19A756b187C0EB89926f61a3');
  const counterAddress = "0x32F237f3b0BE5B5e19A756b187C0EB89926f61a3" as Address;

  const [facetAddress, setFacetAddress] = useState<Address | undefined>(undefined);

  async function kintoLogin() {
    try {
      await kintoSDK.createNewWallet();
    } catch (error) {
      console.error('Failed to login/signup:', error);
    }
  }

  async function fetchFacetAddress() {
    const client = createPublicClient({
      chain: kinto,
      transport: http(),
    });

    const data = await client.readContract({
      address: counterAddress,
      abi: counterAbi,
      functionName: 'facets',
      args: [],
    });
    console.log('Facet address:', data);
  }


  async function fetchKYCViewerInfo() {
    if (!accountInfo?.walletAddress) return;

    const client = createPublicClient({
      chain: kinto,
      transport: http(),
    });
    const kycViewer = getContract({
      address: contractsJSON.contracts.KYCViewer.address as Address,
      abi: contractsJSON.contracts.KYCViewer.abi,
      client: { public: client }
    });

    try {
      const [isIndividual, isCorporate, isKYC, isSanctionsSafe, getCountry, getWalletOwners] = await Promise.all([
        kycViewer.read.isIndividual([accountInfo.walletAddress]),
        kycViewer.read.isCompany([accountInfo.walletAddress]),
        kycViewer.read.isKYC([accountInfo.walletAddress]),
        kycViewer.read.isSanctionsSafe([accountInfo.walletAddress]),
        kycViewer.read.getCountry([accountInfo.walletAddress]),
        kycViewer.read.getWalletOwners([accountInfo.walletAddress])
      ]);

      setKYCViewerInfo({
        isIndividual,
        isCorporate,
        isKYC,
        isSanctionsSafe,
        getCountry,
        getWalletOwners
      } as KYCViewerInfo);
    } catch (error) {
      console.error('Failed to fetch KYC viewer info:', error);
    }

    console.log('KYCViewerInfo:', kycViewerInfo);
  }

  async function fetchAccountInfo() {
    try {
      setAccountInfo(await kintoSDK.connect());
    } catch (error) {
      console.error('Failed to fetch account info:', error);
    }
  };

  useEffect(() => {
    fetchAccountInfo();
    //fetchCounter();
    fetchFacetAddress();
  });

  useEffect(() => {
    if (accountInfo?.walletAddress) {
      fetchKYCViewerInfo();
    }
  }, [accountInfo]);

  // todo: add info about the dev portal and link
  return (
    <main>
      <div>
        <Header />
      </div>
      <div>
        {facetAddress}
        <Projects />
      </div>
    </main>
  );
}


function App() {
  return (
    <div className="App bg-black">
      <KintoConnect />
    </div>
  );
}

export default App;
