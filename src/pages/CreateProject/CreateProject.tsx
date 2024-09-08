import React, { useState, useRef, ChangeEvent, useEffect } from 'react';

import { ethers } from 'ethers';


import sendLighthouse from 'helper/lighthouseUpload';
import createProjectKinto from 'helper/createProjectKinto';

import galadrielHelper from 'helper/galadrielHelper';



type Contributor = 'AI image/video generator' | 'artist' | 'marketer' | 'cartoonist' | 'sponsor' | 'animator' | 'musician' | 'open position';


interface CollabCard {
  contributors: Contributor[];
  description: string;
  reward: string;
}

export default function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [collabCard, setCollabCard] = useState<CollabCard>({
    contributors: [],
    description: '',
    reward: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contributorOptions: Contributor[] = [
    'AI image/video generator', 'artist', 'marketer', 'cartoonist', 
    'sponsor', 'animator', 'musician', 'open position',
  ];

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleContributorAdd = (contributor: Contributor) => {
    setCollabCard((prev) => ({
      ...prev,
      contributors: [...prev.contributors, contributor],
    }));
  };

  const handleContributorRemove = (contributor: Contributor) => {
    setCollabCard((prev) => ({
      ...prev,
      contributors: prev.contributors.filter((c) => c !== contributor),
    }));
  };

  const handleSubmit = () => {
    console.log({ title, description, image, aiPrompt, collabCard });
    // transaction call --> createProject(string memory uri, string memory _title)    
    const res =  sendLighthouse(title, description, collabCard.contributors, collabCard.reward);
    console.log(res);
    createProjectKint();
  
  };
  async function createProjectKint() {
    createProjectKinto("bafkreihumuu2xcqu5qd6ufhurhzcpb5bdyqyseibt4njsbiqf6d4erjll4", title);

  }

  async function galCall(aiPrompt: string) {
    const res = galadrielHelper(aiPrompt);
    
  }


  async function connectMetaMask(){
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const address = (await signer).address;
    console.log("Connected to MetaMask with address:", address);
  }
  
  useEffect(() => {
    connectMetaMask();
  });

  

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Header/NavBar */}
      <header className="flex justify-between items-center p-4 bg-gray-800">
    <a href='./'> <div className="text-2xl font-bold">CollabX</div></a>   
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
        <div className="flex items-center">
                <span className="mr-2">Ley</span>
                <div className="w-10 h-10 rounded-full bg-purple-500"></div>
              </div>
      </header>


      <div className="p-8 mx-auto  bg-gray-900 shadow-lg rounded-lg overflow-hidden">

        <div className="flex">
          <div className="w-1/2 p-8 bg-gray-900 text-white">

            <input
              type="text"
              placeholder="Project Title"
              className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Input short and sweet project description (200 words)!"
              className="w-full p-2 h-32 bg-gray-800 text-white rounded resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-1/2 p-8 bg-gray-200">
            <div className="flex justify-end mb-4">
              
            </div>
            <div
              className="border-2 border-dashed border-gray-400 rounded-lg p-4 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Uploaded" className="max-w-full h-auto" />
              ) : (
                <>
                  <span className="text-4xl">+</span>
                  <p>Upload image or video</p>
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*,video/*"
            />
            <p className="text-center my-4 text-gray-600">...Or ask AI agent to customize cover/copy/texts</p>
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-inner">
              <div className="flex-1 text-black">
                <input
                  type="text"
                  placeholder="Prompt"
                  className="w-full p-2 outline-none"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  
                />
              </div>
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-r-full"
                onClick={() => galCall(aiPrompt)}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
        <div className="p-8 bg-gray-900 text-white">
          <h2 className="text-xl font-semibold mb-4">
            Make Your Collab X Card (Initial contributors/support you need)
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Choose those talent who can scale up your contents to next level.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {collabCard.contributors.map((contributor, index) => (
              <div key={index} className="bg-gray-700 rounded-full px-3 py-1 flex items-center">
                <span>{contributor}</span>
                <button onClick={() => handleContributorRemove(contributor)} className="ml-2">
                  ✕
                </button>
              </div>
            ))}
            <select
              className="bg-gray-700 rounded-full px-3 py-1"
              onChange={(e) => handleContributorAdd(e.target.value as Contributor)}
              value=""
            >
              <option value="" disabled>Add contributor</option>
              {contributorOptions
                .filter((option) => !collabCard.contributors.includes(option))
                .map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Description</label>
              <textarea
                className="w-full p-2 bg-gray-800 rounded resize-none"
                value={collabCard.description}
                onChange={(e) => setCollabCard((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div>
              <label className="block mb-2">Reward</label>
              <textarea
                className="w-full p-2 bg-gray-800 rounded resize-none"
                value={collabCard.reward}
                onChange={(e) => setCollabCard((prev) => ({ ...prev, reward: e.target.value }))}
              />
            </div>
          </div>
          <div className="mt-8 text-center">
            <button
              className="bg-purple-500 text-white px-8 py-2 rounded-full"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
