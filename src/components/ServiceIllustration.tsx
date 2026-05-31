import {
  Wrench,
  Flame,
  Droplet,
  Zap,
  Cpu,
  Home,
  Wind,
  Fan,
  Gauge,
  Thermometer,
  Disc,
  Filter,
  ShieldCheck,
  RefreshCw,
  Hammer,
  MapPin,
  Truck
} from 'lucide-react';

interface IllustrationProps {
  id: string;
}

// Warm soft technical grid pattern background
function RealCityGrid() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 pointer-events-none" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="realgrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#realgrid)" />
      </svg>
      {/* Dynamic dust particles floating in the breeze */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-sky-400 rounded-full blur-[1px] animate-pulse" />
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-teal-400 rounded-full blur-[0.5px] animate-pulse delay-300" />
        <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-indigo-500 rounded-full blur-[2px] animate-pulse delay-500" />
      </div>
    </>
  );
}

export function ServiceIllustration({ id }: IllustrationProps) {
  switch (id) {
    case 'srv-install':
      // Realistic White Split Indoor AC Unit with metallic highlights and blue cooling air streams
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <RealCityGrid />
          <div className="relative flex flex-col items-center justify-center z-10 w-full px-4">
            
            {/* The Wall Shadow / Mounting plate border preview */}
            <div className="absolute w-[210px] h-[75px] bg-sky-500/10 rounded-lg blur-lg transform -translate-y-2" />

            {/* Solid Shaded Realistic AC Unit */}
            <div className="relative w-[190px] h-[65px] bg-gradient-to-b from-white via-slate-100 to-slate-200 rounded-lg border-b-[4px] border-slate-300 shadow-[0_12px_24px_rgba(0,0,0,0.35)] flex flex-col justify-between p-2 transform hover:scale-[1.03] transition-transform duration-300">
              
              {/* Glossy Reflection Highlight */}
              <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white/60 to-transparent rounded-t-lg pointer-events-none" />

              {/* Upper Intake Air Grille Details */}
              <div className="flex gap-1.5 justify-center w-full px-2 opacity-30">
                <span className="h-1 flex-1 bg-slate-600 rounded-full" />
                <span className="h-1 flex-1 bg-slate-600 rounded-full" />
                <span className="h-1 flex-1 bg-slate-600 rounded-full" />
                <span className="h-1 flex-1 bg-slate-600 rounded-full" />
                <span className="h-1 flex-1 bg-slate-600 rounded-full" />
                <span className="h-1 flex-1 bg-slate-600 rounded-full" />
              </div>

              {/* Middle Section: Logo, Status Display and Sleek Curves */}
              <div className="flex justify-between items-end px-1 mt-1">
                {/* Brand Logo Placeholder */}
                <span className="text-[5px] font-sans font-bold text-slate-400 tracking-widest flex items-center gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  KRYO-TECH
                </span>

                {/* Dark Glass LED Temperature & Stat Display Screen */}
                <div className="bg-slate-900 border border-slate-700/80 rounded-md py-0.5 px-2.5 flex items-center gap-1.5 shadow-inner">
                  <div className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[7px] font-mono font-bold text-cyan-400 tracking-wider">18°C</span>
                  <span className="text-[5px] font-mono text-slate-500">AUTO</span>
                </div>
              </div>

              {/* Lower Flap (Louver) Open Action */}
              <div className="w-full h-2 bg-slate-200 border-t border-slate-300/80 rounded-b px-2 flex justify-between items-center mt-1">
                <div className="w-full h-[3px] bg-slate-400/50 rounded-full overflow-hidden">
                  {/* Subtle sweep motor */}
                  <div className="h-full bg-cyan-400 w-1/3 rounded-full animate-[scroll_4s_linear_infinite]" />
                </div>
              </div>
            </div>

            {/* Glowing cool breeze downward stream curves */}
            <div className="relative mt-3 flex justify-around w-[140px] px-4 pointer-events-none select-none h-11">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 140 44" fill="none">
                <path d="M 20 0 Q 30 20, 10 44" stroke="url(#blueGrad)" strokeWidth="2.5" strokeLinecap="round" className="animate-[pulse_1.5s_infinite]" />
                <path d="M 50 0 Q 50 25, 60 44" stroke="url(#cyanGrad)" strokeWidth="3" strokeLinecap="round" className="animate-[pulse_2s_infinite_alternate]" />
                <path d="M 80 0 Q 75 15, 90 44" stroke="url(#cyanGrad)" strokeWidth="2" strokeLinecap="round" className="animate-[pulse_1.8s_infinite]" />
                <path d="M 120 0 Q 110 20, 130 44" stroke="url(#blueGrad)" strokeWidth="2.5" strokeLinecap="round" className="animate-[pulse_2.2s_infinite_alternate]" />
                <defs>
                  <linearGradient id="blueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      );

    case 'srv-repair':
      // Detailed Yellow/Black Pro Mechanic System Tool Chest & Chrome Wrench Setup
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <RealCityGrid />
          <div className="relative flex flex-col items-center justify-center z-10 space-y-3">
            <div className="relative flex items-center justify-center">
              {/* Spinning circular measurement dial behind tool set */}
              <div className="absolute w-28 h-28 border border-slate-700 rounded-full bg-slate-900/35 flex items-center justify-center">
                <div className="w-[100px] h-[100px] border border-dashed border-cyan-500/30 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-24 h-24 border border-teal-500/10 rounded-full" />
              </div>

              {/* Realistic Heavy-Duty Toolbox Container */}
              <div className="relative z-10 w-24 h-16 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 rounded-lg p-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.45)] border-t border-amber-300">
                {/* Metallic lock latches */}
                <div className="absolute top-1 left-4 w-3.5 h-1.5 bg-gradient-to-b from-slate-200 to-slate-400 rounded-sm border border-slate-500" />
                <div className="absolute top-1 right-4 w-3.5 h-1.5 bg-gradient-to-b from-slate-200 to-slate-400 rounded-sm border border-slate-500" />
                
                {/* Heavy black handle */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-2 border-2 border-slate-900 bg-slate-800 rounded-t-sm" />

                {/* Toolbox interior storage representation */}
                <div className="w-full h-full bg-slate-900 rounded border border-amber-800 p-1 flex justify-around items-end">
                  {/* Hammer head */}
                  <div className="w-3 h-7 bg-slate-600 rounded-t-xs border-r border-slate-400 transform -rotate-12 flex flex-col justify-end">
                    <div className="h-5 w-1 bg-amber-800 mx-auto" />
                  </div>
                  {/* Screwdriver handle */}
                  <div className="w-2.5 h-9 bg-red-600 rounded-t-full border-r border-red-800 flex flex-col items-center justify-start py-0.5">
                    <span className="w-1 h-3 bg-slate-500" />
                  </div>
                  {/* Spray Clean Can */}
                  <div className="w-3.5 h-10 bg-gradient-to-r from-blue-300 to-blue-500 rounded relative">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-red-500 rounded-t-full" />
                    <span className="text-[4px] font-bold text-white text-center block mt-2">WD</span>
                  </div>
                </div>
              </div>

              {/* Floating shiny chrome professional Spanner/Wrench */}
              <div className="absolute z-20 w-16 h-16 transform rotate-45 hover:scale-110 transition-transform duration-300 -top-3 -right-3 animate-[bounce_2s_infinite_alternate]">
                <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]">
                  {/* Detailed chrome double-ended wrench */}
                  <path d="M 8 52 L 52 8 M 6 54 Q 3 51, 8 46 L 14 40 L 24 44 Z" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" fill="none" />
                  {/* Wrench Jaw details */}
                  <circle cx="51" cy="11" r="7" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2.5" />
                  <rect x="47" y="7" width="8" height="6.5" transform="rotate(45 51 11)" fill="#0f172a" />
                  <circle cx="11" cy="51" r="7" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2.5" />
                  <rect x="7" y="47" width="8" height="6.5" transform="rotate(45 11 51)" fill="#0f172a" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );

    case 'srv-gas':
      // High-Fidelity Manifold Dual Pressure Gauge Set with colorful pressure hoses
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <RealCityGrid />
          <div className="relative flex flex-col items-center justify-center z-10">
            
            {/* The Brass block body and pipes connector */}
            <div className="relative flex flex-col items-center mt-3">
              
              {/* Gauges row */}
              <div className="flex gap-2 items-center relative z-20">
                
                {/* 1. HIGH PRESSURE REGISTER DIAL (Red/Crimson) */}
                <div className="relative w-12 h-12 border border-red-600 bg-slate-950 rounded-full flex flex-col items-center justify-center shadow-[0_4px_10px_rgba(239,68,68,0.25)]">
                  {/* Cover reflection glass gloss */}
                  <div className="absolute inset-0.5 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-full pointer-events-none" />
                  {/* Dial ticking markings scale */}
                  <div className="absolute inset-1 border border-dashed border-red-500/20 rounded-full" />
                  {/* Meter Needle */}
                  <div className="w-[1.5px] h-5 bg-red-500 origin-bottom rounded-full -mt-2 transform rotate-[40deg] animate-[pulse_2s_infinite]" style={{ transformOrigin: 'center 85%' }} />
                  {/* Center pin node */}
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 border border-slate-600 z-10" />
                  <span className="text-[5px] font-mono font-bold text-red-500 mt-0.5 z-10">HI PSI</span>
                </div>

                {/* Middle Support Hanging Hook */}
                <div className="w-2.5 h-6 border-t border-x border-slate-500 rounded-t-sm -mt-10 bg-slate-900/50 flex items-center justify-center">
                  <div className="w-0.5 h-4 bg-slate-400 rounded-full" />
                </div>

                {/* 2. LOW PRESSURE REGISTER DIAL (Cool Electric Blue) */}
                <div className="relative w-12 h-12 border border-sky-500 bg-slate-950 rounded-full flex flex-col items-center justify-center shadow-[0_4px_10px_rgba(14,165,233,0.25)]">
                  {/* Cover reflection glass gloss */}
                  <div className="absolute inset-0.5 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-full pointer-events-none" />
                  {/* Dial ticking markings scale */}
                  <div className="absolute inset-1 border border-dashed border-sky-500/20 rounded-full" />
                  {/* Meter Needle */}
                  <div className="w-[1.5px] h-5 bg-sky-400 origin-bottom rounded-full -mt-2 transform -rotate-[30deg] animate-[pulse_1.5s_infinite]" style={{ transformOrigin: 'center 85%' }} />
                  {/* Center pin node */}
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 border border-slate-600 z-10" />
                  <span className="text-[5px] font-mono font-bold text-sky-400 mt-0.5 z-10">LO PSI</span>
                </div>
              </div>

              {/* Brass blocks, valves and hose connectors beneath gauges */}
              <div className="relative w-22 h-4.5 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 border-y border-amber-400 rounded-sm -mt-1.5 flex justify-between px-3 z-10">
                {/* Valve turn handles */}
                <div className="w-2.5 h-2.5 bg-red-600 rounded-sm border border-red-800 -left-1 relative -bottom-1 rotate-45 shadow shadow-black flex items-center justify-center">
                  <div className="w-0.5 h-1.5 bg-white" />
                </div>
                <div className="w-2.5 h-2.5 bg-sky-500 rounded-sm border border-sky-800 -right-1 relative -bottom-1 rotate-12 shadow shadow-black flex items-center justify-center">
                  <div className="w-0.5 h-1.5 bg-white" />
                </div>
              </div>

              {/* Three detailed rubber charging hoses hanging down */}
              <div className="flex gap-2.5 -mt-0.5 w-20 justify-center">
                {/* Red Hose */}
                <div className="w-1.5 h-10 bg-gradient-to-b from-red-600 to-transparent rounded-full shadow shadow-black/40" />
                {/* Yellow Service Recovery Hose */}
                <div className="w-1.5 h-12 bg-gradient-to-b from-yellow-500 to-transparent rounded-full shadow shadow-black/40" />
                {/* Blue Coolant Supply Hose */}
                <div className="w-1.5 h-10 bg-gradient-to-b from-sky-500 to-transparent rounded-full shadow shadow-black/40" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'srv-home':
      // Realistic Front Door, Porch Steps with GPS Location drop pin and rapid tech van arrival
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <RealCityGrid />
          <div className="relative flex items-center justify-center z-10 w-full h-full p-2">
            
            {/* House Wall Front Facade */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-[#070b13] flex items-center justify-center" />

            {/* Door Frame & Door */}
            <div className="relative w-[70px] h-[100px] bg-[#1a2333] border-t-4 border-x-4 border-[#2b3c58] rounded-t-sm shadow-[0_0_20px_rgba(0,229,255,0.1)] flex flex-col justify-end p-0.5">
              
              {/* Door Panel */}
              <div className="w-full h-full bg-[#111827] border border-slate-705 rounded-t-xs p-1 flex flex-col justify-between relative overflow-hidden">
                
                {/* Panel moldings inside the door for realistic depth */}
                <div className="grid grid-cols-1 gap-1.5 grow pt-1">
                  <div className="h-6 border border-slate-800 bg-[#162032]/40 rounded-sm" />
                  <div className="h-6 border border-slate-800 bg-[#162032]/40 rounded-sm" />
                  <div className="h-8 border border-slate-800 bg-[#162032]/40 rounded-sm" />
                </div>
                
                {/* Smart door lock handle */}
                <div className="absolute top-1/2 right-1 transform -translate-y-1/2 flex flex-col items-center gap-0.5">
                  <div className="w-[3px] h-3 bg-slate-400 rounded-sm shadow-sm" />
                  <div className="w-1 h-1 bg-[#00e5ff] rounded-full animate-ping" />
                </div>

                {/* Accent glow peering from top of the door */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-60" />
              </div>
            </div>

            {/* Glowing Doorstep Lamp / Sconces */}
            <div className="absolute inset-y-0 w-full max-w-[120px] flex justify-between items-center px-1 pointer-events-none">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full blur-[1px] animate-pulse shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full blur-[1px] animate-pulse shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
            </div>

            {/* Ground / Front Porch steps */}
            <div className="absolute bottom-2 inset-x-8 h-4 bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-sm border-t border-slate-700 shadow-lg flex flex-col justify-end">
              {/* Lower step */}
              <div className="w-full h-1.5 bg-[#0f172a] border-t border-slate-800 rounded-b-sm" />
            </div>

            {/* Welcome Mat */}
            <div className="absolute bottom-4.5 w-[50px] h-3 bg-[#0f172a] border border-slate-800 rounded-sm flex items-center justify-center opacity-90 z-20">
              <span className="text-[4px] font-mono font-bold tracking-wider text-slate-500 scale-90 uppercase">WELCOME</span>
            </div>

            {/* Glowing Tech Location pin hovering above the door doorstep area */}
            <div className="absolute -top-1 w-10 h-10 flex flex-col items-center justify-center z-30 animate-[bounce_2.5s_infinite]">
              <MapPin size={20} className="text-[#00e5ff] drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]" fill="rgba(0, 229, 255, 0.2)" />
              <div className="w-3 h-1 bg-[#00e5ff]/40 rounded-full blur-[1px] absolute top-8 animate-ping" />
            </div>

            {/* Transit Service Van Arriving Icon */}
            <div className="absolute bottom-2.5 left-2 z-40 bg-[#0d1527]/85 border border-[#00e5ff]/25 p-1 rounded shadow flex items-center justify-center">
              <Truck size={12} className="text-[#00e5ff] animate-pulse" />
            </div>

            {/* Toolkit standing on step */}
            <div className="absolute bottom-3 right-6 z-40 flex flex-col items-center scale-90">
              <div className="w-3 h-2 bg-red-600 rounded-t border-t border-red-500 shadow relative" />
              <div className="w-3.5 h-[2px] bg-slate-800 rounded-b shadow" />
            </div>

          </div>
        </div>
      );

    case 'srv-leak':
      // Detailed Open AC cover showing evaporator condenser coils dripping clean condensed water droplets inside a pipe
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <RealCityGrid />
          <div className="relative flex flex-col items-center justify-center z-10 space-y-2 w-full px-4">
            
            {/* Split System Open Casing Shell mockup */}
            <div className="relative w-[150px] h-[65px] bg-slate-900 rounded-lg p-2 border-2 border-slate-700 shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)]">
              {/* Internal Copper Fin Coils block */}
              <div className="w-full h-full bg-gradient-to-r from-teal-900 to-cyan-950 rounded border border-teal-800 flex flex-col justify-around p-1">
                {/* Coil copper winding lines detail */}
                <div className="flex flex-col gap-1 w-full opacity-60">
                  <span className="h-[2px] bg-amber-600 rounded" />
                  <span className="h-[2px] bg-slate-500 rounded" />
                  <span className="h-[2px] bg-amber-600 rounded" />
                </div>

                {/* Open drain pan tray at unit bottom */}
                <div className="w-full h-1.5 bg-slate-700/80 rounded border-b border-sky-400 flex items-center justify-end">
                  {/* Glowing blue clean water condensation level */}
                  <div className="h-full bg-sky-400 rounded w-4/5 animate-pulse" />
                </div>
              </div>

              {/* Water droplet dripping out under gravity */}
              <div className="absolute bottom-0 left-10 text-sky-400">
                <Droplet size={14} className="animate-[bounce_1.5s_infinite] drop-shadow-[0_2px_4px_rgba(56,189,248,0.5)]" />
              </div>
              <div className="absolute bottom-2 left-24 text-sky-300">
                <Droplet size={10} className="animate-[bounce_2s_infinite_alternate] drop-shadow-[0_2px_4px_rgba(56,189,248,0.5)]" />
              </div>

              {/* Professional Drain hose flushing pipe */}
              <div className="absolute -bottom-6 right-6 w-5 h-8 border-l-4 border-b-4 border-slate-500 rounded-bl-xl shadow-md">
                {/* Fluid drop exiting pipe mouth */}
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'srv-emergency':
      // Highly Realistic Emergency Rotating Amber/Red Siren Alert Dispatch light
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <RealCityGrid />
          <div className="relative flex flex-col items-center justify-center z-10 space-y-4">
            
            <div className="relative">
              {/* Emergency dispatch pulse radiant rays */}
              <span className="absolute -inset-6 rounded-full bg-red-600/15 animate-[ping_2s_infinite] pointer-events-none" />
              <span className="absolute -inset-10 rounded-full bg-red-500/5 animate-[pulse_3s_infinite] pointer-events-none" />

              {/* Siren Base (Heavy Metal Chrome housing) */}
              <div className="relative w-20 h-22">
                {/* Dome lens cover */}
                <div className="absolute inset-x-2 top-0 h-14 bg-gradient-to-b from-red-500/90 to-red-600 rounded-t-full border border-red-400/40 shadow-[0_0_25px_rgba(239,68,68,0.8)] overflow-hidden">
                  {/* Inside spinning halogen light reflector mirror element */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded bg-yellow-200 border-2 border-yellow-400/80 transform rotate-45 animate-spin">
                    <div className="w-full h-full bg-gradient-to-br from-white via-transparent to-transparent opacity-80" />
                  </div>
                  {/* Reflection lens white glaze glow */}
                  <div className="absolute right-3 top-2 w-3 h-8 bg-white/20 rounded-full blur-[1px] rotate-12" />
                </div>

                {/* Sturdy Bottom structural metallic steel pedestal flange */}
                <div className="absolute bottom-4 inset-x-0 h-4 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-500 rounded-md border-b-[2px] border-slate-600 shadow shadow-black flex items-center justify-center">
                  <span className="w-12 h-1 bg-slate-700/50 rounded-full" />
                </div>

                {/* Pedestal Screws holding base */}
                <div className="absolute bottom-2 left-3 w-1.5 h-1.5 rounded-full bg-slate-900" />
                <div className="absolute bottom-2 right-3 w-1.5 h-1.5 rounded-full bg-slate-900" />
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <RealCityGrid />
          <div className="z-10 text-cyan-400">
            <Wind size={40} className="animate-pulse" />
          </div>
        </div>
      );
  }
}

interface ComponentProps {
  tag: string;
}

export function ComponentIllustration({ tag }: ComponentProps) {
  const normTag = tag.toUpperCase();

  if (normTag.includes('COMPRESSOR')) {
    // Highly Detailed Physical Rotary Hermetic Compressor Pot
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <RealCityGrid />
        <div className="relative flex flex-col items-center justify-center z-10 space-y-2">
          
          <div className="relative">
            {/* Steel cylinder body shimmer light highlight */}
            <div className="absolute top-2 left-6 w-[2px] h-20 bg-white/35 rounded-full pointer-events-none z-20 blur-[0.5px]" />
            
            {/* Accumulator suction tank attached on side bracket */}
            <div className="absolute left-1 top-6 w-5 h-14 bg-gradient-to-b from-slate-800 to-slate-950 rounded-lg border border-slate-700 shadow flex flex-col items-center p-0.5">
              {/* Connecting metal band lines */}
              <div className="w-6 h-1.5 bg-slate-600 border border-slate-500 absolute top-4 -right-1 rounded-sm" />
              <div className="w-6 h-1.5 bg-slate-600 border border-slate-500 absolute top-9 -right-1 rounded-sm" />
              <div className="w-2.5 h-[3px] bg-amber-500 rounded" />
            </div>

            {/* Compressor main hermetic motor core body */}
            <div className="w-16 h-24 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 rounded-2xl border-t-4 border-slate-700 shadow-[0_8px_16px_rgba(0,0,0,0.55)] flex flex-col justify-between p-2 pl-4">
              
              {/* Warning/Wiring Terminal cap top */}
              <div className="w-8 h-2 bg-gradient-to-b from-slate-600 to-slate-800 rounded-t border-t border-slate-400 mx-auto -mt-3.5 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
              </div>

              {/* Upper Discharge gold-copper weld pipes */}
              <div className="ml-1 flex flex-col items-start gap-1">
                <span className="w-2 h-4 rotate-12 border-t-2 border-r-2 border-amber-500/80 rounded-tr" />
                {/* Warning decals label on black steel body */}
                <div className="bg-amber-400 text-slate-950 text-[4px] px-1 py-0.5 rounded font-sans font-bold leading-none tracking-tighter scale-90">
                  DANGER: HIGH PRESS.
                </div>
              </div>

              {/* Lower Rotary motor base feet */}
              <div className="flex gap-1 items-end justify-center">
                <span className="w-3 h-1.5 bg-slate-900 border-t border-slate-600 rounded-l" />
                <span className="w-4 h-1 bg-slate-900" />
                <span className="w-3 h-1.5 bg-slate-900 border-t border-slate-600 rounded-r" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (normTag.includes('CONDENSER')) {
    // Realistic outdoor condenser cabinet unit showing fan grill, metal frame and copper tubes
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <RealCityGrid />
        <div className="relative flex flex-col items-center justify-center z-10 space-y-2.5 w-full">
          
          {/* Outdoor Heavy Aluminum Cabinet Frame box */}
          <div className="relative border-2 border-slate-600 w-36 h-22 rounded-xl bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 p-2.5 flex items-center justify-between shadow-[0_10px_20px_rgba(0,0,0,0.45)]">
            
            {/* Left Air Grille venting louvers and condenser coils behind them */}
            <div className="flex flex-col gap-1 w-12 bg-slate-800 rounded-md p-1 h-full shadow-inner relative justify-around overflow-hidden">
              {/* Copper lines behind the louvers */}
              <span className="h-[2px] bg-amber-600/60 w-full" />
              <span className="h-[2px] bg-amber-600/40 w-full" />
              <span className="h-[2px] bg-amber-600/70 w-full" />
              <span className="h-[2px] bg-amber-600/55 w-full" />
            </div>

            {/* Right side Circular Fan safety guard grill with active spinning blade */}
            <div className="relative w-16 h-16 rounded-full border border-slate-500 bg-slate-900 flex items-center justify-center overflow-hidden shadow-inner">
              
              {/* Concentric safety cage lines */}
              <div className="absolute inset-1.5 border border-slate-700/60 rounded-full pointer-events-none" />
              <div className="absolute inset-4 border border-slate-700/30 rounded-full pointer-events-none" />
              
              {/* Spinning Fan blades with shaded motion */}
              <div className="relative w-12 h-12 flex items-center justify-center animate-[spin_1.5s_linear_infinite]">
                <span className="absolute w-2 h-12 bg-slate-600 rounded-full transform rotate-45" />
                <span className="absolute w-12 h-2 bg-slate-600 rounded-full transform rotate-45" />
                <span className="absolute w-2 h-12 bg-slate-600 rounded-full transform -rotate-45" />
                <span className="absolute w-12 h-2 bg-slate-600 rounded-full transform -rotate-45" />
                {/* Center fan nose cap */}
                <div className="absolute w-2.5 h-2.5 rounded-full bg-slate-400 border border-slate-500 shadow" />
              </div>
            </div>

            {/* Industrial Bottom vibration mount blocks */}
            <div className="absolute -bottom-1.5 left-4 w-4 h-1.5 bg-slate-800 rounded shadow" />
            <div className="absolute -bottom-1.5 right-4 w-4 h-1.5 bg-slate-800 rounded shadow" />
          </div>
        </div>
      </div>
    );
  }

  if (normTag.includes('EVAPORATOR')) {
    // Realistic Serpent coil bundle made of shiny copper tubes & aluminum fin rows
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <RealCityGrid />
        <div className="relative flex flex-col items-center justify-center z-10 space-y-2">
          
          {/* Evaporator Serpent module casing sleeve */}
          <div className="relative border-2 border-slate-600 w-40 h-20 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 p-2.5 flex items-center justify-between overflow-hidden shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)]">
            
            {/* Left Shiny U-bent Copper Pipes row */}
            <div className="flex flex-col gap-1 justify-center shrink-0">
              <span className="w-3 h-2 bg-amber-500 rounded-r-md border border-amber-600" />
              <span className="w-3 h-2 bg-amber-500 rounded-r-md border border-amber-600" />
              <span className="w-3 h-2 bg-amber-500 rounded-r-md border border-amber-600" />
              <span className="w-3 h-2 bg-amber-500 rounded-r-md border border-amber-600" />
            </div>

            {/* Main Center body: array of fine vertical aluminum fins with serpentine pipe running through */}
            <div className="flex-1 mx-2 h-full bg-gradient-to-r from-sky-900 to-sky-950 border border-sky-800/80 rounded px-1.5 flex flex-col justify-around relative">
              
              {/* Ultra fine vertical fins texture representation */}
              <div className="absolute inset-0 flex select-none pointer-events-none opacity-[0.16] justify-between">
                {[...Array(14)].map((_, i) => (
                  <span key={i} className="w-[1px] h-full bg-white" />
                ))}
              </div>

              {/* serpentine copper tubing overlay profile path */}
              <svg className="w-full h-7 shrink-0 relative z-10" viewBox="0 0 100 24" fill="none" stroke="#22d3ee" strokeWidth="2.5">
                <path d="M 0 12 L 15 2 L 30 22 L 45 2 L 60 22 L 75 2 L 90 22 L 100 12" strokeLinecap="round" strokeLinejoin="round" className="animate-[pulse_1.5s_infinite]" />
              </svg>

              {/* Frost accumulation layer glow representation */}
              <span className="absolute bottom-1 right-2 text-[6px] font-mono font-bold text-sky-400 animate-pulse bg-sky-950/80 px-1 border border-sky-800 rounded">0.6°C EVAP</span>
            </div>

            {/* Right side exit copper expansion piping */}
            <div className="flex flex-col gap-1.5 justify-center shrink-0">
              <span className="w-2.5 h-2 bg-amber-500 rounded-l-md border border-amber-600" />
              <span className="w-2.5 h-2 bg-amber-500 rounded-l-md border border-amber-600" />
              <span className="w-2.5 h-2 bg-amber-500 rounded-l-md border border-amber-600" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (normTag.includes('REFRIGERANT')) {
    // High-Fidelity Painted Liquid Coolant Cylinder Tank Cylinder (e.g. freon R32)
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <RealCityGrid />
        <div className="relative flex flex-col items-center justify-center z-10 space-y-2">
          
          <div className="flex gap-2.5 items-end justify-center">
            
            {/* Thermometer temperature check dial on side */}
            <div className="flex flex-col gap-1.5 items-center justify-center dark-glass py-1.5 px-2 rounded border border-slate-700/60 bg-slate-900/50">
              <Thermometer size={14} className="text-sky-400 animate-pulse" />
              <div className="text-[6px] font-mono text-cyan-400 font-bold">140 PSI</div>
            </div>

            {/* High-Fidelity cylindrical coolant bottle tank with standard decals */}
            <div className="relative bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 px-3.5 py-2.5 rounded-2xl w-20 shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-t border-emerald-300">
              
              {/* Gloss metallic tube shine reflection overlay */}
              <div className="absolute top-0 bottom-0 left-2 w-1.5 bg-white/20 blur-[0.5px] pointer-events-none" />

              {/* Silver top cap protective handle cage ring */}
              <div className="w-10 h-4 border-2 border-slate-400 bg-slate-500 mx-auto -mt-6 rounded-t-lg relative flex items-center justify-center z-10 shadow">
                {/* Brass high-pressure turn dial valve key */}
                <div className="w-3.5 h-1.5 bg-amber-500 rounded border border-amber-700 absolute -top-1 animate-pulse" />
              </div>

              {/* Product Warning safety decal label */}
              <div className="bg-white border border-slate-300 rounded p-1 text-center select-none font-mono tracking-tighter text-slate-950 flex flex-col items-center justify-between gap-0.5 mt-1">
                <span className="text-[5px] font-bold leading-none bg-emerald-950 text-white px-1 py-0.5 rounded">R-32 GAS</span>
                <span className="text-[4px] leading-none font-bold">REFRIGERANT</span>
                <div className="w-full h-[1px] bg-slate-200" />
                <span className="text-[3px] text-[#ef4444] font-bold leading-none">CLASS 2.1 INFLAMMABLE</span>
              </div>

              {/* Cylinder welds detail ring */}
              <div className="h-[2px] bg-emerald-700/80 w-full mt-2.5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (normTag.includes('PCB') || normTag.includes('CONTROL')) {
    // Beautifully Complex Electronics Circuit Board Module with microchip, capacitors & relays
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <RealCityGrid />
        <div className="relative flex flex-col items-center justify-center z-10 space-y-2">
          
          {/* Glass-epoxy Green PCB Baseboard substrate */}
          <div className="relative border-2 border-emerald-700 w-36 h-22 rounded-xl bg-gradient-to-br from-emerald-950 to-green-900 p-2.5 flex flex-col justify-between shadow-[0_8px_16px_rgba(0,0,0,0.55)]">
            
            {/* PCB track wiring gold traces print overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none select-none">
              <path d="M 10 10 L 40 10 L 50 20 L 70 20 M 110 30 L 110 70 L 90 70" stroke="#fef08a" strokeWidth="1" fill="none" />
              <path d="M 20 50 L 50 50 L 60 60 M 30 80 L 80 80" stroke="#fef08a" strokeWidth="0.75" fill="none" />
            </svg>

            {/* Top Components Layer */}
            <div className="flex justify-between items-start z-10">
              
              {/* Large central Black Microprocessor Microchip */}
              <div className="relative w-10 h-10 bg-slate-900 border border-slate-700 rounded p-1 flex items-center justify-center shadow">
                {/* Silver Pins row borders */}
                <div className="absolute -left-1 inset-y-1.5 flex flex-col justify-between h-7 w-1">
                  {[...Array(5)].map((_, i) => <span key={i} className="w-1.5 h-[1px] bg-slate-300" />)}
                </div>
                <div className="absolute -right-1 inset-y-1.5 flex flex-col justify-between h-7 w-1">
                  {[...Array(5)].map((_, i) => <span key={i} className="w-1.5 h-[1px] bg-slate-300" />)}
                </div>
                <Cpu size={16} className="text-[#38bdf8] animate-pulse" />
              </div>

              {/* Cylindrical electrolytic capacitors & relay blocks */}
              <div className="flex gap-2 items-center">
                {/* Capacitor 1 (Blue Cylinder) */}
                <div className="w-3 h-6 bg-gradient-to-b from-blue-500 to-blue-700 rounded-b-sm border-x border-blue-400 flex flex-col justify-between p-0.5">
                  <span className="w-full h-1 bg-white/40 rounded-full" />
                  <span className="text-[3px] text-white font-mono scale-70">100uF</span>
                </div>
                {/* Capacitor 2 (Black Cylinder) */}
                <div className="w-3 h-5 bg-gradient-to-b from-slate-700 to-slate-900 rounded-b-sm border-x border-slate-600 flex flex-col justify-between p-0.5">
                  <span className="w-full h-1 bg-white/35 rounded-full" />
                </div>
                {/* Relay Block (Heavy Yellow plastic case) */}
                <div className="w-6 h-5 bg-amber-400 rounded border border-amber-600 text-[5px] text-slate-900 font-bold font-mono text-center shadow-sm">
                  12V
                </div>
              </div>
            </div>

            {/* Bottom Status LEDs and wiring port terminals */}
            <div className="flex justify-between items-end z-10">
              <div className="flex gap-1.5">
                {/* Blinking green diagnostics LED */}
                <span className="w-2 h-2 rounded-full bg-green-500 shadow animate-ping" />
                {/* Solid red power LED */}
                <span className="w-2 h-2 rounded-full bg-red-500 shadow" />
                {/* Blue remote receptor LED */}
                <span className="w-2 h-2 rounded-full bg-sky-500 shadow-sm animate-pulse" />
              </div>

              {/* Multi-point wire terminal connector block */}
              <div className="flex bg-slate-800 border border-slate-600 px-1 py-0.5 rounded gap-0.5 select-none">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                <span className="w-1.5 h-1.5 bg-[#475569] rounded-full" />
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (normTag.includes('FILTER') || normTag.includes('BLOWER')) {
    // Mechanical air filter mesh frame together with blower roller fan wheel cage
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <RealCityGrid />
        <div className="relative flex flex-col items-center justify-center z-10 space-y-2">
          
          <div className="flex gap-3.5 items-center justify-center w-full">
            
            {/* 1. Dust HEPA filter frame panel mesh */}
            <div className="relative w-18 h-18 border-2 border-slate-600 bg-slate-800 rounded-lg p-1.5 flex items-center justify-center shadow-md">
              <Filter size={24} className="text-sky-400/80" />
              {/* Micro mesh grid pattern lines layer */}
              <div className="absolute inset-1 border border-dashed border-sky-400/25 rounded" />
              
              {/* Purified fresh air wind breeze indicator symbol overlay */}
              <div className="absolute bottom-1 right-1">
                <ShieldCheck size={10} className="text-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Moving arrow indicating filtration process flow */}
            <div className="flex flex-col items-center text-emerald-400">
              <Wind size={18} className="animate-[pulse_1.5s_infinite]" />
              <span className="text-[6px] font-mono leading-none tracking-tight font-bold bg-emerald-500/10 px-1 py-0.5 border border-emerald-500/25 rounded mt-0.5">PM2.5 OK</span>
            </div>

            {/* 2. Tangential cross-flow Blower Motor Fan squirrel structural wheel */}
            <div className="relative w-18 h-18 bg-slate-900 border border-slate-700/80 rounded-full flex items-center justify-center shadow-inner overflow-hidden">
              {/* Rotary spinner blower lines detail mimicking cage scroll fan */}
              <div className="relative w-14 h-14 rounded-full border border-dashed border-teal-500/20 flex items-center justify-center animate-[spin_3s_linear_infinite]">
                <span className="absolute w-[2px] h-full bg-slate-600" />
                <span className="absolute w-[2px] h-full bg-slate-600 rotate-30" />
                <span className="absolute w-[2px] h-full bg-slate-600 rotate-60" />
                <span className="absolute w-[2px] h-full bg-slate-600 rotate-90" />
                <span className="absolute w-[2px] h-full bg-slate-600 rotate-120" />
                <span className="absolute w-[2px] h-full bg-slate-600 rotate-150" />
                <div className="absolute w-8 h-8 rounded-full border-r-2 border-l border-cyan-400 bg-slate-950/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // fallback generic element
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <RealCityGrid />
      <div className="z-10 text-cyan-400">
        <Wind size={36} />
      </div>
    </div>
  );
}
