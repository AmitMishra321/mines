import { useState } from 'react';
import { Volume2, MonitorSmartphone, Calendar, Share2, HelpCircle, Settings, Star, Heart, InfoIcon } from 'lucide-react';
import hoverAudio from "./assets/Sound/hover.wav";
import bombAudio from "./assets/Sound/gold.wav";
import bombImage from "./assets/bomb.png";
import gemsImage from "./assets/gems.webp";
function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let randomNumbers: number[] = [];

while (randomNumbers.length < 4) {
  let randomNumber: number = getRandomNumber(1, 25);
  if (!randomNumbers.includes(randomNumber)) {
    randomNumbers.push(randomNumber);
  }
}

// console.log(randomNumbers);
function App() {
  const [clickBock, setClickBlock] = useState<number[]>([]);
  const [betAmount, setBetAmount] = useState<number>(0.01);
  const [mines, setMines] = useState<number>(1);
  const [bomb, setBombs] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);



  function mouseMoveHandler() {
    if (mines > 1) {
      const sound = new Audio(hoverAudio);
      sound.play();
    }
  }

  function clickHandler(index: number) {
    if (gameOver) return;
    let arr = [...clickBock];
    // if (!clickBock.includes(index)) {
    if (!(randomNumbers.includes(index + 1))) {
      arr.push(index);
      const sound = new Audio(bombAudio);
      sound.play();
    } else {
    
      arr.push(index);
      setBombs(true);
      setGameOver(true)
    }
    setClickBlock([...arr]);

  }


  // console.log(clickBock);

  function handleBetbutton() {
    setGameOver(false)
    setBombs(false)
    setMines(1)
    setClickBlock([])
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
          <div className="bg-[#2a2e35] rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-400 flex items-center align-center gap-1">Amount
                <InfoIcon size={16} />
              </h3>
              <span className="text-sm">≈0.001BCD</span>
            </div>

            <div className="flex items-center justify-between gap-2 bg-[#1a1d24]  rounded-lg px-2">
              <div className="flex items-center ">
                <img src="src\assets\INR.webp"
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
                <button key={value} className="bg-[#1a1d24] py-2 rounded text-sm">
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* Mines Section */}
          <div className="bg-[#2a2e35] rounded-lg p-4 space-y-4">
            <h3 className="text-gray-400">Mines</h3>
            <input
              type="range"
              min="1"
              max="24"
              value={mines}
              onChange={(e) => setMines(Number(e.target.value))}
              className="w-full accent-green-500"
            />
            <div className="flex justify-between text-sm">
              <span>{mines}</span>
              <span>24</span>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-green-500 to-lime-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold" onClick={handleBetbutton}>
            Bet
          </button>
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