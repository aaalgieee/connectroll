import { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

const challenges = {
  1: {
    title: "💻 Digital Oops! & Learnings",
    description: "What's a funny or embarrassing digital mistake you've made (e.g., sending an email to the wrong person, a typo in a presentation), and what did you learn from it?",
    color: "bg-gradient-to-br from-indigo-800 to-indigo-950"
  },
  2: {
    title: "🎬 Problem Solving & Pop Culture",
    description: "Describe a tricky problem you solved recently (could be tech-related, or something like fixing a broken gadget or organizing an event), and if your life were a movie, what genre would it be?",
    color: "bg-gradient-to-br from-teal-800 to-teal-950"
  },
  3: {
    title: "� Future Visions & Fun Gadgets",
    description: "If you could invent any gadget or app, what would it do (no tech knowledge required!), and what's one emerging technology you're curious about?",
    color: "bg-gradient-to-br from-emerald-800 to-emerald-950"
  },
  4: {
    title: "🌐 Online Discoveries & Life Hacks",
    description: "What's the most surprisingly useful thing you've ever learned or found online (could be a life hack, a skill, or a funny video), and what's one simple 'hack' that makes your daily life easier?",
    color: "bg-gradient-to-br from-orange-800 to-orange-950"
  },
  5: {
    title: "🤝 Teamwork Tales & Dream Teams",
    description: "Share a time you worked well with a team to achieve something, and if you could build your ultimate dream team (for any project!), who would be on it (real or fictional)?",
    color: "bg-gradient-to-br from-rose-800 to-rose-950"
  },
  6: {
    title: "� Passion Projects & Playlists",
    description: "What's a personal project or hobby you're passionate about (tech or non-tech!), and what's a song or artist that always gets you motivated?",
    color: "bg-gradient-to-br from-violet-800 to-violet-950"
  }
}

const DiceIcon = ({ number, className }: { number: number; className?: string }) => {
  const emojis = {
    1: '⚀',
    2: '⚁',
    3: '⚂',
    4: '⚃',
    5: '⚄',
    6: '⚅'
  }
  return <span className={`${className} text-6xl`}>{emojis[number as keyof typeof emojis]}</span>
}

function App() {
  const [currentRoll, setCurrentRoll] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [showChallenge, setShowChallenge] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [timeLeft, setTimeLeft] = useState(90) // 1:30 in seconds
  const [timerActive, setTimerActive] = useState(false)

  const diceSpring = useSpring({
    transform: isRolling ? 'rotate(360deg) scale(1.2)' : 'rotate(0deg) scale(1)',
    config: { tension: 300, friction: 30 }
  })

  const challengeSpring = useSpring({
    opacity: showChallenge ? 1 : 0,
    transform: showChallenge ? 'translateY(0px)' : 'translateY(20px)',
    config: { tension: 200, friction: 20 }
  })

  const modalSpring = useSpring({
    opacity: showModal ? 1 : 0,
    transform: showModal ? 'scale(1)' : 'scale(0.9)',
    config: { tension: 300, friction: 25 }
  })

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setTimerActive(false)
      setShowModal(true) // Show exchange modal automatically when timer ends
    }
    return () => clearInterval(interval)
  }, [timerActive, timeLeft])

  const rollDice = () => {
    setIsRolling(true)
    setShowChallenge(false)
    setCurrentRoll(null)
    setTimerActive(false)
    setTimeLeft(90)

    setTimeout(() => {
      const newRoll = Math.floor(Math.random() * 6) + 1
      setCurrentRoll(newRoll)
      setIsRolling(false)
      
      setTimeout(() => {
        setShowChallenge(true)
        setTimerActive(true)
      }, 500)
    }, 1000)
  }

  const resetGame = () => {
    setCurrentRoll(null)
    setShowChallenge(false)
    setIsRolling(false)
    setShowModal(false)
    setTimerActive(false)
    setTimeLeft(90)
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-1 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-90 animate-gradientMove"
          style={{
            background: 'linear-gradient(120deg, #ff0066, #ff6600, #6600ff, #0066ff)',
            backgroundSize: '600% 600%'
          }}
        />
        {/* Animated floating shapes (smaller for compact) */}
        <div className="absolute top-1/4 left-1/3 w-10 h-10 rounded-full bg-pink-400/30 blur-lg animate-float1" />
        <div className="absolute top-2/3 right-1/4 w-12 h-12 rounded-full bg-purple-400/30 blur-lg animate-float2" />
        <div className="absolute bottom-1/4 left-1/5 w-8 h-8 rounded-full bg-blue-400/30 blur-lg animate-float3" />
        <div className="absolute top-1/2 right-1/2 w-14 h-14 rounded-full bg-orange-400/30 blur-lg animate-float4" />
      </div>
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientMove {
          animation: gradientMove 12s ease-in-out infinite;
        }
        @keyframes float1 {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-float1 {
          animation: float1 7s ease-in-out infinite;
        }
        @keyframes float2 {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(20px) scale(1.1); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-float2 {
          animation: float2 9s ease-in-out infinite;
        }
        @keyframes float3 {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(0.95); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-float3 {
          animation: float3 6s ease-in-out infinite;
        }
        @keyframes float4 {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(10px) scale(1.02); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-float4 {
          animation: float4 8s ease-in-out infinite;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .wiggle { animation: wiggle 2s ease-in-out infinite; }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-6 left-6 text-4xl opacity-30 animate-bounce wiggle" style={{ animationDelay: '0s' }}>🎲</div>
        <div className="absolute top-12 right-8 text-2xl opacity-25 animate-bounce" style={{ animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute bottom-10 left-10 text-3xl opacity-30 animate-bounce" style={{ animationDelay: '1s' }}>🎊</div>
        <div className="absolute bottom-16 right-6 text-xl opacity-25 animate-bounce wiggle" style={{ animationDelay: '1.5s' }}>🚀</div>
        <div className="absolute top-1/2 left-4 text-2xl opacity-20 animate-bounce" style={{ animationDelay: '2s' }}>🎯</div>
        <div className="absolute top-1/3 right-4 text-3xl opacity-25 animate-bounce" style={{ animationDelay: '2.5s' }}>🤝</div>
        <div className="absolute top-1/4 left-1/4 text-xl opacity-20 animate-bounce wiggle" style={{ animationDelay: '3s' }}>😎</div>
        <div className="absolute bottom-1/3 right-1/4 text-2xl opacity-25 animate-bounce" style={{ animationDelay: '3.5s' }}>🔥</div>
        <div className="absolute top-3/4 left-1/3 text-lg opacity-20 animate-bounce" style={{ animationDelay: '4s' }}>💯</div>
        <div className="absolute top-1/6 right-1/3 text-xl opacity-25 animate-bounce wiggle" style={{ animationDelay: '4.5s' }}>🤯</div>
      </div>
      <div className="max-w-md w-full space-y-2 relative z-10">
        <div className="text-center mb-2">
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="text-2xl animate-bounce">🎲</span>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">Connect & Roll</h1>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>🤝</span>
          </div>
          <p className="text-white/90 text-base font-medium mb-1">
            Roll the dice to discover your next challenge! 🚀✨
          </p>
          <p className="text-white/80 text-xs">
            "This is where the fun begins!" - Anakin Skywalker 😄
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-center border border-white/30 shadow-xl">
          <animated.div
            style={diceSpring}
            className="flex justify-center mb-2"
          >
            {currentRoll ? (
              <div className="relative">
                <DiceIcon 
                  number={currentRoll} 
                  className="w-12 h-12 text-white drop-shadow-2xl" 
                />
                <div className="absolute -top-1 -right-1 text-lg animate-bounce">✨</div>
              </div>
            ) : (
              <div className="w-12 h-12 border-2 border-dashed border-white/50 rounded-xl flex items-center justify-center bg-white/10">
                <span className="text-white/70 text-2xl animate-pulse">❓</span>
              </div>
            )}
          </animated.div>
          <button
            onClick={rollDice}
            disabled={isRolling}
            className={`
              w-full py-2 px-3 rounded-xl font-semibold text-base
              transition-all duration-300 transform
              ${isRolling 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 active:scale-95'
              }
              text-white shadow-lg hover:shadow-xl
            `}
          >
            {isRolling ? (
              <div className="flex items-center justify-center gap-1">
                <span className="text-xl animate-spin">🎲</span>
                Rolling... "Let's gooo!" 🔥
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1">
                <span className="text-xl">🎲</span>
                Roll the Dice! "Just do it!" ✨
                <span className="text-xl">🎲</span>
              </div>
            )}
          </button>
        </div>
        {currentRoll && (
          <animated.div
            style={challengeSpring}
            className={`
              ${challenges[currentRoll as keyof typeof challenges].color}
              rounded-2xl p-3 text-white shadow-xl mt-2
            `}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold">
                {challenges[currentRoll as keyof typeof challenges].title}
              </h2>
              <div className="flex items-center gap-1">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
                  <span className="text-base">⏰</span>
                  <span className="text-xs font-medium">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="bg-white/20 rounded-full p-1">
                  <DiceIcon number={currentRoll} className="w-4 h-4" />
                </div>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed mb-2 text-xs">
              {challenges[currentRoll as keyof typeof challenges].description}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-2 px-3 bg-white/90 hover:bg-white text-black rounded-lg font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:rotate-1"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>✅ Complete & Connect</span>
                  <span className="text-lg animate-bounce">🤝</span>
                  <span className="text-xs">POGGERS! 🎉</span>
                </div>
              </button>
            </div>
          </animated.div>
        )}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 text-center border border-white/30 shadow-xl mt-2">
          <p className="text-white/90 text-xs font-medium mb-0.5">
            🎯 Complete the challenge with your partner, then find someone new to roll with! 🔄✨
          </p>
          <p className="text-white/80 text-xs">
            "Teamwork makes the dream work!" 💪 No cap! 🧢
          </p>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-1 z-50">
          <animated.div
            style={modalSpring}
            className="bg-white rounded-2xl p-3 max-w-xs w-full mx-2 shadow-2xl border-2 border-purple-200"
          >
            <div className="text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Challenge Complete! 🎊 "That's what I'm talking about!" 🔥
              </h3>
              <p className="text-gray-600 mb-2 text-xs">
                Great job completing the challenge together! 🌟 Now it's time to find your next partner! 🚀 
                <br />
                <span className="text-xs italic">"This is the way!" 😎</span>
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setShowModal(false)
                    resetGame()
                  }}
                  className="w-full py-1 px-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:-rotate-1 text-xs"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>🔍 Find New Partner</span>
                  </div>
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-1 px-2 text-gray-500 hover:text-gray-700 font-medium transition-colors hover:bg-gray-100 rounded-lg text-xs"
                >
                  💬 Continue This Challenge
                </button>
              </div>
            </div>
          </animated.div>
        </div>
      )}
    </div>
  )
}


export default App