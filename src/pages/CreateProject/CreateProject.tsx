import React, { useState } from 'react';

function CreateProject() {
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [reward, setReward] = useState<string>('');
  const [imageOrVideo, setImageOrVideo] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectDescription(e.target.value);
  };

  const handleRewardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReward(e.target.value);
  };

  const handleImageOrVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageOrVideo(e.target.value);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Project Description:', projectDescription);
    console.log('Reward:', reward);
    console.log('Image or Video:', imageOrVideo);
    console.log('Prompt:', prompt);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CollabX</h1>
        <h2 className="text-2xl font-bold">Project Title</h2>
        <p className="text-gray-400">Input short and sweet project description (200 words)!</p>
      </header>
      <main className="w-full max-w-xl">
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4">Make Your ColabX Card (Initial contributors/support you need)</h3>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Description"
              className="bg-gray-800 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleDescriptionChange}
            />
            <input
              type="text"
              placeholder="Reward"
              className="bg-gray-800 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleRewardChange}
            />
          </div>
        </section>
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4">Upload image or video</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center bg-gray-800 rounded-md px-4 py-2">
              <input
                type="text"
                placeholder="Image or Video"
                className="flex-1 bg-transparent focus:outline-none"
                onChange={handleImageOrVideoChange}
              />
              <button className="text-blue-500 hover:text-blue-400 focus:outline-none">+</button>
            </div>
            <p className="text-gray-400">...Or ask AI agent to customize cover/copy/texts</p>
            <div className="flex items-center bg-gray-800 rounded-md px-4 py-2">
              <input
                type="text"
                placeholder="Prompt"
                className="flex-1 bg-transparent focus:outline-none"
                onChange={handlePromptChange}
              />
              <button className="text-purple-500 hover:text-purple-400 focus:outline-none">Generate</button>
            </div>
          </div>
        </section>
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </main>
    </div>
  );
};

export default CreateProject;