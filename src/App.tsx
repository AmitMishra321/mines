import { useEffect, useState } from 'react';
import { Volume2, MonitorSmartphone, Calendar, Share2, HelpCircle, Settings, Star, Heart, InfoIcon } from 'lucide-react';
import hoverAudio from "./assets/Sound/hover.wav";
import bombAudio from "./assets/Sound/diamond.wav";
import bombImage from "./assets/bomb.png";
import gemsImage from "./assets/gems.webp";
import INR from "./assets/INR.webp";




function App() {
  const [clickBock, setClickBlock] = useState<number[]>([]);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [mines, setMines] = useState<number>(4);
  const [gems, setGems] = useState<number>(24);
  const [bet, setBet] = useState<boolean>(false);
  const [bomb, setBombs] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);



  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }



  useEffect(() => {
    while (randomNumbers.length < mines) {
      let randomNumber: number = getRandomNumber(1, 25);
      if (!randomNumbers.includes(randomNumber)) {

        randomNumbers.push(randomNumber);
      }
    }
  }, [randomNumbers.length])

  function mouseMoveHandler() {
    if (bet) {
      const sound = new Audio(hoverAudio);
      sound.play();
    }
  }

  function clickHandler(index: number) {

    if (gameOver || !bet) return;
    let arr = [...clickBock];
    if (!clickBock.includes(index)) {
      if (!(randomNumbers.includes(index + 1))) {
        arr.push(index);
        const sound = new Audio(bombAudio);
        sound.play();
      } else {
        arr.push(index);
        setBet(false)
        setBombs(true);
        setGameOver(true)
      }
    }
    setClickBlock([...arr]);

  }



  function handleBetbutton() {
    setBet(true)
    setGameOver(false)
    setBombs(false)
    setClickBlock([])
    setRandomNumbers([])

  }



  function handleAutoPlay() {
    const autoPlayIndex: number = getRandomNumber(1, 25)
    if (clickBock.includes(autoPlayIndex)) {
      console.log("Already Clicked", autoPlayIndex);
      handleAutoPlay()
    } else {
      clickHandler(autoPlayIndex);
      return;
    }

  }
  return (
    <div className="min-h-screen bg-[#1a1d24] text-gray-200 ">
      {/* Main Container */}
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-1">
        {/* Left Panel - Controls */}
        <div className="p-2 lg:w-1/4 space-y-6 border-r border-[#2a2e35] pr-4">
          {/* Game Mode Toggle */}
          <div className=" rounded-lg p-2 flex  border-b border-[#2a2e35]">
            <button className="flex-1  py-2 rounded font-semibold  bg-gradient-to-r from-green-500 to-lime-500 hover:bg-green-600  ">Manual</button>
            <button className="flex-1 py-2 rounded text-gray-400">Auto</button>
          </div>

          {/* Amount Section */}
          <div className="bg-[#2a2e35] rounded-lg ">
            <div className=" rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-400 flex items-center align-center gap-1">Amount
                  <InfoIcon size={16} className='text-green-600' />
                </h3>
                {/* <span className="text-sm">≈0.001BCD</span> */}
              </div>

              <div className="flex items-center justify-between gap-2 bg-[#1a1d24]  rounded-lg px-2">
                <div className="flex items-center ">
                  <img src={INR}
                    alt="Currency"
                    className="w-5 h-5  " />
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    className="bg-transparent p-2 rounded w-24 text-right"
                  />
                </div>
                <div className="flex gap-1">
                  <button className="bg-[#1a1d24] px-3 py-1 rounded">1/2</button>
                  <button className="bg-[#1a1d24] px-3 py-1 rounded">2×</button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[10, 100, "1.0K", "10.0K"].map((value) => (
                  <button key={value} className="bg-[#1a1d24] py-2 rounded text-sm" onClick={() => setBetAmount(value === "1.0K" ? 1000 : value === "10.0K" ? 10000 : Number(value))} disabled>
                    {value}
                  </button>
                ))}
              </div>
              {/* </div> */}

              {/* Mines Section */}

              <h3 className="text-gray-400">Mines</h3>
              <div className="bg-[#1a1d24] p-2 rounded-lg w-full">
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={mines}
                  onChange={(e) => setMines(Number(e.target.value))}
                  className="w-full accent-green-500"
                  disabled={bet === true}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>{mines}</span>
                <span>24</span>
              </div>

              {/* Bet Button */}
              {!bet && (
                <button className="w-full bg-gradient-to-r from-green-500 to-lime-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold" onClick={handleBetbutton} >
                  Bet
                </button>
              )}
              {/* Gems */}
              {clickBock.length >= 1 && !gameOver &&
                <>
                  <h3 className="text-gray-400 flex items-center align-center gap-1">Gems

                  </h3>
                  <input type='number' value={(gems + 1) - Number(clickBock.length)} onChange={(e) => setGems(Number(e.target.value))} className="bg-[#1a1d24] p-2 rounded-lg w-full" />
                </>
              }

              {/* Auto Play */}
              {bet && (
                <button className="w-full bg-neutral-800 text-white py-3 rounded-lg font-semibold flex items-center justify-center" onClick={handleAutoPlay} >
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" className="relative top-[2px]"><path fill="currentColor" d="M8.427 6.68c-1.592.306-1.85.554-2.168 2.081-.318-1.527-.576-1.775-2.167-2.08 1.591-.306 1.85-.554 2.167-2.081.318 1.527.576 1.775 2.168 2.08m7.007-.221c-1.352-.864-1.715-.864-3.065 0 .9-1.298.9-1.646 0-2.943 1.352.864 1.714.864 3.065 0-.9 1.297-.9 1.646 0 2.943M8.38 15.488c-1.353-.864-1.715-.864-3.066 0 .9-1.298.9-1.646 0-2.942 1.353.864 1.715.864 3.066 0-.9 1.296-.9 1.646 0 2.942m11-4.676c-1.201-.77-1.528-.77-2.728 0 .801-1.154.801-1.467 0-2.62 1.202.77 1.528.77 2.728 0-.8 1.154-.8 1.466 0 2.62M10.469 9.194l-.416.4c-.459.44-.459 1.155 0 1.595l9.145 8.78c.459.44 1.203.44 1.662 0l.416-.4c.46-.44.46-1.155 0-1.596l-9.145-8.779a1.21 1.21 0 0 0-1.662 0"></path> <path fill="currentColor" d="m10.053 9.593.416-.399a1.2 1.2 0 0 1 .83-.33c.313 0 .612.118.832.33l1.247 1.197-2.078 1.995-1.247-1.197a1.1 1.1 0 0 1-.344-.798c0-.3.124-.586.344-.798"></path> </svg>
                  Pick a Tile Randomly
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Game Grid */}
        <div className="lg:w-3/4 min-h-[90vh] bg-hero-pattern bg-cover bg-center relative flex items-center justify-center">
          <div className=" rounded-lg p-4  w-[min(100%,600px)]">
            {/* <div className="text-center mb-6 text-gray-400 bg-[#2a2e35] p-4 rounded-lg">
              Game result will be displayed
            </div> */}

            <div className="grid grid-cols-5 gap-2">
              {Array(25).fill(null).map((_, i) =>
                <button
                  key={i}
                  className={`aspect-square rounded-lg transition-colors flex items-center justify-center cursor-pointer ${clickBock.includes(i) ? "bg-violet-600" : "bg-[#1a1d24]"}`
                  }
                  onClick={() => clickHandler(i)}
                  onMouseEnter={mouseMoveHandler}
                  disabled={clickBock.includes(i) || gameOver}
                >

                  {clickBock.includes(i) ? (
                    <img
                      src={randomNumbers.includes(i + 1) ? bombImage : gemsImage}
                      alt="icon"
                      height={90}
                      width={90}
                      className='opacity-100'

                    />
                  ) : gameOver ? (
                    <img
                      src={randomNumbers.includes(i + 1) ? bombImage : gemsImage}
                      alt="icon"
                      height={90}
                      width={90}
                      className='opacity-50'
                    />
                  ) : null}
                </button>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#2a2e35] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star size={16} />
              <span>21760</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={16} />
              <span>22171</span>
            </div>
            <Share2 size={16} />
          </div>

          <div className="flex items-center gap-4">
            <MonitorSmartphone size={16} />
            <Volume2 size={16} />
            <Calendar size={16} />
            <Settings size={16} />
            <HelpCircle size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;