import { ethers } from "ethers";
import contractAbi from "../../public/abis/galadrielABI.json";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default async function galadrielHelper(aiPrompt: string) {
  const contractAddress = "0xd1fB2a15545032a8170370d7eC47C0FC69A00eed";
  const contractABI = contractAbi.abi;

  if (typeof window.ethereum === 'undefined') {
    throw new Error("Ethereum provider not found. Please install MetaMask or another Web3 wallet.");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const message = aiPrompt;
  console.log(`Image generation started with message: "${message}"`);

  try {
    const transactionResponse = await contract.initJob(message);
    const receipt = await transactionResponse.wait();
    console.log(`Transaction sent, hash: ${receipt.hash}\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}`);

    let jobId: number | undefined;

    for (const log of receipt.logs) {
      const parsedLog = contract.interface.parseLog(log as any);
      if (parsedLog && parsedLog.args[0]) {
        jobId = Number(parsedLog.args[0]);
        break;
      }
    }

    if (typeof jobId === 'undefined') {
      throw new Error("Failed to extract job ID from transaction logs");
    }

    console.log(`Job ID: ${jobId}`);

    let job = await contract.getJobDetails(jobId);
    console.log("Waiting for response: ");

    while (job.status.toString() === '0') {
      job = await contract.getJobDetails(jobId);
      //process.stdout.write(".");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before checking again
    }

    console.log("\nJob completed:");
    console.log({
      id: job.id.toString(),
      jobStatus: job.status.toString(),
      message: job.message,
      response: job.response,
    });

    console.log(`Image generation completed, image URL: ${job.response}`);
    return job.response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}