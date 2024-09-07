import React, { useState, useEffect } from "react";
import {
  FiHeart,
  FiRepeat,
  FiMaximize2,
  FiX,
  FiCopy,
  FiUserPlus,
} from "react-icons/fi";


interface ProjectCardProps {
    
    title: string;
    author: string;
    image: string;
    //isNew: boolean;
    views: number;
    likes: number;
    //onExpand: (videoUrl: string) => void;
  }
  
const Projects: React.FC<ProjectCardProps> = ({
    title,
    author,
    image,
    //isNew,
    views,
    likes,
    //onExpand,
  }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div
        className="mt-4 bg-gradient-to-br from-blue-800 to-purple-700  rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {isHovered ? (
            <video
              src={image}
              className="w-full h-64 object-cover"
              autoPlay
              muted
              loop
            />
          ) : (
            <img src={image} alt={title} className="w-full h-64 object-cover" />
          )}
          {/* {isNew && (
            <span className="absolute top-2 left-2 bg-blue-500 px-2 py-1 rounded text-sm">
              New
            </span>
          )} */}
          <button
            className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm hover:bg-opacity-75 transition-colors duration-300"
            
          >
            <FiMaximize2 />
          </button>
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

  export default Projects;