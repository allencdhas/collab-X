import { createKintoSDK, KintoAccountInfo } from 'kinto-web-sdk';
import {
  encodeFunctionData, Address
} from 'viem';

//import appABI from '../../public/abis/appAbi.json'
const kintoSDK = createKintoSDK('0x40Fe1CB9fC88220553EA3bE4ff866Ea83a2fa2B8');
const collabxAddress = "0x40Fe1CB9fC88220553EA3bE4ff866Ea83a2fa2B8" as Address;

const appABI = [
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
      abi: appABI,
      functionName: 'addContribution',
      args: [1, "bafkreihrqsyazdbnxkdpulhsfgbo6zvfci4746yhspcb3svwzejdhcy6hm"],
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