import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Clock, MapPin, Volume2, VolumeX } from 'lucide-react';
import { toJpeg } from 'html-to-image';

const DoubleHeartMerge = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 240 70" 
      className={className}
      style={{ overflow: 'visible' }}
      fill="none" 
      stroke="currentColor" 
    >
      <defs>
        <linearGradient id="heartGoldGradient" x1="0" y1="0" x2="240" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c5a365" />
          <stop offset="30%" stopColor="#f3e9c9" />
          <stop offset="50%" stopColor="#b8860b" />
          <stop offset="70%" stopColor="#f3e9c9" />
          <stop offset="100%" stopColor="#c5a365" />
        </linearGradient>
        <linearGradient id="heartGoldGradientFill" x1="0" y1="0" x2="240" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(197, 163, 101, 0.02)" />
          <stop offset="50%" stopColor="rgba(243, 233, 201, 0.15)" />
          <stop offset="100%" stopColor="rgba(184, 134, 11, 0.02)" />
        </linearGradient>
      </defs>

      {/* Terminal Dots */}
      <circle cx="10" cy="35" r="2.5" fill="url(#heartGoldGradient)" />
      <circle cx="230" cy="35" r="2.5" fill="url(#heartGoldGradient)" />

      {/* Left Stick / Line coming from left */}
      <motion.path
        d="M 10,35 L 100,35"
        stroke="url(#heartGoldGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1, 1, 1, 0],
          opacity: [0, 1, 0, 0, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          times: [0, 0.1125, 0.1875, 0.9875, 1],
          ease: "easeInOut"
        }}
      />

      {/* Right Stick / Line coming from right */}
      <motion.path
        d="M 230,35 L 140,35"
        stroke="url(#heartGoldGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1, 1, 1, 0],
          opacity: [0, 1, 0, 0, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          times: [0, 0.1125, 0.1875, 0.9875, 1],
          ease: "easeInOut"
        }}
      />

      {/* Interlocking Double Hearts in the Center */}
      <motion.g
        animate={{
          scale: [1, 1.05, 1, 1.03, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformOrigin: "120px 35px" }}
      >
        {/* Left Heart (Larger) */}
        <motion.path 
          d="M 0 10 C -10 -5, -25 5, -25 20 C -25 35, -5 50, 0 55 C 5 50, 25 35, 25 20 C 25 5, 10 -5, 0 10 Z"
          transform="translate(106, 12) rotate(-12) scale(0.65)"
          stroke="url(#heartGoldGradient)"
          strokeWidth="3"
          fill="url(#heartGoldGradientFill)"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, fillOpacity: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 0, 1, 1, 1, 1, 0],
            fillOpacity: [0, 0, 0, 1, 1, 0, 0],
            opacity: [0, 0, 1, 1, 1, 0, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            times: [0, 0.125, 0.275, 0.375, 0.875, 0.975, 1],
            ease: "easeInOut"
          }}
        />

        {/* Right Heart (Smaller) */}
        <motion.path 
          d="M 0 10 C -10 -5, -25 5, -25 20 C -25 35, -5 50, 0 55 C 5 50, 25 35, 25 20 C 25 5, 10 -5, 0 10 Z"
          transform="translate(130, 20) rotate(12) scale(0.52)"
          stroke="url(#heartGoldGradient)"
          strokeWidth="3"
          fill="url(#heartGoldGradientFill)"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, fillOpacity: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 0, 1, 1, 1, 1, 0],
            fillOpacity: [0, 0, 0, 1, 1, 0, 0],
            opacity: [0, 0, 1, 1, 1, 0, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            times: [0, 0.125, 0.275, 0.375, 0.875, 0.975, 1],
            ease: "easeInOut"
          }}
        />
      </motion.g>
    </svg>
  );
};

const EnvelopeScreen = ({ onOpen, onDownload, onPlayMusic }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (onPlayMusic) onPlayMusic();
    if (onDownload) onDownload();
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        animate={isOpen ? { y: 200, scale: 0.9, opacity: 0 } : { y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        className="relative w-[320px] h-[220px] md:w-[450px] md:h-[300px]"
      >
        {/* Envelope Base (Back) */}
        <div className="absolute inset-0 bg-[#0a0a0a] rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)]" />

        {/* Letter Inside */}
        <motion.div
          animate={isOpen ? { y: -300, scale: 1.1, opacity: 0, rotate: -2 } : { y: 0, scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-x-4 top-4 bottom-4 bg-[#f8f5f0] rounded flex flex-col items-center pt-8 z-10"
        >
          <div className="w-12 h-12 rounded-full border border-[#FF4D85]/30 mb-4 flex items-center justify-center shadow-[0_0_15px_rgba(255,77,133,0.1)]">
            <Heart className="w-5 h-5 text-[#FF4D85] fill-[#FF4D85]/20" />
          </div>
          <div className="w-16 h-[1px] bg-[#c5a365]/40 mb-4" />
          <p className="text-[#111] font-serif italic text-sm tracking-widest">You're Invited</p>
        </motion.div>

        {/* Front Cover (Pocket) */}
        <div className="absolute inset-0 z-20 pointer-events-none rounded-lg overflow-hidden">
          {/* Seamless Front Pocket */}
          <div className="absolute inset-0 bg-[#121212] [clip-path:polygon(0_0,0_100%,100%_100%,100%_0,50%_60%)] shadow-xl" />

          {/* Subtle Inner Edge to give thickness to the pocket */}
          <div className="absolute inset-0 [clip-path:polygon(0_0,0_100%,100%_100%,100%_0,50%_60%)] border-t border-white/[0.04]" />

          {/* Subtle Outer Edge */}
          <div className="absolute inset-0 border border-white/5 rounded-lg" />
        </div>

        {/* Top Flap */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
          className="absolute top-0 left-0 right-0 h-[60%] z-30"
        >
          {/* Flap shape */}
          <div className="absolute inset-0 bg-[#1a1a1a] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-2xl" />
          {/* Edge highlight */}
          <div className="absolute inset-0 [clip-path:polygon(0_0,100%_0,50%_100%)] border-b border-white/[0.06]" />

          {/* Wax Seal Container */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              disabled={isOpen}
              className="relative w-14 h-14 flex items-center justify-center cursor-pointer pointer-events-auto"
            >
              {/* Outer pink semi-transparent ring */}
              <div className="absolute inset-0 bg-[#FF4D85] opacity-30 rounded-full scale-[1.25]" />
              {/* Inner solid pink circle */}
              <div className="absolute inset-0 bg-[#FF2D65] rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.5)] border border-[#ff8fa3]/20" />
              {/* The heart */}
              <Heart className="relative z-10 w-5 h-5 text-white fill-white drop-shadow-sm" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  
  const [audio] = useState(() => {
    const sound = new Audio('/WhatsApp Audio 2026-05-21 at 10.01.56 AM.mpeg');
    sound.loop = true;
    return sound;
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = () => {
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(err => {
      console.log("Audio play failed:", err);
    });
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Audio play failed:", err);
      });
    }
  };

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const triggerDownload = async () => {
    const inviteElement = document.getElementById('downloadable-invite');
    if (inviteElement) {
      try {
        const dataUrl = await toJpeg(inviteElement, {
          quality: 0.95,
          pixelRatio: 2,
          backgroundColor: '#050505',
          cacheBust: true,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left'
          }
        });
        const link = document.createElement('a');
        link.download = 'Sounder_Weds_Sowndharya_Invitation.jpg';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Download failed:", err);
      }
    }
  };

  const handleHeartButtonClick = () => {
    setShowHeartAnimation(true);
    setTimeout(() => setShowHeartAnimation(false), 1200);
    triggerDownload();
  };

  const calendarEvent = {
    title: 'Sounder Weds Sowndharya',
    details: 'Wedding at Sri Kamatchi Amman Mahal, Kaithamalai, Uthukuli, Tiruppur',
    location: '11.174431,77.451212',
    start: '20260625T063000Z',
    end: '20260625T093000Z',
  };

  const openGoogleCalendar = () => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: calendarEvent.title,
      dates: `${calendarEvent.start}/${calendarEvent.end}`,
      details: calendarEvent.details,
      location: calendarEvent.location,
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
  };

  useEffect(() => {
    if (showEnvelope) return;

    const weddingDate = new Date('2026-06-25T12:00:00+05:30');
    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      if (difference <= 0) {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);

    const lenis = new Lenis({
      lerp: 0.05,
      duration: 1.5,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(countdownTimer);
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showEnvelope]);

  return (
    <div className="bg-black min-h-screen text-[var(--color-silver)] font-sans relative overflow-x-hidden z-10">
      <AnimatePresence>
        {showEnvelope && (
          <EnvelopeScreen 
            onOpen={() => setShowEnvelope(false)} 
            onDownload={triggerDownload} 
            onPlayMusic={startMusic} 
          />
        )}
      </AnimatePresence>

      {/* Floating Music Toggle Button */}
      {!showEnvelope && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-[8000] w-12 h-12 bg-black/60 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-[#FF4D85]/40 hover:shadow-[0_0_20px_rgba(255,77,133,0.3)] active:scale-95 transition-all duration-300 cursor-pointer"
          title={isPlaying ? "Mute Music" : "Play Music"}
        >
          {isPlaying ? (
            <div className="flex items-end justify-center gap-[2.5px] h-3.5 pb-[2px]">
              <span className="w-[3px] h-2 bg-[#FF4D85] rounded-full sound-wave-bar sound-wave-bar-1" />
              <span className="w-[3px] h-3.5 bg-[#FF4D85] rounded-full sound-wave-bar sound-wave-bar-2" />
              <span className="w-[3px] h-1.5 bg-[#FF4D85] rounded-full sound-wave-bar sound-wave-bar-3" />
              <span className="w-[3px] h-3 bg-[#FF4D85] rounded-full sound-wave-bar sound-wave-bar-4" />
            </div>
          ) : (
            <VolumeX className="w-5 h-5 text-white/60" />
          )}
        </motion.button>
      )}

      {/* Floating Download Button */}
      {!showEnvelope && (
        <>
          <AnimatePresence>
            {showHeartAnimation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="fixed bottom-8 right-8 z-[7999] w-14 h-14"
              >
                <div className="absolute inset-0 rounded-full bg-[#FF4D85]/20 blur-xl" />
                <motion.span
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -70, opacity: [0, 1, 0] }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FF4D85]"
                >
                  <Heart className="w-5 h-5" />
                </motion.span>
                <motion.span
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ x: -32, y: -32, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FF4D85]"
                >
                  <Heart className="w-3 h-3" />
                </motion.span>
                <motion.span
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ x: 32, y: -24, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FF4D85]"
                >
                  <Heart className="w-3 h-3" />
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleHeartButtonClick}
            className="fixed bottom-8 right-8 z-[8000] w-14 h-14 bg-[#FF4D85] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,77,133,0.5)] border border-white/20 cursor-pointer"
          >
            <Heart className="w-6 h-6 text-white fill-white heartbeat" />
          </motion.button>
        </>
      )}

      {/* Custom Cursor */}
      {!showEnvelope && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[9000] mix-blend-difference flex items-center justify-center hidden md:flex"
          animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        >
          <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]" />
        </motion.div>
      )}

      {/* Hero Section */}
      
        <div className="z-10 flex flex-col items-center mt-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="w-64 h-80 md:w-96 md:h-[30rem] relative silver-border p-2 glass-panel"
          >
            <div className="w-full h-full relative overflow-hidden">
              <img
                src="/hero.jpg"
                alt="Sounder Weds Sowndharya"
                className="w-full h-full object-cover saturate-[0.2] contrast-125 brightness-90 hover:saturate-100 hover:contrast-100 hover:brightness-100 transition-all duration-1000 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-center mt-12 flex flex-col items-center"
          >
            <h1 className="text-6xl md:text-8xl font-serif leading-none tracking-tight flex flex-col items-center mb-6">
              <span className="text-silver-gradient inline-block px-4 pb-2">Sounder</span>
              <motion.div
                animate={{ 
                  y: [0, -6, 0],
                  filter: [
                    "drop-shadow(0 0 8px rgba(197,163,101,0.2))",
                    "drop-shadow(0 0 18px rgba(197,163,101,0.6))",
                    "drop-shadow(0 0 8px rgba(197,163,101,0.2))"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="my-3 flex items-center justify-center w-80 max-w-full overflow-visible"
              >
                <DoubleHeartMerge className="w-full h-auto text-[#c5a365]" />
              </motion.div>
              <span className="text-silver-gradient inline-block px-4 pb-4">Sowndharya</span>
            </h1>
            <p className="tracking-[0.4em] text-xs md:text-sm uppercase text-white/40 mt-8 mb-10">Are Getting Married</p>
            <div className="mt-6 w-full max-w-xl mx-auto">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/50 mb-4">Countdown to the wedding</p>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-4xl md:text-5xl font-semibold text-white">{countdown.days}</p>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 mt-2">Days</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-4xl md:text-5xl font-semibold text-white">{countdown.hours}</p>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 mt-2">Hours</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-4xl md:text-5xl font-semibold text-white">{countdown.minutes}</p>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 mt-2">Minutes</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-4xl md:text-5xl font-semibold text-white">{countdown.seconds}</p>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 mt-2">Seconds</p>
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-4">25 June 2026 • 12:00 PM - 3:00 PM</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        >
        </motion.div>
  

      {/* Details Section */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center relative px-0 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-4xl w-full text-center"
        >
          <h2 className="text-5xl md:text-8xl font-serif text-white/10 tracking-tighter mb-12">25.06.2026</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-16">
            <div className="silver-border p-8 glass-panel group">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">When</p>
              <p className="text-xl md:text-2xl font-serif text-white group-hover:text-silver-gradient transition-colors">June 25th<br />2026</p>
            </div>

            <div className="silver-border p-8 glass-panel group">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">Time</p>
              <p className="text-xl md:text-2xl font-serif text-white group-hover:text-silver-gradient transition-colors">12:00 PM<br />3:00 PM</p>
            </div>

            <div className="silver-border p-8 glass-panel group">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">Where</p>
              <p className="text-xl md:text-2xl font-serif text-white group-hover:text-silver-gradient transition-colors">Sri Kamatchi Amman Mahal<br />Kaithamalai, Uthukuli, Tiruppur</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-0 relative z-10 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="w-full max-w-4xl glass-panel silver-border p-2 rounded-lg"
        >
          <div className="w-full h-[400px] bg-[#111] relative overflow-hidden rounded-t-md">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              title="Wedding Location"
              src="https://maps.google.com/maps?q=11.174431,77.451212&t=&z=15&ie=UTF8&iwloc=&output=embed"
              style={{ filter: "grayscale(100%) invert(92%) contrast(83%) hue-rotate(180deg)" }}
            ></iframe>
          </div>
          <div className="p-8 text-center flex flex-col items-center">
            <p className="text-white/70 text-xs md:text-sm tracking-[0.2em] uppercase leading-relaxed mb-6">
              Sri Kamatchi Amman Mahal<br />
              Kaithamalai, Uthukuli, Tiruppur
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=11.174431,77.451212"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 border border-white/30 text-white text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 rounded"
            >
              Open in Google Maps
            </a>
          </div>
        </motion.div>
      </section>

      {/* RSVP Section */}
      <section className="py-20 px-0 relative z-10">
        <div className="max-w-2xl mx-auto glass-panel silver-border p-12 text-center">
          <p className="tracking-[0.4em] text-[10px] uppercase text-white/40 mb-6">Join Us</p>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-10">Will you be there?</h2>

          <div className="space-y-4">
            <button
              onClick={openGoogleCalendar}
              className="w-full py-4 border border-white text-white tracking-[0.2em] text-xs uppercase hover:bg-white hover:text-black transition-all duration-500"
            >
              Add to Google Calendar
            </button>
            <button
              onClick={() => {
                const message = encodeURIComponent('🎊 Wedding Invitation 🎊\n\nSounder Weds Sowndharya\n\n' + window.location.href);
                window.open(`https://wa.me/?text=${message}`, '_blank');
              }}
              className="w-full py-4 border border-white text-white tracking-[0.2em] text-xs uppercase hover:bg-white hover:text-black transition-all duration-500"
            >
              Share on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-white/30 text-[10px] tracking-[0.3em] uppercase">
        Sounder Weds Sowndharya
      </footer>

      {/* Hidden Invitation for Download */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '800px', height: '1200px', overflow: 'visible', pointerEvents: 'none' }}>
        <div
          id="downloadable-invite"
          className="w-[800px] h-[1200px] bg-[#080505] p-12 flex flex-col items-center justify-between relative overflow-hidden"
          style={{ fontFamily: "'Playfair Display', serif", color: '#fff' }}
        >
          {/* Background Bokeh/Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,163,101,0.05)_0%,transparent_80%)] pointer-events-none" />
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#c5a365] opacity-5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#c5a365] opacity-5 rounded-full blur-3xl pointer-events-none" />

          {/* Outer and Inner Borders */}
          <div className="absolute inset-4 border-[1.5px] border-[#c5a365]/40 pointer-events-none" />
          <div className="absolute inset-6 border border-[#c5a365]/20 pointer-events-none" />

          {/* Corner Ornate SVGs */}
          <svg viewBox="0 0 100 100" className="absolute top-4 left-4 w-16 h-16 text-[#c5a365]/50 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M 0 10 L 10 10 C 25 10 25 25 40 25 L 90 25" />
            <path d="M 10 0 L 10 10 C 10 25 25 25 25 40 L 25 90" />
            <path d="M 10 10 Q 0 0 20 20" />
            <circle cx="20" cy="20" r="1.5" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 100 100" className="absolute top-4 right-4 w-16 h-16 text-[#c5a365]/50 pointer-events-none transform rotate-90" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M 0 10 L 10 10 C 25 10 25 25 40 25 L 90 25" />
            <path d="M 10 0 L 10 10 C 10 25 25 25 25 40 L 25 90" />
            <circle cx="20" cy="20" r="1.5" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 100 100" className="absolute bottom-4 left-4 w-16 h-16 text-[#c5a365]/50 pointer-events-none transform -rotate-90" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M 0 10 L 10 10 C 25 10 25 25 40 25 L 90 25" />
            <path d="M 10 0 L 10 10 C 10 25 25 25 25 40 L 25 90" />
            <circle cx="20" cy="20" r="1.5" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 100 100" className="absolute bottom-4 right-4 w-16 h-16 text-[#c5a365]/50 pointer-events-none transform rotate-180" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M 0 10 L 10 10 C 25 10 25 25 40 25 L 90 25" />
            <path d="M 10 0 L 10 10 C 10 25 25 25 25 40 L 25 90" />
            <circle cx="20" cy="20" r="1.5" fill="currentColor" />
          </svg>

          <div className="mt-8 mb-6 flex flex-col items-center z-10">
            <Heart className="w-4 h-4 text-[#c5a365]/70 mb-3" />
            <p className="text-[#c5a365] text-[10px] tracking-[0.4em] uppercase opacity-90 text-center">
              Together with their families
            </p>
          </div>

          {/* Adjusted Image Size and Arch Shape */}
          <div className="w-[300px] h-[360px] relative mb-14 z-10 flex-shrink-0 mt-2">
            <div className="absolute inset-[-6px] border border-[#c5a365]/40 rounded-t-full rounded-b-md" />
            <div className="absolute inset-[-2px] border border-[#c5a365]/20 rounded-t-full rounded-b-md" />

            <img
              src="/hero.jpg"
              alt="Sounder Weds Sowndharya"
              className="w-full h-full object-cover rounded-t-full rounded-b-md grayscale-[30%] saturate-[0.8] contrast-[1.1] brightness-[0.7] shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="flex flex-col items-center z-10 w-full mb-8">
            <h1 className="text-6xl text-[#c5a365] tracking-wide mb-3 font-serif">Sounder</h1>
            <span className="font-['Pinyon_Script'] text-5xl text-white mt-1 mb-1 leading-none z-20 opacity-95">Weds</span>
            <h1 className="text-6xl text-[#c5a365] tracking-wide mt-3 font-serif">Sowndharya</h1>
          </div>

          <div className="mb-10 flex flex-col items-center z-10">
            <Heart className="w-3 h-3 text-[#c5a365] mb-4 fill-[#c5a365]" />
            <p className="text-[#c5a365] text-[10px] tracking-[0.3em] uppercase opacity-80">
              Invite you to celebrate their wedding
            </p>
          </div>

          <div className="flex justify-between items-start w-[650px] mb-12 z-10 text-[#c5a365]">
            <div className="flex flex-col items-center flex-1">
              <Calendar className="w-6 h-6 mb-4 text-[#c5a365]/80" strokeWidth={1.5} />
              <p className="text-[10px] tracking-[0.2em] uppercase mb-2 opacity-80">June</p>
              <p className="text-4xl font-serif mb-2">25</p>
              <p className="text-[10px] tracking-[0.2em] uppercase opacity-80">2026</p>
            </div>

            <div className="w-[1px] h-24 bg-[#c5a365]/20 mt-4" />

            <div className="flex flex-col items-center flex-1">
              <Clock className="w-6 h-6 mb-4 text-[#c5a365]/80" strokeWidth={1.5} />
              <p className="text-xl tracking-widest font-serif mb-2 mt-4">12:00 PM</p>
              <p className="text-[9px] tracking-[0.2em] uppercase opacity-70">To 3:00 PM</p>
            </div>

            <div className="w-[1px] h-24 bg-[#c5a365]/20 mt-4" />

            <div className="flex flex-col items-center flex-1 px-2">
              <MapPin className="w-6 h-6 mb-4 text-[#c5a365]/80" strokeWidth={1.5} />
              <p className="text-[10px] tracking-[0.1em] uppercase mb-2 opacity-90 text-center leading-relaxed font-semibold">
                Sri Kamatchi<br />Amman Mahal
              </p>
              <p className="text-[8px] tracking-[0.1em] uppercase opacity-70 text-center leading-relaxed">
                Kaithamalai, Uthukuli<br />Tiruppur
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center z-10 mt-auto mb-8">
            <Heart className="w-3 h-3 text-[#c5a365] mb-4 fill-[#c5a365]" />
            <p className="text-[#c5a365] text-[9px] tracking-[0.2em] uppercase opacity-80 text-center leading-relaxed mb-4">
              Your presence will make our day<br />even more special
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
