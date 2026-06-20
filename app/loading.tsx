export default function Loading() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#101415] min-h-screen w-full overflow-hidden">

      {/* Atmospheric ambient background glow */}
      <div className="absolute w-150 h-150 bg-[radial-gradient(circle,rgba(132,204,22,0.04)_0%,rgba(132,204,22,0)_70%)] rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>

      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* The Lumière "Light" Orb */}
        <div className="relative flex items-center justify-center w-16 h-16">
          {/* Outer expanding ripple */}
          <div style={{ animationDuration: '2s' }}
            className="absolute inset-0 rounded-full border border-[#9ee939]/30 animate-ping"></div>

          {/* Inner glowing core */}
          <div
            className="absolute inset-4 rounded-full bg-[#9ee939] shadow-[0_0_30px_rgba(132,204,22,0.6)] animate-pulse"
            style={{ animationDuration: '1.5s' }}
          ></div>
        </div>

        {/* Typography */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="font-['Playfair_Display'] text-[20px] md:text-[24px] tracking-[0.3em] uppercase text-[#e0e3e5] font-semibold">
            Lumière
          </h2>

          {/* Subtle pulsating subtext */}
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#9ee939] animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <p className="font-['Inter'] text-[12px] tracking-[0.2em] text-[#c1cab0]/60 uppercase">
              Curating experience
            </p>
            <div className="w-1 h-1 rounded-full bg-[#9ee939] animate-bounce" style={{ animationDelay: '150ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}