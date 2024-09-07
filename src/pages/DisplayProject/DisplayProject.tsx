import React, { useState, useRef } from 'react'

type ContributorRole = 'Cartoonist' | 'AI generator' | 'Marketer'

interface Episode {
  id: number
  title: string
  isNew?: boolean
}

interface ContributionModalProps {
  isOpen: boolean
  onClose: () => void
  role: ContributorRole
  reward: string
  onSubmit: (file: File) => void
}

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ContributionCard {
  id: number
  title: string
  contributor: string
  image: string
}

const ContributionModal: React.FC<ContributionModalProps> = ({ isOpen, onClose, role, reward, onSubmit }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
      onSubmit(fileInputRef.current.files[0])
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-white">Contribute as {role}</h2>
        <p className="mb-4 text-gray-300">Reward: {reward}</p>
        <form onSubmit={handleSubmit}>
          <input type="file" ref={fileInputRef} className="mb-4 text-white" />
          <button type="submit" className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white px-4 py-2 rounded hover:opacity-90">
            Submit
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-400 hover:text-white">Close</button>
      </div>
    </div>
  )
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-white">Make a Donation</h2>
        <form onSubmit={(e) => { e.preventDefault(); console.log('Donation submitted'); onClose(); }}>
          <input type="number" placeholder="Amount" className="mb-4 p-2 w-full rounded" />
          <select className="mb-4 p-2 w-full rounded">
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Crypto</option>
          </select>
          <button type="submit" className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white px-4 py-2 rounded hover:opacity-90">
            Finalize Donation
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-400 hover:text-white">Close</button>
      </div>
    </div>
  )
}

export default function LostCityPage() {
  const [selectedRole, setSelectedRole] = useState<ContributorRole | null>(null)
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)
  const [contributionCards, setContributionCards] = useState<ContributionCard[]>([
    { id: 1, title: 'Character Design', contributor: 'John Doe', image: '/placeholder.svg?height=200&width=200' },
  ])

  const episodes: Episode[] = [
    { id: 1, title: 'Episode 1' },
    { id: 2, title: 'Episode 2' },
    { id: 3, title: 'Episode 3', isNew: true },
  ]

  const handleWatchNow = () => {
    console.log('Navigating to watch page')
    // Implement your navigation logic here
  }

  const handleEpisodeClick = (episodeId: number) => {
    console.log(`Navigating to episode ${episodeId}`)
    // Implement your navigation logic here
  }

  const handleContributorClick = (role: ContributorRole) => {
    setSelectedRole(role)
    setIsContributionModalOpen(true)
  }

  const handleApprove = (id: number) => {
    console.log(`Approved contribution ${id}`)
    // Implement your approval logic here
  }

  const handleDisapprove = (id: number) => {
    console.log(`Disapproved contribution ${id}`)
    // Implement your disapproval logic here
  }

  const handleContributionSubmit = (file: File) => {
    const newCard: ContributionCard = {
      id: Date.now(),
      title: `New Contribution`,
      contributor: 'You',
      image: URL.createObjectURL(file),
    }
    setContributionCards(prevCards => [newCard, ...prevCards])
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <a href='./'> <div className="text-2xl font-bold">CollabX</div></a>
        <nav className="space-x-4">
          {['Home', 'Collaborate', 'Funding', 'Join CollabX Team'].map((item) => (
            <a
              href="#"
              key={item}
              className="hover:text-purple-400 transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>
        <button className="bg-gradient-to-br from-purple-900  to-indigo-900 px-4 py-2 rounded hover:opacity-90 transition-opacity duration-300">
          Login
        </button>
      </header>

      <main className="mx-auto p-16 overflow-hidden">
        <div className="mb-8 relative ">
          <img
            src="/placeholder.svg?height=256&width=1024"
            alt="Lost City"
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4">
            <h1 className="text-4xl font-bold mb-2">LOST CITY</h1>
            <p className="mb-4">Initiating Your Journey..</p>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleWatchNow}
                className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white px-6 py-2 rounded-full hover:opacity-90"
              >
                Watch Now
              </button>
              <button
                onClick={() => setIsDonationModalOpen(true)}
                className="text-2xl hover:text-purple-400"
              >
                🤍
              </button>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 text-sm">
            image powered by Galadriel
          </div>
        </div>

        <div className="mb-8">
          <button className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white px-4 py-2 rounded hover:opacity-90">
            Apply for Collab X
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <button className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white px-4 py-2 rounded hover:opacity-90">Comics</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">Visual Novel</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">Animation</button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">Music</button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {episodes.map((episode) => (
            <button
              key={episode.id}
              onClick={() => handleEpisodeClick(episode.id)}
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 relative"
            >
              {episode.title}
              {episode.isNew && (
                <span className="absolute top-0 right-0 bg-purple-600 text-xs px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="bg-gray-800 p-4 rounded-lg mb-8">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <button
              onClick={() => handleContributorClick('Cartoonist')}
              className={`p-2 rounded ${selectedRole === 'Cartoonist' ? 'bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900' : 'bg-gray-700'} hover:opacity-90`}
            >
              Cartoonist
            </button>
            <button
              onClick={() => handleContributorClick('AI generator')}
              className={`p-2 rounded ${selectedRole === 'AI generator' ? 'bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900' : 'bg-gray-700'} hover:opacity-90`}
            >
              AI generator
            </button>
            <button
              onClick={() => handleContributorClick('Marketer')}
              className={`p-2 rounded ${selectedRole === 'Marketer' ? 'bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900' : 'bg-gray-700'} hover:opacity-90`}
            >
              Marketer
            </button>
          </div>
          <div className="text-sm mb-2">
            Mission: Cartoonist role is something something something
          </div>
          <div className="text-sm mb-4">
            Reward: NFT / Ownership / Name Credit
          </div>
          <button
            onClick={() => setIsContributionModalOpen(true)}
            className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white px-4 py-2 rounded hover:opacity-90"
          >
            Contribute
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Contributions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contributionCards.map((card) => (
              <div key={card.id} className="bg-gray-700 p-4 rounded-lg">
                <img src={card.image} alt={card.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm mb-4">By {card.contributor}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleApprove(card.id)}
                    className="bg-gradient-to-br from-blue-900 to-purple-800  text-white px-3 py-1 rounded hover:opacity-90"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDisapprove(card.id)}
                    className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Disapprove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => setIsContributionModalOpen(false)}
        role={selectedRole || 'Cartoonist'}
        reward="NFT / Ownership / Name Credit"
        onSubmit={handleContributionSubmit}
      />

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </div>
  )
}