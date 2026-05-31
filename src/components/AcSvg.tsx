import { useState, useEffect } from 'react';
import { Plus, Minus, Wind } from 'lucide-react';

export default function AcSvg() {
  const [temp, setTemp] = useState<number>(22);
  const [fanSpeed, setFanSpeed] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [mode, setMode] = useState<'Cool' | 'Eco' | 'Turbo'>('Cool');
  const [isOn, setIsOn] = useState<boolean>(true);

  // Cycle temperatures for ambient look if user doesn't touch it
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOn) {
      interval = setInterval(() => {
        // Subtle drift or change if not interacting
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isOn]);

  const handleTempAdjust = (amount: number) => {
    setIsOn(true);
    setTemp(prev => {
      const next = prev + amount;
      if (next < 16) return 16;
      if (next > 30) return 30;
      return next;
    });
  };

  // Determine LED dot colors
  const modeColor = mode === 'Cool' ? '#00e5ff' : mode === 'Eco' ? '#00ffaa' : '#ff4500';

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Interactive HUD Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md z-30">
        <button
          onClick={() => setIsOn(!isOn)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all uppercase duration-200 ${
            isOn
              ? 'bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/50 shadow-[0_0_10px_rgba(0,229,255,0.3)]'
              : 'bg-white/5 text-gray-500 border border-transparent'
          }`}
        >
          {isOn ? '🔌 ACTIVE' : '🔌 OFF'}
        </button>

        <div className="h-6 w-[1px] bg-white/10" />

        {/* Temp Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTempAdjust(-1)}
            disabled={!isOn}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00e5ff]/14 text-[#00e5ff] border border-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Decrease Temperature"
          >
            <Minus size={13} />
          </button>
          <span className="font-mono text-sm w-8 text-center text-[#b8f0ff] font-bold">
            {isOn ? `${temp}°C` : '--'}
          </span>
          <button
            onClick={() => handleTempAdjust(1)}
            disabled={!isOn}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00e5ff]/14 text-[#00e5ff] border border-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Increase Temperature"
          >
            <Plus size={13} />
          </button>
        </div>

        <div className="h-6 w-[1px] bg-white/10" />

        {/* Modes */}
        <div className="flex rounded-lg bg-black/40 p-1 border border-white/5">
          {(['Cool', 'Eco', 'Turbo'] as const).map(m => (
            <button
              key={m}
              onClick={() => {
                setIsOn(true);
                setMode(m);
              }}
              className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md uppercase transition-all duration-200 ${
                mode === m && isOn
                  ? m === 'Cool'
                    ? 'bg-[#00e5ff]/20 text-[#00e5ff]'
                    : m === 'Eco'
                    ? 'bg-[#00ffaa]/20 text-[#00ffaa]'
                    : 'bg-red-500/20 text-red-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="h-6 w-[1px] bg-white/10" />

        {/* Fan speed */}
        <div className="flex items-center gap-1">
          <Wind size={12} className="text-[#8a95aa]" />
          <button
            onClick={() => {
              setIsOn(true);
              setFanSpeed(prev => (prev === 'Low' ? 'Medium' : prev === 'Medium' ? 'High' : 'Low'));
            }}
            className="text-[10px] font-bold tracking-wider text-[#b8f0ff] uppercase bg-white/5 border border-white/10 hover:border-[#00e5ff]/30 px-2 py-1 rounded"
          >
            {fanSpeed} Fan
          </button>
        </div>
      </div>

      {/* Vector AC Unit Display */}
      <div className="relative pointer-events-none select-none">
        <svg
          className="mx-auto block drop-shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-transform duration-500 hover:scale-105"
          width="260"
          height="110"
          viewBox="0 0 260 110"
          fill="none"
        >
          {/* Neon back glow */}
          {isOn && (
            <rect
              x="6"
              y="14"
              width="248"
              height="78"
              rx="15"
              fill="rgba(0, 229, 255, 0.02)"
              filter="blur(4px)"
            />
          )}

          {/* Outer casing */}
          <rect
            x="6"
            y="14"
            width="248"
            height="78"
            rx="15"
            fill="rgba(4, 9, 15, 0.85)"
            stroke={isOn ? modeColor : 'rgba(255,255,255,0.15)'}
            strokeWidth="1.8"
            className="transition-all duration-500"
          />

          {/* Air inlet grille accents at the top */}
          <line x1="30" y1="22" x2="230" y2="22" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="30" y1="26" x2="230" y2="26" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

          {/* Inner operational panel */}
          <rect
            x="18"
            y="32"
            width="154"
            height="50"
            rx="8"
            fill="rgba(0,0,0,0.4)"
            stroke={isOn ? 'rgba(0,229,255,0.2)' : 'rgba(255,255,255,0.05)'}
            strokeWidth="1"
            className="transition-colors duration-500"
          />

          {/* Static design lines - venting grilles */}
          <line
            x1="26"
            y1="43"
            x2="164"
            y2="43"
            stroke={isOn ? '#00e5ff' : 'rgba(255,255,255,0.1)'}
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-50 transition-colors duration-500"
          />
          <line
            x1="26"
            y1="53"
            x2="164"
            y2="53"
            stroke={isOn ? '#00e5ff' : 'rgba(255,255,255,0.1)'}
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-50 transition-colors duration-500"
          />
          <line
            x1="26"
            y1="63"
            x2="164"
            y2="63"
            stroke={isOn ? '#00e5ff' : 'rgba(255,255,255,0.1)'}
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-50 transition-colors duration-500"
          />

          {/* Digital LED Display Panel */}
          <rect
            x="182"
            y="32"
            width="60"
            height="50"
            rx="8"
            fill={isOn ? 'rgba(0,229,255,0.1)' : 'rgba(0,0,0,0.6)'}
            stroke={isOn ? '#00e5ff' : 'rgba(255,255,255,0.1)'}
            strokeWidth="1.2"
            className="transition-all duration-500"
          />

          {/* Dynamic Temp Text on LED Display */}
          <text
            x="212"
            y="62"
            fontFamily="Orbitron, monospace"
            fontSize="17"
            fill={isOn ? modeColor : 'rgba(255,255,255,0.15)'}
            textAnchor="middle"
            fontWeight="bold"
            className="transition-colors duration-500"
          >
            {isOn ? `${temp}°C` : '──'}
          </text>

          {/* Mini mode indicator icons on LED panel */}
          {isOn && (
            <g>
              {/* LED Status 1 (Power Green) */}
              <circle cx="192" cy="41" r="3" fill="#00ffaa">
                <animate
                  attributeName="opacity"
                  values="1;0.4;1"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* LED Status 2 (Active Cyan/Orange) */}
              <circle cx="204" cy="41" r="3" fill={modeColor}>
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          )}

          {/* Wind icon indicator under LED */}
          {isOn && (
            <text x="212" y="76" fontSize="7" fill="#8a95aa" fontWeight="bold" textAnchor="middle">
              {fanSpeed.toUpperCase()} VENT
            </text>
          )}

          {/* Airflow waves animating down from unit */}
          {isOn && (
            <g className="transition-opacity duration-300">
              {/* Wave 1 */}
              <path
                d="M 30 96 Q 50 102 70 96 T 110 96 T 150 96 T 190 96 T 230 96"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="opacity-60"
              >
                <animate
                  attributeName="d"
                  values="M 30 96 Q 50 102 70 96 T 110 96 T 150 96 T 190 96 T 230 96;
                          M 30 96 Q 50 90 70 96 T 110 96 T 150 96 T 190 96 T 230 96;
                          M 30 96 Q 50 102 70 96 T 110 96 T 150 96 T 190 96 T 230 96"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke"
                  values="#00e5ff;#00ffaa;#00e5ff"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Wave 2 */}
              <path
                d="M 40 101 Q 60 104 80 101 T 120 101 T 160 101 T 200 101 T 220 101"
                fill="none"
                stroke="#b8f0ff"
                strokeWidth="1"
                strokeLinecap="round"
                className="opacity-40"
              >
                <animate
                  attributeName="d"
                  values="M 40 101 Q 60 97 80 101 T 120 101 T 160 101 T 200 101 T 220 101;
                          M 40 101 Q 60 105 80 101 T 120 101 T 160 101 T 200 101 T 220 101;
                          M 40 101 Q 60 97 80 101 T 120 101 T 160 101 T 200 101 T 220 101"
                  dur="1.6s"
                  begin="0.2s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
