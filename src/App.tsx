import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wrench,
  Flame,
  Droplet,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Sparkles,
  PhoneCall,
  Menu,
  X,
  MapPin,
  Clock,
  Star,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import SnowCanvas from './components/SnowCanvas';
import AcSvg from './components/AcSvg';
import BookingForm from './components/BookingForm';
import BookingPipeline from './components/BookingPipeline';
import DriveConsole from './components/DriveConsole';
import { Service, ComponentItem, Booking } from './types';
import { ServiceIllustration, ComponentIllustration } from './components/ServiceIllustration';

const reviews = [
  {
    author: 'Rajan K.',
    location: 'Srirangam',
    stars: 5,
    text: 'Compressor replaced within hours. System back to optimal cooling — superb service! Highly responsive team.'
  },
  {
    author: 'Karthik S.',
    location: 'Thiruverumbur',
    stars: 5,
    text: 'மிகவும் அருமையான சேவை! சரியான நேரத்தில் வந்து மிகக் குறைந்த செலவில் ஏசி-யை பழுது நீக்கினர். மிகவும் திருப்தி!'
  },
  {
    author: 'Priya S.',
    location: 'KK Nagar',
    stars: 5,
    text: 'Gas refilling done professionally. Superb diagnostics, no unnecessary upselling. Highly recommended.'
  },
  {
    author: 'Anitha R.',
    location: 'Kantonment',
    stars: 5,
    text: 'ஏசி ஜெட் வாஷ் சர்வீஸ் சூப்பரா பண்ணிருக்காங்க. இப்போ ரூம் நல்லா ஜில்லுனு இருக்கு! Highly recommended!'
  },
  {
    author: 'Murugan T.',
    location: 'Thillai Nagar',
    stars: 5,
    text: 'PCB failure diagnosed instantly. Fixed same day. Reached within 30 minutes of my call! Phenomenal skill.'
  },
  {
    author: 'Ramesh Kumar',
    location: 'Woraiyur',
    stars: 5,
    text: 'திருச்சியில் சிறந்த ஏசி சர்வீஸ். சரியான முறையில் எங்களை தொடர்புகொண்டு மிக நேர்த்தியாக வேலை செய்தனர்.'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState({ issue: '', component: '' });
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Telemetry tick state to simulate live operating changes
  const [telemetryTick, setTelemetryTick] = useState(0);

  const servicesTrackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const compsTrackRef = useRef<HTMLDivElement>(null);
  const [canScrollCompsLeft, setCanScrollCompsLeft] = useState(false);
  const [canScrollCompsRight, setCanScrollCompsRight] = useState(true);

  const reviewsTrackRef = useRef<HTMLDivElement>(null);
  const [canScrollReviewsLeft, setCanScrollReviewsLeft] = useState(false);
  const [canScrollReviewsRight, setCanScrollReviewsRight] = useState(true);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const scrollServices = (direction: 'left' | 'right') => {
    if (servicesTrackRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      servicesTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const checkScrollState = () => {
    if (servicesTrackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = servicesTrackRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scrollComps = (direction: 'left' | 'right') => {
    if (compsTrackRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      compsTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const checkCompsScrollState = () => {
    if (compsTrackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = compsTrackRef.current;
      setCanScrollCompsLeft(scrollLeft > 10);
      setCanScrollCompsRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scrollReviews = (direction: 'left' | 'right') => {
    if (reviewsTrackRef.current) {
      const itemEl = reviewsTrackRef.current.firstElementChild;
      const scrollAmount = itemEl ? (itemEl.clientWidth + 20) * (direction === 'left' ? -1 : 1) : 320 * (direction === 'left' ? -1 : 1);
      reviewsTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const checkReviewsScrollState = () => {
    if (reviewsTrackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = reviewsTrackRef.current;
      setCanScrollReviewsLeft(scrollLeft > 10);
      setCanScrollReviewsRight(scrollLeft + clientWidth < scrollWidth - 10);

      const itemEl = reviewsTrackRef.current.firstElementChild;
      const cardWidth = itemEl ? itemEl.clientWidth + 20 : 320;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveReviewIdx(Math.min(Math.max(0, index), reviews.length - 1));
    }
  };

  useEffect(() => {
    const el = servicesTrackRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollState);
      const timer = setTimeout(checkScrollState, 300);
      window.addEventListener('resize', checkScrollState);
      return () => {
        el.removeEventListener('scroll', checkScrollState);
        clearTimeout(timer);
        window.removeEventListener('resize', checkScrollState);
      };
    }
  }, []);

  useEffect(() => {
    const el = compsTrackRef.current;
    if (el) {
      el.addEventListener('scroll', checkCompsScrollState);
      const timer = setTimeout(checkCompsScrollState, 300);
      window.addEventListener('resize', checkCompsScrollState);
      return () => {
        el.removeEventListener('scroll', checkCompsScrollState);
        clearTimeout(timer);
        window.removeEventListener('resize', checkCompsScrollState);
      };
    }
  }, []);

  useEffect(() => {
    const el = reviewsTrackRef.current;
    if (el) {
      el.addEventListener('scroll', checkReviewsScrollState);
      const timer = setTimeout(checkReviewsScrollState, 300);
      window.addEventListener('resize', checkReviewsScrollState);
      return () => {
        el.removeEventListener('scroll', checkReviewsScrollState);
        clearTimeout(timer);
        window.removeEventListener('resize', checkReviewsScrollState);
      };
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryTick(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTelemetryData = (idx: number, tick: number) => {
    const jitter1 = Math.sin(tick * 0.9) * 0.08;
    const jitter2 = Math.cos(tick * 1.3) * 1.1;
    const jitterLow = Math.sin(tick * 1.5) * 0.15;

    switch (idx) {
      case 0: // Compressor
        return {
          metrics: [
            { label: 'OP CURRENT', value: `${(8.4 + jitter1 * 3).toFixed(2)} A`, status: 'NOMINAL', progress: 72 + Math.round(jitter2 * 2) },
            { label: 'DISCHARGE TEMP', value: `${(73.5 + jitter2).toFixed(1)} °C`, status: 'STABLE', progress: 61 + Math.round(jitterLow * 4) },
            { label: 'DISCHARGE PRESS', value: `${(124 + Math.round(jitter2 * 2))} PSI`, status: 'OPTIMAL', progress: 80 + Math.round(jitter1 * 10) }
          ],
          health: '98%',
          load: '74%'
        };
      case 1: // Condenser
        return {
          metrics: [
            { label: 'FAN SPEED', value: `${Math.round(890 + jitter2 * 15)} RPM`, status: 'REGULATED', progress: 82 + Math.round(jitterLow * 3) },
            { label: 'HEAT EXCHANGE', value: `${(6.4 + jitter1).toFixed(2)} kW`, status: 'HIGH-EFF', progress: 77 + Math.round(jitter2 * 2) },
            { label: 'OUTDOOR TEMP', value: `${(37.4 + jitterLow).toFixed(1)} °C`, status: 'NORMAL', progress: 45 + Math.round(jitter1 * 5) }
          ],
          health: '100%',
          load: '82%'
        };
      case 2: // Evaporator
        return {
          metrics: [
            { label: 'COIL TEMPERATURE', value: `${(4.2 + jitterLow).toFixed(1)} °C`, status: 'OPTIMIZED', progress: 32 + Math.round(jitter2 * 2) },
            { label: 'AIRFLOW VOLUME', value: `${Math.round(410 + jitter2 * 6)} CFM`, status: 'MAX FLOW', progress: 85 + Math.round(jitterLow * 2) },
            { label: 'REFRIGERANT VEL', value: `${(4.2 + jitter1).toFixed(2)} m/s`, status: 'LAMINAR', progress: 68 + Math.round(jitter2 * 3) }
          ],
          health: '95%',
          load: '67%'
        };
      case 3: // Refrigerant
        return {
          metrics: [
            { label: 'PRESSURE LEVEL', value: `${(118.5 + jitter2 * 1.5).toFixed(1)} PSI`, status: 'BALANCED', progress: 75 + Math.round(jitter1 * 4) },
            { label: 'GAS PURITY', value: '99.98 %', status: 'PURE R-32', progress: 100 },
            { label: 'LEAK EMISSION', value: '0.00 ppm', status: 'SECURE', progress: 0 }
          ],
          health: '100%',
          load: 'FLOW OK'
        };
      case 4: // PCB
        return {
          metrics: [
            { label: 'DC BUS VOLTAGE', value: `${(12.04 + jitter1 * 0.1).toFixed(2)} VDC`, status: 'NOMINAL', progress: 60 + Math.round(jitter2) },
            { label: 'CPU LOAD', value: `${Math.round(18 + jitter2 * 2)} %`, status: 'LOW LOAD', progress: 18 + Math.round(jitterLow * 5) },
            { label: 'SIGNAL QUALITY', value: '100 %', status: 'EXCELLENT', progress: 99 }
          ],
          health: '99%',
          load: 'ACTIVE'
        };
      case 5: // Filter & Blower
        return {
          metrics: [
            { label: 'STATIC PRESSURE', value: `${Math.round(124 + jitter2 * 3)} Pa`, status: 'LOW DRAUGHT', progress: 35 + Math.round(jitter1 * 6) },
            { label: 'BLOWER SPEED', value: `${Math.round(1120 + jitter2 * 18)} RPM`, status: 'NOMINAL', progress: 70 + Math.round(jitterLow * 4) },
            { label: 'FILTER PASS', value: '98.4 %', status: 'UNOBSTRUCTED', progress: 98 }
          ],
          health: '96%',
          load: '70%'
        };
      default:
        return {
          metrics: [],
          health: '100%',
          load: 'STABLE'
        };
    }
  };

  // Stats Counters
  const [clientsCount, setClientsCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);

  useEffect(() => {
    // Smooth count-up values for stats
    const duration = 2000;
    const intervalTime = 30;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += intervalTime;
      const progress = Math.min(elapsed / duration, 1);

      setClientsCount(Math.floor(progress * 500));
      setYearsCount(Math.floor(progress * 8));

      if (progress >= 1) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const services: Service[] = [
    {
      id: 'srv-install',
      name: 'AC Installation',
      badge: '',
      image: '',
      icon: '❄️',
      description: 'Expert ceiling mounts and outdoor bracket alignments with leakproof insulation tape.'
    },
    {
      id: 'srv-repair',
      name: 'AC Repair & Diagnosis',
      badge: '',
      image: '',
      icon: '🔧',
      description: 'Error code troubleshooting, compressor relays fixes, and capacitor replacements.'
    },
    {
      id: 'srv-gas',
      name: 'Gas Filling Service',
      badge: '',
      image: '',
      icon: '🧊',
      description: 'Accurate pressure gauge vacuum checks, leak tests, and pure refrigerant scaling.'
    },
    {
      id: 'srv-home',
      name: 'Doorstep Home Service',
      badge: '',
      image: '',
      icon: '🏠',
      description: 'Quick transit with specialized tools to service any split or window air conditioner.'
    },
    {
      id: 'srv-leak',
      name: 'Water & Gas Leakage Fix',
      badge: '',
      image: '',
      icon: '💧',
      description: 'Clearing slime/mold from internal pans and high-pressure water jet line flushes.'
    },
    {
      id: 'srv-emergency',
      name: '24/7 Emergency Support',
      badge: '',
      image: '',
      icon: '⚡',
      description: 'Urgent cooling restoration for intensive settings like servers, hospitals, or private residences.'
    }
  ];

  const components: ComponentItem[] = [
    {
      name: 'AC Compressor',
      tag: 'COMPRESSOR',
      image: '',
      desc: 'The heart of every AC system — pressurises refrigerant gas to drive the cooling cycle. We diagnose, repair and replace all compressor types.',
      specs: ['Rotary', 'Scroll', 'Inverter', 'Reciprocating']
    },
    {
      name: 'Condenser Unit (Outdoor)',
      tag: 'CONDENSER UNIT',
      image: '',
      desc: 'Releases heat absorbed from your room to the outdoor air. We clean condenser coils, replace fans, and fix refrigerant leaks in the outdoor unit.',
      specs: ['Coil Cleaning', 'Fan Motor', 'Refrigerant']
    },
    {
      name: 'Evaporator Coil (Indoor)',
      tag: 'EVAPORATOR COIL',
      image: '',
      desc: 'Absorbs heat from room air and cools it. Dirty or frozen coils cause poor cooling. We deep-clean, thaw, and replace evaporator coils.',
      specs: ['Deep Clean', 'Ice Removal', 'Replacement']
    },
    {
      name: 'Refrigerant (Gas Charging)',
      tag: 'REFRIGERANT GAS',
      image: '',
      desc: 'Low refrigerant means poor cooling and high bills. We detect leaks, seal them, and recharge with the correct refrigerant for your AC model.',
      specs: ['R-22', 'R-32', 'R-410A', 'Leak Test']
    },
    {
      name: 'PCB & Control Board',
      tag: 'PCB / CONTROL BOARD',
      image: '',
      desc: 'The brain of your AC — controls all functions. Error codes, random shutdowns, or unresponsive remotes often point to PCB failure.',
      specs: ['Error Diagnosis', 'Repair', 'Replacement']
    },
    {
      name: 'Air Filter & Blower Motor',
      tag: 'FILTER & BLOWER',
      image: '',
      desc: 'Clogged filters reduce airflow and spread bacteria. We clean/replace filters, balance blower wheels, and lubricate fan motors for silent operation.',
      specs: ['Filter Wash', 'Blower Clean', 'Motor Check']
    }
  ];

  const handleSelectSymptom = (issueName: string, componentType: string) => {
    setSelectedSymptom({ issue: issueName, component: componentType });
    // Smooth scroll down to contact booking form
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingAdded = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleCancelBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const handleUpdateStatus = (id: string, newStatus: 'Pending' | 'Confirmed' | 'Completed') => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  return (
    <div className="relative min-h-screen bg-[#04090f] text-[#eef2ff] selection:bg-[#00e5ff]/30 selection:text-[#ffffff] pb-12">
      {/* Interactive Snowflake Ambient Canvas */}
      <SnowCanvas />

      {/* Cybernetic Ambient Glow Orbs */}
      <div className="fixed top-[-250px] left-[-250px] w-[600px] h-[600px] rounded-full bg-radial from-[#00e5ff]/10 to-transparent pointer-events-none z-0 animate-[pulse_8s_ease-in-out_infinite_alternate]" />
      <div className="fixed bottom-[-250px] right-[-250px] w-[600px] h-[600px] rounded-full bg-radial from-[#0050c8]/8 to-transparent pointer-events-none z-0 animate-[pulse_8s_ease-in-out_infinite_alternate_3.5s]" />

      {/* ─── STICKY HEADER ─── */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-[#04090f]/75 backdrop-blur-xl border-b border-white/5 px-4 md:px-12 py-3 md:py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="font-orbitron font-extrabold text-[#00e5ff] tracking-[3px] text-base md:text-lg drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">
            ANNAI AC
          </span>
          <span className="text-[9px] bg-[#00ffaa]/10 text-[#00ffaa] border border-[#00ffaa]/30 px-1.5 py-0.5 rounded font-mono font-bold tracking-widest uppercase">
            TRICHY
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-orbitron font-semibold tracking-wider text-[#8a95aa] uppercase">
          <a href="#services" className="hover:text-[#00e5ff] transition-colors">Services</a>
          <a href="#components" className="hover:text-[#00e5ff] transition-colors">Components</a>
          <a href="#contact" className="hover:text-[#00e5ff] transition-colors">Book Job</a>
        </nav>

        {/* Contact CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:8124751695"
            className="text-xs font-semibold font-orbitron tracking-wider text-[#00e5ff] bg-[#00e5ff]/10 border border-[#00e5ff]/30 py-2 px-4 rounded-xl flex items-center gap-2 hover:bg-[#00e5ff] hover:text-black transition-all shadow-[0_0_10px_rgba(0,229,255,0.1)]"
          >
            <PhoneCall size={13} />
            81247 51695
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1 bg-white/5 border border-white/10 rounded-lg text-white"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-y-0 right-0 w-64 bg-[#04090f]/95 backdrop-blur-2xl border-l border-white/10 z-50 p-6 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-orbitron font-bold text-[#00e5ff]">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col gap-4 text-sm font-semibold tracking-wider uppercase font-orbitron">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#8a95aa] hover:text-white"
              >
                Services
              </a>
              <a
                href="#components"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#8a95aa] hover:text-white"
              >
                Components
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#8a95aa] hover:text-white"
              >
                Book Job
              </a>
            </nav>
          </div>
          <div className="space-y-3">
            <a
              href="https://wa.me/918124751695"
              className="w-full py-3 bg-[#00ffaa]/10 hover:bg-[#00ffaa]/20 text-[#00ffaa] text-center rounded-xl text-xs font-semibold font-orbitron tracking-wider flex items-center justify-center gap-2 border border-[#00ffaa]/30"
            >
              💬 WhatsApp Us
            </a>
            <a
              href="tel:8124751695"
              className="w-full py-3 bg-[#00e5ff] text-black text-center rounded-xl text-xs font-semibold font-orbitron tracking-wider flex items-center justify-center gap-2"
            >
              📞 Direct Call
            </a>
          </div>
        </div>
      )}

      {/* ─── HERO SECTION ─── */}
      <section className="relative flex flex-col items-center justify-center min-h-[50vh] md:min-h-[65vh] py-8 md:py-16 px-4 md:px-12 text-center overflow-hidden bg-radial from-[#003c64]/30 via-transparent to-transparent">
        {/* Cyber blueprint grid background overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none z-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00e5ff" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
            {/* Concentric cooling air distribution rings */}
            <circle cx="50%" cy="50%" r="150" fill="none" stroke="#00e5ff" strokeWidth="1" strokeDasharray="5,5" className="animate-[pulse_4s_infinite]" />
            <circle cx="50%" cy="50%" r="300" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeDasharray="10,12" />
            <circle cx="50%" cy="50%" r="450" fill="none" stroke="#00ffaa" strokeWidth="1" strokeDasharray="3,6" />
          </svg>
        </div>

        <div className="max-w-[850px] bg-[#ffffff]/[0.02] border border-white/10 p-5 md:p-12 rounded-2xl md:rounded-[28px] backdrop-blur-md z-30 flex flex-col items-center gap-4 md:gap-5">
          {/* SVG AC Unit */}
          <AcSvg />

          {/* Marketing Titles */}
          <h1 className="font-orbitron font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight mt-3">
            Annai AC <span className="bg-gradient-to-r from-white to-[#00e5ff] bg-clip-text text-transparent">Service</span>
          </h1>

          <p className="text-base md:text-lg text-[#8a95aa]">
            Next-Generation AC Installation, Repair &amp; Maintenance in Tiruchirappalli
          </p>
          <p className="text-sm md:text-base text-[#00e5ff] font-medium tracking-wide">
            திருச்சிராப்பள்ளியில் அனைத்து வகையான ஏசி சேவைகளும்
          </p>

          {/* Ventilation lines visual effect */}
          <div className="flex gap-1.5 py-4 w-full justify-center max-w-sm">
            <span className="h-1 bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent w-full opacity-60 animate-pulse" />
            <span className="h-1 bg-gradient-to-r from-transparent via-[#00ffaa] to-transparent w-full opacity-40 animate-pulse" />
          </div>

          {/* Quick Call / WhatsApp actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2">
            <a
              href="tel:8124751695"
              className="px-6 py-4 rounded-xl text-xs font-bold font-orbitron tracking-widest uppercase text-[#00e5ff] border-2 border-[#00e5ff] bg-transparent hover:bg-[#00e5ff] hover:text-black transition-all drop-shadow-[0_0_12px_rgba(0,229,255,0.2)] focus:outline-none"
            >
              📞 Call 81247 51695
            </a>
            <a
              href="https://wa.me/918124751695"
              className="px-6 py-4 rounded-xl text-xs font-bold font-orbitron tracking-widest uppercase text-[#00ffaa] border-2 border-[#00ffaa] bg-transparent hover:bg-[#00ffaa] hover:text-black transition-all drop-shadow-[0_0_12px_rgba(0,255,170,0.2)] focus:outline-none"
            >
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* ─── COUNT UP STATS CONTAINER ─── */}
      <section className="relative z-30 py-5 md:py-8 bg-linear-to-r from-[#00e5ff]/3 via-[#0064ff]/5 to-[#00e5ff]/3 border-y border-[#00e5ff]/10">
        <div className="max-w-[600px] mx-auto px-6 grid grid-cols-2 gap-8 justify-items-center">
          <div className="text-center">
            <span className="block font-orbitron text-4xl md:text-5xl font-black text-[#00e5ff] drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
              {clientsCount}+
            </span>
            <span className="block font-orbitron text-[10px] md:text-xs font-bold tracking-widest text-[#b8f0ff] mt-2 uppercase">
              Happy Clients
            </span>
          </div>

          <div className="text-center">
            <span className="block font-orbitron text-4xl md:text-5xl font-black text-[#00e5ff] drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
              {yearsCount}+
            </span>
            <span className="block font-orbitron text-[10px] md:text-xs font-bold tracking-widest text-[#b8f0ff] mt-2 uppercase">
              Years Experience
            </span>
          </div>
        </div>
      </section>

      {/* ─── SERVICES SLIDER ─── */}
      <section id="services" className="max-w-[1200px] mx-auto py-6 md:py-12 px-4 md:px-6 relative z-30">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div className="text-left">
            <h2 className="font-orbitron font-extrabold text-2xl md:text-4xl text-white tracking-widest uppercase">
              Our Premium Services
            </h2>
            <div className="w-16 h-[3px] bg-[#00e5ff] mt-4 rounded shadow-[0_0_10px_#00e5ff]" />
            <p className="text-xs text-[#8a95aa] mt-3">
              Quick, reliable repairs and precision parts installation for optimal cooling performance.
            </p>
          </div>
          
          {/* Slider controls */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scrollServices('left')}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border transition-all duration-300 ${
                canScrollLeft 
                  ? 'border-[#00e5ff]/35 text-[#00e5ff] hover:bg-[#00e5ff]/10 hover:border-[#00e5ff]/70 shadow-[0_0_12px_rgba(0,229,255,0.25)]'
                  : 'border-white/5 text-white/10 cursor-not-allowed opacity-40'
              }`}
              title="Slide Left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollServices('right')}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border transition-all duration-300 ${
                canScrollRight 
                  ? 'border-[#00e5ff]/35 text-[#00e5ff] hover:bg-[#00e5ff]/10 hover:border-[#00e5ff]/70 shadow-[0_0_12px_rgba(0,229,255,0.25)]'
                  : 'border-white/5 text-white/10 cursor-not-allowed opacity-40'
              }`}
              title="Slide Right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Sliding Track */}
        <div 
          ref={servicesTrackRef}
          className="flex overflow-x-auto gap-6 lg:gap-0 pb-6 pt-2 px-4 scrollbar-none snap-x snap-mandatory [-webkit-overflow-scrolling:touch]"
          style={{ scrollBehavior: 'smooth' }}
        >
          {services.map((srv, index) => {
            // Horizontal deck overlapping layout on large screens
            const overlapClasses = 
              index === 0 
                ? "z-10" 
                : "lg:-ml-12 z-10 hover:z-30 relative";

            return (
              <div
                key={srv.id}
                className={`relative p-2 group cursor-pointer w-[290px] sm:w-[320px] md:w-[340px] shrink-0 snap-start transition-all duration-500 ease-out hover:scale-105 ${overlapClasses}`}
              >
                {/* Back Stack Layer 1 - skewed left and down slightly */}
                <div className="absolute inset-2 rounded-2xl bg-[#03060a]/90 border border-white/5 shadow-2xl transition-all duration-500 ease-out group-hover:rotate-[-3deg] group-hover:scale-[0.97] group-hover:border-[#00e5ff]/20 z-0 pointer-events-none" />
                
                {/* Mid Stack Layer 2 - skewed right and up slightly */}
                <div className="absolute inset-2 rounded-2xl bg-[#040810]/95 border border-[#00e5ff]/5 shadow-xl transition-all duration-500 ease-out group-hover:rotate-[3deg] group-hover:scale-[1.01] group-hover:border-[#00e5ff]/15 z-0 pointer-events-none" />

                {/* Main Interactive Zoom Card */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="relative z-10 glass border border-white/8 group-hover:border-[#00e5ff]/45 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between h-[310px] bg-[#04090f]/95 backdrop-blur-md"
                >
                  {/* Vector Blueprint Tech Illustration Area */}
                  <div className="relative h-36 overflow-hidden bg-slate-950">
                    {/* Horizontal Cyber scanline element */}
                    <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent z-30 opacity-0 group-hover:opacity-100 group-hover:animate-scan" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/90 via-[#04090f]/15 to-transparent z-10 pointer-events-none" />
                    
                    {/* Smooth zooming service illustration container */}
                    <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110">
                      <ServiceIllustration id={srv.id} />
                    </div>

                    {srv.badge && (
                      <span className="absolute top-4 right-4 z-20 text-[9px] font-bold font-orbitron bg-black/60 text-[#00e5ff] border border-[#00e5ff]/35 py-1 px-2.5 rounded-md tracking-wider">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col justify-center items-center grow text-center">
                    <div className="space-y-1.5 flex flex-col items-center justify-center w-full">
                      <h3 className="font-orbitron font-bold text-sm md:text-base text-[#b8f0ff] flex items-center justify-center gap-2 group-hover:text-white transition-colors text-center w-full">
                        <span className="text-lg">{srv.icon}</span>
                        {srv.name}
                      </h3>
                      <p className="text-xs text-[#8a95aa] leading-relaxed text-center w-full max-w-[280px]">
                        {srv.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── AC COMPONENTS WE SERVICE ─── */}
      <section id="components" className="max-w-[1250px] mx-auto py-6 md:py-12 px-4 md:px-6 relative z-30">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div className="text-left">
            <h2 className="font-orbitron font-extrabold text-2xl md:text-3xl text-white tracking-widest uppercase">
              Major Components We Fix
            </h2>
            <div className="w-16 h-[3px] bg-[#00e5ff] mt-4 rounded shadow-[0_0_10px_#00e5ff]" />
            <p className="text-xs text-[#8a95aa] mt-3">
              Expert repairs for critical air conditioner components across split and inverter categories.
            </p>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scrollComps('left')}
              disabled={!canScrollCompsLeft}
              className={`p-3 rounded-full border transition-all duration-300 ${
                canScrollCompsLeft 
                  ? 'border-[#00e5ff]/35 text-[#00e5ff] hover:bg-[#00e5ff]/10 hover:border-[#00e5ff]/70 shadow-[0_0_12px_rgba(0,229,255,0.25)]'
                  : 'border-white/5 text-white/10 cursor-not-allowed opacity-40'
              }`}
              title="Slide Left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollComps('right')}
              disabled={!canScrollCompsRight}
              className={`p-3 rounded-full border transition-all duration-300 ${
                canScrollCompsRight 
                  ? 'border-[#00e5ff]/35 text-[#00e5ff] hover:bg-[#00e5ff]/10 hover:border-[#00e5ff]/70 shadow-[0_0_12px_rgba(0,229,255,0.25)]'
                  : 'border-white/5 text-white/10 cursor-not-allowed opacity-40'
              }`}
              title="Slide Right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Sliding Track of cards */}
        <div 
          ref={compsTrackRef}
          className="flex overflow-x-auto gap-6 lg:gap-0 pb-6 pt-2 px-4 scrollbar-none snap-x snap-mandatory [-webkit-overflow-scrolling:touch]"
          style={{ scrollBehavior: 'smooth' }}
        >
          {components.map((comp, index) => {
            // Horizontal deck overlapping layout on large screens
            const overlapClasses = 
              index === 0 
                ? "z-10" 
                : "lg:-ml-12 z-10 hover:z-30 relative";
            const telemetry = getTelemetryData(index, telemetryTick);

            return (
              <div
                key={index}
                className={`relative p-2 group cursor-pointer w-[300px] sm:w-[340px] shrink-0 snap-start transition-all duration-500 ease-out hover:scale-105 ${overlapClasses}`}
              >
                {/* Back Stack Layer 1 */}
                <div className="absolute inset-2 rounded-2xl bg-[#03060a]/95 border border-white/5 transition-all duration-500 ease-out group-hover:rotate-[-3deg] group-hover:scale-[0.97] group-hover:border-[#00e5ff]/20 z-0 pointer-events-none" />
                
                {/* Mid Stack Layer 2 */}
                <div className="absolute inset-2 rounded-2xl bg-[#040810]/95 border border-[#00e5ff]/5 transition-all duration-500 ease-out group-hover:rotate-[3deg] group-hover:scale-[1.01] group-hover:border-[#00e5ff]/15 z-0 pointer-events-none" />

                {/* Main Interactive Card */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="relative z-10 glass border border-white/8 group-hover:border-[#00e5ff]/45 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between h-[310px] bg-[#04090f]/95 backdrop-blur-md p-5"
                >
                  {/* Top Illustration Area */}
                  <div className="relative h-32 rounded-xl overflow-hidden bg-slate-950/70 border border-white/5 flex items-center justify-center p-3 mb-4">
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-950/80 to-transparent z-10 pointer-events-none" />
                    
                    {/* Zooming Illustration */}
                    <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 flex items-center justify-center">
                      <ComponentIllustration tag={comp.tag} />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="grow flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <h3 className="font-orbitron font-extrabold text-[#b8f0ff] text-sm tracking-wider uppercase group-hover:text-white transition-colors">
                        {comp.name}
                      </h3>
                      <p className="text-[10px] text-[#8a95aa] leading-relaxed line-clamp-3">
                        {comp.desc}
                      </p>
                    </div>

                    {/* Specs Tags list */}
                    <div className="pt-2 border-t border-white/5">
                      <div className="flex flex-wrap gap-1">
                        {comp.specs.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-[#00e5ff]/5 border border-[#00e5ff]/10 rounded-full px-2.5 py-0.5 text-[8px] text-[#00e5ff] font-semibold tracking-wide"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>



      {/* ─── CLIENT REVIEWS ─── */}
      <section className="max-w-[1100px] mx-auto py-6 md:py-10 px-4 md:px-6 relative z-30">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div className="text-left">
            <h2 className="font-orbitron font-extrabold text-xl md:text-2xl text-white tracking-widest uppercase">
              Customer Logbook
            </h2>
            <p className="text-[10px] font-mono text-[#00e5ff]/70 tracking-wider uppercase mt-1">Verified Service Records</p>
            
            {/* Average Rating Display */}
            <div className="flex items-center gap-1.5 mt-2 bg-[#00e5ff]/5 border border-[#00e5ff]/10 py-1 px-2 rounded-md w-fit">
              <div className="flex gap-0.5 text-[#00e5ff] drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
                <Star size={10} fill="#00e5ff" stroke="none" />
                <Star size={10} fill="#00e5ff" stroke="none" />
                <Star size={10} fill="#00e5ff" stroke="none" />
                <Star size={10} fill="#00e5ff" stroke="none" />
                <Star size={10} fill="#00e5ff" stroke="none" className="opacity-45" />
              </div>
              <span className="text-[10px] font-orbitron font-bold text-white leading-none">
                4.9 / 5.0
              </span>
              <span className="text-[8px] text-[#8a95aa] font-mono leading-none">
                (Average Rating)
              </span>
            </div>
          </div>

          {/* Sliding Controls for Logbook */}
          <div className="flex gap-2 mt-3 sm:mt-0">
            <button
              onClick={() => scrollReviews('left')}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                canScrollReviewsLeft
                  ? 'border-[#00e5ff]/30 text-[#00e5ff] hover:bg-[#00e5ff]/10 hover:shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                  : 'border-white/5 text-white/20 cursor-not-allowed'
              }`}
              disabled={!canScrollReviewsLeft}
              aria-label="Previous Review"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollReviews('right')}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                canScrollReviewsRight
                  ? 'border-[#00e5ff]/30 text-[#00e5ff] hover:bg-[#00e5ff]/10 hover:shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                  : 'border-white/5 text-white/20 cursor-not-allowed'
              }`}
              disabled={!canScrollReviewsRight}
              aria-label="Next Review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Lined Booklet Cover Separator Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Swipeable Scroll Track Container */}
        <div 
          ref={reviewsTrackRef}
          className="flex overflow-x-auto gap-5 pb-6 pt-2 px-4 scrollbar-none snap-x snap-mandatory [-webkit-overflow-scrolling:touch]"
          style={{ scrollBehavior: 'smooth' }}
        >
          {reviews.map((rev, idx) => (
            <div 
              key={idx}
              className="relative group w-[285px] sm:w-[310px] shrink-0 snap-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative flex min-h-[125px] bg-[#02070c] border border-white/10 rounded-lg shadow-xl overflow-hidden">
                {/* Book Spine / Spiral Binding Effect */}
                <div className="w-5 bg-gradient-to-r from-black via-[#0a111b] to-[#122234] border-r border-[#00e5ff]/25 flex flex-col justify-around items-center py-2 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-[#00e5ff]/40 shadow-[0_0_4px_rgba(0,229,255,0.4)]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-[#00e5ff]/40 shadow-[0_0_4px_rgba(0,229,255,0.4)]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-[#00e5ff]/40 shadow-[0_0_4px_rgba(0,229,255,0.4)]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-[#00e5ff]/40 shadow-[0_0_4px_rgba(0,229,255,0.4)]" />
                </div>

                {/* Lined Page Leaf Area */}
                <div className="flex-1 p-3 bg-[#050b11] relative overflow-hidden flex flex-col justify-between">
                  {/* Horizontal logbook writing lines */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(#fff_1px,transparent_1px)] bg-[size:100%_16px] top-1" />
                  {/* Vintage vertical notebook margin line */}
                  <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-red-500/20 pointer-events-none" />

                  <div className="pl-3.5 relative z-10">
                    <span className="text-2xl text-[#00e5ff]/20 absolute -top-1.5 -left-1 font-serif select-none pointer-events-none">“</span>
                    <p className="text-[10.5px] text-[#8a95aa] italic leading-relaxed font-sans min-h-[48px]">
                      {rev.text}
                    </p>
                  </div>

                  <div className="pl-3.5 mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between relative z-10">
                    <div className="flex gap-0.5 text-[#00e5ff]">
                      {Array.from({ length: rev.stars }).map((_, sIdx) => (
                        <Star key={sIdx} size={9} fill="#00e5ff" stroke="none" />
                      ))}
                    </div>
                    <span className="text-[8px] font-orbitron font-bold text-[#b8f0ff] tracking-wider opacity-80">
                      {rev.author} ({rev.location})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Progress Indicator Dots */}
        <div className="flex justify-center gap-1.5 mt-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (reviewsTrackRef.current) {
                  const itemEl = reviewsTrackRef.current.firstElementChild;
                  const cardWidth = itemEl ? itemEl.clientWidth + 20 : 320;
                  reviewsTrackRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
                }
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeReviewIdx === idx
                  ? 'w-6 bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ─── RAPID BOOKING CONTAINER ─── */}
      <section id="contact" className="max-w-[1200px] mx-auto py-6 md:py-12 px-4 md:px-6 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          {/* Booking Form Component */}
          <div className="lg:col-span-7">
            <BookingForm
              prefilledIssue={selectedSymptom.issue}
              prefilledComponent={selectedSymptom.component}
              onBookingAdded={handleBookingAdded}
            />
          </div>

          {/* Extra contact context / Maps Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass border border-white/15 h-full p-6 md:p-8 rounded-2xl space-y-5">
              <h4 className="font-orbitron font-bold text-[#00e5ff] tracking-wide text-sm uppercase">
                Annai Headquarters HQ
              </h4>
              <p className="text-xs text-[#8a95aa] leading-relaxed">
                We accommodate residential and office deployments covering all corners of Srirangam, Thuvakudi, Thillai Nagar, Lalgudi, and broader Tiruchirappalli districts.
              </p>

              <div className="space-y-3.5 pt-3">
                <div className="flex items-start gap-3.5">
                  <MapPin size={16} className="text-[#00ffaa] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#b8f0ff]">
                    <span className="font-bold text-white block">Regional Coverage</span>
                    Tiruchirappalli City Corporation Limits, Tamil Nadu
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <PhoneCall size={16} className="text-[#00ffaa] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#b8f0ff]">
                    <span className="font-bold text-white block">Direct Booking Hotline</span>
                    +91 81247 51695
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock size={16} className="text-[#00ffaa] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#b8f0ff]">
                    <span className="font-bold text-white block">Hours of Readiness</span>
                    8:00 AM — 9:00 PM (Emergency 24x7)
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded GMap */}
            <div className="glass border border-white/10 p-2.5 rounded-2xl overflow-hidden shadow-lg h-60">
              <iframe
                src="https://maps.google.com/maps?q=Tiruchirappalli&t=&z=11&ie=UTF8&iwloc=&output=embed"
                title="Tiruchirappalli Regional Map Boundaries"
                width="100%"
                height="100%"
                className="rounded-xl border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Live Service Job Pipeline (Dynamic interactive panel for preview validation) */}
        <BookingPipeline
          bookings={bookings}
          onCancelBooking={handleCancelBooking}
          onUpdateStatus={handleUpdateStatus}
        />

        {/* Secure Cloud Backups & Diagnostic Asset Explorer connected with user's Google Drive */}
        <DriveConsole bookings={bookings} />
      </section>

      {/* ─── FLOATING ACTION BUTTONS ─── */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-3 z-40 items-end animate-[bounce_4s_infinite]">
        {/* Rate Us Button */}
        <a
          href="https://g.page/r/CZ4UfTk2fwtBEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#ffb300] text-[#04090f] hover:bg-[#ffca28] px-5 py-3 rounded-full font-orbitron font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(255,179,0,0.5)] hover:shadow-[0_0_28px_rgba(255,202,40,0.7)] transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
          title="Rate Us on Google"
        >
          <Star size={14} fill="#04090f" stroke="none" className="animate-pulse" />
          Rate Us
        </a>

        {/* WhatsApp Us Button */}
        <a
          href="https://wa.me/918124751695"
          className="bg-[#00ffaa] text-[#04090f] hover:bg-[#00e5ff] px-5 py-3 rounded-full font-orbitron font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,255,170,0.5)] hover:shadow-[0_0_28px_rgba(0,229,255,0.7)] transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
          title="Chat on WhatsApp"
        >
          <Zap size={14} className="animate-pulse" />
          WhatsApp Us
        </a>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="w-full text-center py-8 mt-10 border-t border-white/5 bg-black/40 relative z-30">
        <h3 className="font-orbitron font-black text-base text-[#00e5ff] tracking-[4px] uppercase mb-2">
          ANNAI AC SERVICE
        </h3>
        <p className="text-xs text-[#8a95aa]">Tiruchirappalli, Tamil Nadu, India</p>
        <p className="text-xs text-[#8a95aa] mt-1">📞 +91 81247 51695</p>
        <p className="text-[10px] text-white/20 mt-6 tracking-wide">
          © 2026 Annai AC Service. Engineered with precision cooling principles. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
