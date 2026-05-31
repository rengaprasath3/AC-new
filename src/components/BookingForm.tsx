import { useState, useEffect, FormEvent } from 'react';
import { Calendar, Phone, User, MessageSquare, Wrench, ShieldCheck, Check } from 'lucide-react';
import { Booking } from '../types';

interface BookingFormProps {
  prefilledIssue: string;
  prefilledComponent: string;
  onBookingAdded: (newBooking: Booking) => void;
}

export default function BookingForm({
  prefilledIssue,
  prefilledComponent,
  onBookingAdded,
}: BookingFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('AC Repair');
  const [brand, setBrand] = useState('Daikin');
  const [issue, setIssue] = useState('');
  const [success, setSuccess] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Handle prefilled triggers from diagnostic assistant
  useEffect(() => {
    if (prefilledIssue) {
      setIssue(`Symptom: ${prefilledIssue}. Component suspected: ${prefilledComponent}`);
      setServiceType('AC Repair');
    }
  }, [prefilledIssue, prefilledComponent]);

  const brands = [
    'Daikin',
    'Voltas',
    'Blue Star',
    'LG',
    'Symphony / Samsung',
    'Hitachi',
    'Lloyd',
    'O General',
    'Carrier',
    'Panasonic',
  ];

  const serviceTypes = [
    'AC Installation',
    'AC Repair',
    'Gas Filling',
    'General Service / Deep Wash',
    'Water Leakage Fix',
    '24/7 Emergency Support',
  ];

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !issue.trim()) {
      setStatusMsg('🚨 Please fill in Name, Phone, and Describe Issue.');
      setTimeout(() => setStatusMsg(''), 4000);
      return;
    }

    // Format new booking for local pipeline review
    const newBooking: Booking = {
      id: `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      phone,
      serviceType,
      brand,
      issue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Pending',
    };

    onBookingAdded(newBooking);

    // Prepare pre-filled WhatsApp message templates with collected details
    const messageText = `🔧 *New Service Request — Annai AC Service*
    
👤 *Customer Name:* ${name}
📞 *Phone Number:* ${phone}
❄️ *AC Brand:* ${brand}
🛠️ *Service Selected:* ${serviceType}
📋 *Issue Details:* ${issue}

_Form submitted from live portal._`;

    const encodedText = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/918124751695?text=${encodedText}`;
    
    // Attempt redirect
    window.open(waUrl, '_blank');

    // Reset Form & announce success
    setName('');
    setPhone('');
    setIssue('');
    setSuccess(true);
    setStatusMsg('');

    setTimeout(() => {
      setSuccess(false);
    }, 6000);
  };

  return (
    <div className="glass border border-white/10 rounded-2xl p-6 md:p-8 relative">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent" />

      <h3 className="font-orbitron font-bold text-lg md:text-xl text-[#b8f0ff] mb-2 text-center">
        ⚡ Rapid Service Booking
      </h3>
      <p className="text-xs text-[#8a95aa] text-center mb-6">
        No payment upfront. Pay securely in person after completion. Original spares guaranteed.
      </p>

      {success && (
        <div className="mb-5 bg-[#00ffaa]/10 border border-[#00ffaa]/40 rounded-xl p-4 flex items-start gap-3 animate-pulse">
          <Check className="text-[#00ffaa] shrink-0 mt-0.5" size={16} />
          <div className="text-xs text-[#b8f0ff]">
            <span className="font-bold text-[#00ffaa] block font-orbitron uppercase text-[10px] tracking-wider mb-0.5">WhatsApp Booking Launched!</span>
            We pre-filled your service details for the WhatsApp message. Tap the button to directly connect with our repair dispatcher.
          </div>
        </div>
      )}

      {statusMsg && (
        <div className="mb-5 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs text-red-300">
          {statusMsg}
        </div>
      )}

      <form onSubmit={handleBookingSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-[10px] font-orbitron uppercase text-[#8a95aa] mb-1.5 font-bold tracking-wider">
            Your Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={15} />
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className="w-full bg-black/40 border border-white/10 focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]/30 focus:outline-none rounded-xl py-3 pl-11 pr-5 text-sm text-[#eef2ff] placeholder-white/20 transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Brand & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-orbitron uppercase text-[#8a95aa] mb-1.5 font-bold tracking-wider">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" size={14} />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="e.g. 81247 51695"
                className="w-full bg-black/40 border border-white/10 focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]/30 focus:outline-none rounded-xl py-3 pl-11 pr-5 text-sm text-[#eef2ff] placeholder-white/20 transition-all duration-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-orbitron uppercase text-[#8a95aa] mb-1.5 font-bold tracking-wider">
              AC Brand
            </label>
            <select
              value={brand}
              onChange={e => setBrand(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-[#00e5ff] focus:outline-none rounded-xl py-3 px-4 text-sm text-[#eef2ff] transition-all duration-300 appearance-none cursor-pointer"
            >
              {brands.map(b => (
                <option key={b} value={b} className="bg-[#04090f] text-[#eef2ff]">
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-[10px] font-orbitron uppercase text-[#8a95aa] mb-1.5 font-bold tracking-wider">
            Required Service
          </label>
          <div className="relative">
            <select
              value={serviceType}
              onChange={e => setServiceType(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-[#00e5ff] focus:outline-none rounded-xl py-3 px-4 text-sm text-[#eef2ff] appearance-none cursor-pointer"
            >
              {serviceTypes.map(st => (
                <option key={st} value={st} className="bg-[#04090f] text-[#eef2ff]">
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Issue details */}
        <div>
          <label className="block text-[10px] font-orbitron uppercase text-[#8a95aa] mb-1.5 font-bold tracking-wider">
            Describe AC Issue
          </label>
          <div className="relative">
            <MessageSquare
              className="absolute left-3.5 top-4 text-white/30"
              size={14}
            />
            <textarea
              value={issue}
              onChange={e => setIssue(e.target.value)}
              placeholder="e.g. Compressor clicks twice but indoor fan doesn't blow cool air. Water drops pooling near vertical fins."
              className="w-full h-24 bg-black/40 border border-white/10 focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]/30 focus:outline-none rounded-xl pt-3 pb-3 pl-11 pr-5 text-sm text-[#eef2ff] placeholder-white/20 transition-all duration-300 resize-none"
              required
            />
          </div>
        </div>

        {/* Dynamic estimated price tagline */}
        <div className="bg-[#00e5ff]/5 border border-[#00e5ff]/20 rounded-xl p-3 flex items-center justify-between font-orbitron">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#b8f0ff] flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[#00ffaa]" />
            WARRANTY
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00ffaa]">
            SPARE GARANTY
          </span>
        </div>

        {/* Buttons */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-[#00ffaa] hover:bg-[#00ffaa]/90 text-[#000000] font-orbitron font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,255,170,0.3)] tracking-widest uppercase cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          >
            💬 Click to Submit & Chat on WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
}
