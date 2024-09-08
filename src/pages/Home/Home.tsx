import { useEffect, useState } from 'react';
import {
  FiHeart,
    FiX,
    FiCopy,
    FiUserPlus,
    FiRepeat,
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
import React from 'react';
import { title } from 'process';


interface ProjectView {
  uri: string;
  creatorWallet: string;
  title: string;
  contributions: {
    uri: string;
    contributorWallet: string;
  }[];
}

interface KYCViewerInfo {
  isIndividual: boolean;
  isCorporate: boolean;
  isKYC: boolean;
  isSanctionsSafe: boolean;
  getCountry: string;
  getWalletOwners: Address[];
}

export const collabxAbi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "addContribution",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "uri",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "contributorWallet",
				"type": "address"
			}
		],
		"name": "ContributionAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			}
		],
		"name": "createProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creatorWallet",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			}
		],
		"name": "ProjectCreated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "viewAllProjects",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "uri",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "creatorWallet",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "uri",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "contributorWallet",
								"type": "address"
							}
						],
						"internalType": "struct Projects.Contribution[]",
						"name": "contributions",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Projects.ProjectView[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			}
		],
		"name": "viewProjectById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "uri",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "creatorWallet",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "uri",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "contributorWallet",
								"type": "address"
							}
						],
						"internalType": "struct Projects.Contribution[]",
						"name": "contributions",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Projects.ProjectView",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "viewProjectsByCreator",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "uri",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "creatorWallet",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "uri",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "contributorWallet",
								"type": "address"
							}
						],
						"internalType": "struct Projects.Contribution[]",
						"name": "contributions",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Projects.ProjectView[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const projectData: unknown[] = [];


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
  const [projects, setProjects] = useState<ProjectView[]>([]);

  //const [loading, setLoading] = useState<boolean>(false);
  const kintoSDK = createKintoSDK('0x40Fe1CB9fC88220553EA3bE4ff866Ea83a2fa2B8');
  const collabxAddress = "0x40Fe1CB9fC88220553EA3bE4ff866Ea83a2fa2B8" as Address;

  //const [facetAddress, setFacetAddress] = useState<Address | undefined>(undefined);

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
    projectData.push(data);
    console.log('ProjectData:', projectData);
    setProjects(projectData as ProjectView[]);
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
    <div>
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

      {projects.map((project, index) => (
        <>
          <ProjectCardNew
            title={project.title}
            author={project.creatorWallet}
          />
        </>
      ))}

      {/* Main Section */}
      <div className="relative z-10 p-16 space-y-8">
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
    </div>


{/* Project Cards */}
        <div className="grid grid-cols-2 gap-6 ">
          {activeTab === "new" ? (
            <>
              <a href={`/display`}>
                <ProjectCard
                  title="Blue Blooded Monsters"
                  author="Apocalypse Man"
                  image="../../../blue.jpg"
                  video="/blueblood.mp4"
                  isNew={true}
                  views={234}
                  likes={45}
                />
              </a>
                   <a href={`/episode`}>
              <ProjectCard
                title="Fever Dream Syndrome"
                author="Apocalypse Man"
                image="../../../fever.jpg"
                video="../../../FeverDreamSyndromeSheep.mp4"
                isNew={false}
                views={600}
                likes={150}
              />
                       </a>
            </>
          ) : (
            <>
              <a href={`/display`}>
                <ProjectCard
                  title="Blue Blooded Monsters"
                  author="manzana podrida"
                  image="../../../blue.jpg"
                  video="../../../blueblood.mp4"
                  isNew={false}
                  views={500}
                  likes={120}
                />
              </a>
                  <a href={`/episode`}>
              <ProjectCard
                title="Fever Dream Syndrome"
                author="Apocalypse Man"
                image="../../../fever.jpg"
                video="../../../FeverDreamSyndromeSheep.mp4"
                isNew={false}
                views={600}
                likes={150}
              />

                      </a>
            </>
          )}
        </div>
            

        </div>
        <footer className="relative z-10 py-4 text-center">
          <button
            onClick={toggleContactPopup}
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Contact
          </button>
        </footer>
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
              looking for talented developers, business minded volunteers to raise funds together, and sponsors to
              join our community and help bring these amazing stories to life.
            </p>
            <div className="flex space-x-4 mt-6">
             
              <button
                className="flex items-center bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition-colors duration-300"
                onClick={copyLink}
              >
                <FiCopy className="mr-2" /> Copy Discord Link
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


interface ProjectCardProps {
  title: string;
  author: string;
  image: string;
  video: string;
  isNew: boolean;
  views: number;
  likes: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  author,
  image,
  video,
  isNew,
  views,
  likes,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play();
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div
      className="mt-4 bg-gradient-to-br from-blue-800 to-purple-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className={`w-full h-64 object-cover ${isHovered ? 'hidden' : 'block'}`}
        />
        <video
          ref={videoRef}
          src={video}
          className={`w-full h-64 object-cover ${isHovered ? 'block' : 'hidden'}`}
          muted
          loop
          playsInline
        />
        {isNew && (
          <span className="absolute top-2 left-2 bg-blue-500 px-2 py-1 rounded text-sm">
            New
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-blue-200 mb-2">{author}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-sm text-blue-200">
            <span>{views} views</span>
            <span>{likes} likes</span>
          </div>
          <div className="flex space-x-2">
            <FiRepeat className="text-blue-200 hover:text-white transition-colors duration-300" />
            <FiHeart className="text-blue-200 hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};


interface ProjectCardNewProps {
  title: string;
  author: string;
}

function ProjectCardNew({ title, author }: ProjectCardNewProps){
  
  return (
    <div
    >
      <div className="relative">

      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-blue-200 mb-2">{author}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <FiRepeat className="text-blue-200 hover:text-white transition-colors duration-300" />
            <FiHeart className="text-blue-200 hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;
