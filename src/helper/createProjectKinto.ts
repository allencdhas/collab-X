import { createKintoSDK, KintoAccountInfo } from 'kinto-web-sdk';
import {
  encodeFunctionData, Address, getContract,
  defineChain, createPublicClient, http, parseAbi
} from 'viem';

import appABI from '../../public/abis/appAbi.json'
const kintoSDK = createKintoSDK('0x32F237f3b0BE5B5e19A756b187C0EB89926f61a3');
const collabxAddress = "0x32F237f3b0BE5B5e19A756b187C0EB89926f61a3" as Address;


  async function createProjectKinto(uri:string, title:string) {
    async function fetchAccountInfo() {
        try {
          await kintoSDK.connect();
          console.log('Connected to Kinto');
        } catch (error) {
          console.error('Failed to fetch account info:', error);
        }
      };
    const data = encodeFunctionData({
      abi: appABI.abi,
      functionName: 'createProject',
      args: [uri, title],
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

export default createProjectKinto;