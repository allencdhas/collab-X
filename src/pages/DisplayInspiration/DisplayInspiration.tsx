import React, { useState, useEffect } from 'react'

interface Story {
  id: number
  title: string
  author: string
  content: string[]
  image: string
}

const mockStories: Story[] = [
  {
    id: 1,
    title: "The Gift of Expectations",
    author: "Hector (O. Henry x Oscar Wilde)",
    content: [
      "In a small, trendy neighborhood, Emily and Noah were a couple deeply in love but struggling with the weight of modern life. Both were working their way up in creative fields—Emily as an illustrator, Noah as a musician—always chasing the next gig, paycheck, and opportunity. Their love was the one constant amid the chaos, but they each silently worried about how they were perceived by the other.",
      "Noah, sensitive to Emily's growing success, often felt he wasn't contributing enough. So, when their anniversary approached, he secretly picked up extra shifts at a coffee shop, determined to buy her a high-end digital tablet she had been dreaming of, believing it would help her with her artwork. Emily, meanwhile, knew Noah's guitar had seen better days and wanted to show her appreciation for his talent. She decided to sell her tablet—a prized tool of her trade—to buy him the custom guitar he had been eyeing for months.",
      "On their anniversary, they met at their favorite little cafe, both excited yet nervous. Noah handed Emily a carefully wrapped box, and when she opened it, her heart sank as she saw the brand-new tablet. She hesitated before giving him his gift, the custom guitar, knowing the twist that was about to unfold.",
      "The realization hit them both at once—Emily had no tablet to use, and Noah had no old guitar to play. They laughed, a little embarrassed, at the irony of their sacrifices, but beneath the humor was a quiet acknowledgment of how much they had misunderstood what the other truly wanted.",
      "The story ends not with regret, but with a moment of connection. They sit in the cafe, sipping their coffee, realizing that their desire to prove their worth to one another was unnecessary. What mattered wasn't the gifts, but their shared experiences, their creativity, and the fact that they had each put the other's dreams ahead of their own—without needing to."
    ],
    image: "/placeholder.svg?height=100&width=100"
  },
  // Add more mock stories here
]

const DisplayInspiration: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [currentStory, setCurrentStory] = useState<Story>(mockStories[0])
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    setCurrentStory(mockStories[0])

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadingProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
    {/* Reading progress bar */}
    <div className="fixed top-0 left-0 w-full h-1 bg-blue-200 z-50">
      <div 
        className="h-full bg-blue-500 transition-all duration-300 ease-out"
        style={{ width: `${readingProgress}%` }}
      />
    </div>

    {/* Combined Header and Navigation */}
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-purple-800 p-4 flex justify-between items-center z-40">
      <div className="flex items-center space-x-4">
      <a href='./'>
          <div className="text-2xl font-bold">CollabX</div>
        </a>
      </div>
   
    </header>
    
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-40 bg-gradient-to-r from-blue-900 to-purple-800">
        
      <a href='./'>
          <div className="text-2xl font-bold">CollabX</div>
        </a>
        <nav className="flex items-center space-x-4 z-10">
        <a href="./" className="hover:text-blue-300 transition-colors duration-300">Home</a>
        <a href="/display" className="hover:text-blue-300 transition-colors duration-300">Collaborate</a>
        <a href="./episode" className="hover:text-blue-300 transition-colors duration-300">Read</a>
        <a href="./inspiration" className="hover:text-blue-300 transition-colors duration-300">AI</a>
        <button className="bg-gradient-to-br from-purple-900 to-indigo-900 px-4 py-2 rounded hover:opacity-90 transition-opacity duration-300">
          Login
        </button>
        <button onClick={() => setIsNavOpen(!isNavOpen)} className="text-2xl hover:text-blue-300 transition-colors">
          ☰
        </button>
      </nav>
  
      </nav>

      <div className="pt-20 px-4 max-w-3xl mx-auto relative z-10 fade-in">
        <div className="bg-gradient-to-br from-blue-700 to-purple-700 rounded-lg p-6 shadow-lg backdrop-blur-sm bg-opacity-80">
          <div className="flex items-center mb-4">
            <img
              src={currentStory.image}
              alt="Author"
              className="w-16 h-16 rounded-full mr-4 border-2 border-blue-300"
            />
            <div>
              <h1 className="text-2xl font-bold text-blue-200">Model: {currentStory.author}</h1>
              <h2 className="text-xl text-purple-200">Title: {currentStory.title}</h2>
            </div>
          </div>
          {currentStory.content.map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 leading-relaxed text-gray-100 fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Snowflakes */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-200 opacity-70 snowflake"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${12 + Math.random() * 14}px`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-purple-900 to-blue-900 p-4 transform ${
          isNavOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button onClick={() => setIsNavOpen(false)} className="text-2xl mb-4 hover:text-blue-300 transition-colors">
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-blue-200">Story Collection</h2>
        <ul>
          {mockStories.map((story) => (
            <li key={story.id} className="mb-2">
              <button
                onClick={() => {
                  setCurrentStory(story)
                  setIsNavOpen(false)
                }}
                className="text-left hover:text-blue-300 transition-colors"
              >
                {story.title}
              </button>
            </li>
          ))}
        </ul>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
          Add New Story
        </button>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }
        .snowflake {
          animation: float linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default DisplayInspiration
