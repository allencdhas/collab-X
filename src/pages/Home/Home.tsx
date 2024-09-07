import { useEffect, useState } from 'react';
import {
    FiX,
    FiCopy,
    FiUserPlus,
  } from "react-icons/fi";

import { createKintoSDK, KintoAccountInfo } from 'kinto-web-sdk';
import {
  Address, getContract,
  defineChain, createPublicClient, http
} from 'viem';

import Projects from 'components/Projects/Projects';


import contractsJSON from '../../../public/abis/7887.json';
import 'index.css';
import appAbi from '../../../public/abis/appAbi.json';
import { readContract } from 'viem/_types/actions/public/readContract';

interface KYCViewerInfo {
  isIndividual: boolean;
  isCorporate: boolean;
  isKYC: boolean;
  isSanctionsSafe: boolean;
  getCountry: string;
  getWalletOwners: Address[];
}

export const collabxAbi = appAbi.abi;


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

const Home = () => {
  const [accountInfo, setAccountInfo] = useState<KintoAccountInfo | undefined>(undefined);
  const [kycViewerInfo, setKYCViewerInfo] = useState<any | undefined>(undefined);

  //const [loading, setLoading] = useState<boolean>(false);
  const kintoSDK = createKintoSDK('0x32F237f3b0BE5B5e19A756b187C0EB89926f61a3');
  const collabxAddress = "0x32F237f3b0BE5B5e19A756b187C0EB89926f61a3" as Address;

  const [facetAddress, setFacetAddress] = useState<Address | undefined>(undefined);

  async function kintoLogin() {
    try {
      await kintoSDK.createNewWallet();
    } catch (error) {
      console.error('Failed to login/signup:', error);
    }
  }

  async function fetchProjects() {
    const client = createPublicClient({
      chain: kinto,
      transport: http(),
    });

    const data = await client.readContract({
      address: collabxAddress,
      abi: collabxAbi,
      functionName: 'viewAllProjects',
      args: [],
    });
    // data is an array of addresses
    console.log('Projects:', data);
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
    fetchProjects();
  });

  useEffect(() => {
    if (accountInfo?.walletAddress) {
      fetchKYCViewerInfo();
    }
  }, [accountInfo]);







  const [projectTitle, setProjectTitle] = useState("");
  const [activeTab, setActiveTab] = useState<"new" | "popular">("new");
  const [showContactPopup, setShowContactPopup] = useState(false);


  const toggleContactPopup = () => {
    setShowContactPopup(!showContactPopup);
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://collabx.com/join");
    alert("Link copied to clipboard!");
  };

  // todo: add info about the dev portal and link
  return (
    <div className="bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 text-white min-h-screen relative overflow-hidden">
      {/* Star background */}
      <div className="absolute inset-0 z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animation: `twinkle ${Math.random() * 5 + 5}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Header/NavBar */}
      <header className="relative z-10 flex justify-between items-center p-4 mr-4 bg-gradient-to-r from-blue-900 to-purple-800">
        <div className="text-2xl font-bold">CollabX</div>
        <nav className="space-x-4">
          <a
            href="./"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/display"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Collaborate
          </a>
          <a
            href="./episode"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Read
          </a>
          <a
            href="./inspiration"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            AI
          </a>
        </nav>

        <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300">
          Login
        </button>
      </header>

      {/* Main Section */}
      <main className="relative z-10 p-16 space-y-8">
        {/* New/Popular Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-x-4 text-2xl">
            <button
              className={`font-bold ${
                activeTab === "new" ? "text-blue-300" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("new")}
            >
              New
            </button>
            <button
              className={`font-bold ${
                activeTab === "popular" ? "text-blue-300" : "text-gray-400"
              }`}
              onClick={() => setActiveTab("popular")}
            >
              Popular
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Project Title"
              className="bg-transparent border-b border-blue-300 focus:outline-none text-blue-100 placeholder-blue-300"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
            />
            <a href="./create">
              <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300">
                Create Project
              </button>
            </a>
          </div>
        </div>

        {/* Sub-Navigation (All, Video, etc.) */}
        <div className="space-x-12 mb-12 text-lg font-normal ">
          {["All", "Video", "Manga/Webtoon", "Visual Novel/Text"].map(
            (item) => (
              <button
                key={item}
                className="hover:text-blue-300 hover:underline transition-colors duration-300 hover:font-semibold"
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-2 gap-6 ">
            

            <>
              <a href={`/display`}>
                <Projects
                  title="Slice of Life in Kabuki-cho"
                  author="Local Toyota"
                  image="/placeholder.svg?height=300&width=500"
                  views={234}
                  likes={45}
                />
              </a>
              <Projects
                title="Slice of Life in Kabuki-cho (Comics)"
                author="Local Toyota"
                image="/placeholder.svg?height=300&width=500"
            
                views={234}
                likes={45}
              />
            </>

        </div>
        <footer className="relative z-10 py-4 text-center">
          <button
            onClick={toggleContactPopup}
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Contact
          </button>
        </footer>


      </main>



      {/* Contact Popup */}
      {showContactPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gradient-to-br from-blue-900 to-purple-800 p-8 rounded-lg max-w-2xl relative">
            <button
              className="absolute top-4 right-4 text-white hover:text-blue-300 transition-colors duration-300"
              onClick={toggleContactPopup}
            >
              <FiX size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-4">Join Collab X Team</h2>
            <p className="mb-4">
              Welcome to CollabX - a place where creativity meets collaboration!
              Here, people find exciting projects to collaborate on, companies
              discover great stories to bring to life, and artists and marketers
              leverage their skills to scale their stories across different
              media and languages.
            </p>
            <p className="mb-4">
              But collaboration at CollabX isn't just for artists. We're also
              looking for talented developers, business minds, and sponsors to
              join our community and help bring these amazing stories to life.
            </p>
            <div className="flex space-x-4 mt-6">
              <button
                className="flex items-center bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-300"
                onClick={() => {
                  /* Add join functionality */
                }}
              >
                <FiUserPlus className="mr-2" /> Join Now
              </button>
              <button
                className="flex items-center bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition-colors duration-300"
                onClick={copyLink}
              >
                <FiCopy className="mr-2" /> Copy Invite Link
              </button>
            </div>
          </div>
        </div>
      )}
      {/* CSS for animations */}
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}

export default Home;
