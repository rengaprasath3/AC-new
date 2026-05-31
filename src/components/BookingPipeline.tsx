import { useState } from 'react';
import { Booking } from '../types';
import { Clock, CheckCircle2, User, Phone, Trash2, Shield, CalendarCheck } from 'lucide-react';

interface BookingPipelineProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onUpdateStatus: (id: string, newStatus: 'Pending' | 'Confirmed' | 'Completed') => void;
}

export default function BookingPipeline({
  bookings,
  onCancelBooking,
  onUpdateStatus,
}: BookingPipelineProps) {
  const [techAssigned, setTechAssigned] = useState<Record<string, string>>({});

  const assignTech = (id: string) => {
    const techs = ['Vijay (Lead AC Expert)', 'Anand (Gas Filling Specialist)', 'Karthik (Installation Pro)'];
    const randomTech = techs[Math.floor(Math.random() * techs.length)];
    setTechAssigned(prev => ({ ...prev, [id]: randomTech }));
    onUpdateStatus(id, 'Confirmed');
  };

  if (bookings.length === 0) {
    return null;
  }

  return (
    <div className="glass border border-[#00ffd2]/10 rounded-2xl p-6 relative overflow-hidden mt-12 bg-gradient-to-br from-black/60 to-white/3">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ffaa]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-white/5">
        <div>
          <h3 className="font-orbitron font-bold text-base text-[#00ffaa] flex items-center gap-2">
            <CalendarCheck size={18} />
            Live Service Job Pipeline
          </h3>
          <p className="text-[10px] text-[#8a95aa] mt-1">
            Track active repair tickets registered in the local service container.
          </p>
        </div>
        <span className="text-[10px] font-bold bg-[#00ffaa]/10 text-[#00ffaa] border border-[#00ffaa]/30 px-2 py-0.5 rounded-full font-mono uppercase">
          {bookings.length} Active {bookings.length === 1 ? 'Job' : 'Jobs'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map(b => {
          const tech = techAssigned[b.id] || null;

          return (
            <div
              key={b.id}
              className="bg-black/40 border border-white/5 hover:border-white/10 rounded-xl p-4 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] font-bold text-[#00e5ff] bg-[#00e5ff]/10 px-2.5 py-0.5 rounded border border-[#00e5ff]/20">
                    {b.id}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                    <span className="text-[10px] font-orbitron text-amber-400 capitalize tracking-wider font-semibold">
                      {b.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-2.5">
                  <h4 className="text-sm font-semibold text-white/90">{b.name}</h4>
                  <p className="text-[11px] text-[#8a95aa] font-mono flex items-center gap-2">
                    <Phone size={10} className="text-[#00e5ff]" /> {b.phone}
                  </p>
                  <p className="text-xs text-[#b8f0ff] bg-white/2 rounded-lg p-2 leading-relaxed italic border border-white/5">
                    "{b.issue}"
                  </p>
                </div>

                {/* Technician metadata slot */}
                {tech ? (
                  <div className="bg-[#00ffaa]/5 border border-[#00ffaa]/20 rounded-lg p-2.5 flex items-center gap-2 mt-3 animate-fade-in">
                    <User size={13} className="text-[#00ffaa]" />
                    <div className="text-[10px]">
                      <span className="text-white/60 block">Assigned Technician:</span>
                      <span className="text-[#00ffaa] font-semibold">{tech}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/3 border border-white/5 rounded-lg p-3 text-center mt-3">
                    <p className="text-[10px] text-[#8a95aa] mb-2">Assign an Annai field specialist now:</p>
                    <button
                      onClick={() => assignTech(b.id)}
                      className="bg-[#00e5ff]/10 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black font-orbitron font-bold text-[10px] px-3 py-1.5 rounded-md border border-[#00e5ff]/40 transition-all tracking-wider uppercase cursor-pointer"
                    >
                      Assign Inspector
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-[#8a95aa]">
                <span className="flex items-center gap-1">
                  <Clock size={11} /> Ready at {b.timestamp}
                </span>

                <div className="flex items-center gap-2">
                  {tech && b.status !== 'Completed' && (
                    <button
                      onClick={() => onUpdateStatus(b.id, 'Completed')}
                      className="text-[#00ffaa] hover:underline flex items-center gap-1 font-semibold uppercase tracking-wider"
                    >
                      <CheckCircle2 size={11} /> Mark Serviced
                    </button>
                  )}
                  <button
                    onClick={() => onCancelBooking(b.id)}
                    className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                    title="Remove booking"
                  >
                    <Trash2 size={11} /> Cancel
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
