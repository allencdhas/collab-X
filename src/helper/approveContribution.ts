import { createKintoSDK, KintoAccountInfo } from 'kinto-web-sdk';
import {
  encodeFunctionData, Address
} from 'viem';


const addressApp = "0x31bED6861814E0f715013cf451f538951B596634";

//import appABI from '../../public/abis/appAbi.json'
const kintoSDK = createKintoSDK(addressApp);
const collabxAddress = addressApp as Address;

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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "projectId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "contributionIndex",
				"type": "uint256"
			}
		],
		"name": "approveContribution",
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
				"internalType": "uint256",
				"name": "contributionIndex",
				"type": "uint256"
			}
		],
		"name": "ContributionApproved",
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
							},
							{
								"internalType": "bool",
								"name": "approval",
								"type": "bool"
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
							},
							{
								"internalType": "bool",
								"name": "approval",
								"type": "bool"
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
							},
							{
								"internalType": "bool",
								"name": "approval",
								"type": "bool"
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


  async function createContributionKinto() {

    async function fetchAccountInfo() {
        try {
          await kintoSDK.connect();
          console.log('Connected to Kinto');
        } catch (error) {
          console.error('Failed to fetch account info:', error);
        }
      };
    const data = encodeFunctionData({
      abi: collabxAbi,
      functionName: 'approveContribution',
      args: [1, 0],
    });
    try {
      await fetchAccountInfo();
      const response = await kintoSDK.sendTransaction([{ to: collabxAddress, data, value: BigInt(0) }]);
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }

  }

export default createContributionKinto;