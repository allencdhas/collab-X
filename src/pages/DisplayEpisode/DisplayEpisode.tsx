import React, { useState, useEffect } from "react";
//import video from "../../../public/FeverDreamSyndromeSheep.mp4";

interface EpisodeContent {
  type: "text" | "video";
  content: string;
}

interface Episode {
  id: number;
  title: string;
  author: string;
  contents: EpisodeContent[];
}

const mockEpisode: Episode = {
  id: 1,
  title: "Fever Dreams Syndrome: Human Desert",
  author: "Apocalypse Man",
  contents: [
    {
      type: "text",
      content:
`
There is no emotion in this world.  
*(A movie theater)*  
The future that those before us dreamed of never came.  
*(Domu)*  
More public, but certainly more sick.  
A sinking future.

Each person senses this in their own way as they go about their days.

An undefined anxiety.  
*(I don’t feel alive)*"`,
    },
    {
      type: "text",
      content:
       `
You might have nightmares.  
There’s no way to resist the system.  
*(What if it becomes a habit?)*  
We’re being conditioned to think in the short term.  
*(Emojis)*  
Yeah, I guess it doesn’t matter at all.

`   },

    {
      type: "video",
      content: "../../../FeverDreamSyndromeSheep.mp4",
    },
    {
      type: "text",
      content:
       `
I dream.  
There’s a single window.  
I realize I’m in a corner of a room in a town overlooking the sea.  
A woman, wearing the horns of a sheep on her head, looks sleepy and bored.  
Afraid of the silence, I open my mouth.

With no other choice, I start talking about myself.  
"It wasn’t even that long ago, but everything feels different.  
Still, of course, I don’t belong anywhere.  
My city is dying.  
It doesn’t matter what happens anymore, right?  
I should just go somewhere.  
Somewhere that's not here…"
`   },
    {
      type: "text",
      content:
      `
The sheep stood up.  
Her lower body was that of a beast.  
She wasn’t human.  
I felt relieved.

"Is that what you wanted?" she asked.  
I didn’t know.  
But if I stop, I feel like it’s the end.  
And it really is.  
A shadow is closing in,  
and I have to keep running.  
I…  
We have to.

`   },
    {
      type: "text",
      content:
        `Suddenly, something appears,  
breathing heavily.  
A sunset after school.  
Let’s go home.

A gunshot.

“Ah!”

They’re only taking pictures.  
I looked at myself through my own eyes, being watched by the entire world.  
Now, my eyes have been replicated and are seeing the world.  
*(It’s so bright)*

Because we have no choice but to keep living, right?  
Everyone’s desperate to survive.  
The first to strike wins, that’s the way it is.  
*(War)*  
*(Pillage)*  
*(Bullying)*  
*(Fish)*  
*(Women’s gossip)*

`    },
{
  type: "text",
  content:
    ` 


“Where is the hospital?”  
A boy drags a sheep along.  
They climb a mountain.  
They say, “The journey is what matters.”  
Because if you don’t find anything at the top,  
the despair waiting for you will be even worse.

So they keep climbing the mountain.

Ideals eventually turn into dead weights…  
A stone falls.

A woman looks down.

Alive.  
Good.
`    },
{
  type: "text",
  content:
    `

Or is this a corpse? (So thinks the corpse)

The dream of being embraced by the waves.

Ah, I remember now.  
I wanted to cry.  
For everything I’ve lost,  
and for everything I’m about to lose.  
Even if I understand it, can I accept it?

We weren’t born to judge others.  
But even so,  
I feel like I’ve made a wrong turn.  
If I don’t ask someone where to go, I’ll never know.  
Even though there are so many lost souls,  
each follows their own flickering light,  
never crossing paths.

Death.  
The thought strikes me.  
“What about you?”  
I…

“I haven’t given up yet.”  
There was the warm scent of a beast.  
I’m embraced and close my eyes.  
Ahhh—

I came from the desert,  
and I’ll return to the desert.  
When everyone loses the ability to speak,  

finally, we will find peaceful sleep.  

`    },
  ],
};

const DisplayEpisode: React.FC = () => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);

      const sections = document.querySelectorAll(".content-section");
      let newActiveSection = 0;
      sections.forEach((section, index) => {
        const rect = (section as HTMLElement).getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          newActiveSection = index;
        }
      });
      setActiveSection(newActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-gray-100 relative overflow-hidden">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-purple-200 z-50">
        <div
          className="h-full bg-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-purple-900 p-4 flex justify-between items-center z-40">
        <a href="./" className="text-2xl font-bold">
          CollabX
        </a>
        <nav className="flex items-center space-x-4">
          <a
            href="./"
            className="hover:text-purple-300 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/display"
            className="hover:text-purple-300 transition-colors duration-300"
          >
            Collaborate
          </a>
          <a
            href="./episode"
            className="hover:text-purple-300 transition-colors duration-300"
          >
            Read
          </a>
          <a
            href="./inspiration"
            className="hover:text-purple-300 transition-colors duration-300"
          >
            AI
          </a>
          <button className="bg-gradient-to-br from-purple-700 to-indigo-700 px-4 py-2 rounded hover:opacity-90 transition-opacity duration-300">
            Login
          </button>
        </nav>
      </header>

      <main className="pt-20 px-4 max-w-4xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-gray-800 to-purple-800 rounded-lg p-6 shadow-lg backdrop-blur-sm bg-opacity-80 mb-8">
          <h1 className="text-3xl font-bold text-purple-200 mb-2">
            {mockEpisode.title}
          </h1>
          <h2 className="text-xl text-indigo-200 mb-4">
            By {mockEpisode.author}
          </h2>
        </div>

        {mockEpisode.contents.map((content, index) => (
          <div
            key={index}
            className={`content-section mb-8 transition-all duration-500 ease-in-out ${
              index === activeSection
                ? "scale-105 opacity-100"
                : "scale-100 opacity-70"
            }`}
          >
            {content.type === "text" && (
              <p className="text-lg leading-relaxed">{content.content}</p>
            )}
            {content.type === "video" && (
              <video
                src={content.content}
                controls
                className="w-full h-auto rounded-lg shadow-lg"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </main>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-400 rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              animation: `float ${10 + Math.random() * 20}s linear infinite`,
            }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}
      </style>
    </div>
  );
};

export default DisplayEpisode;
