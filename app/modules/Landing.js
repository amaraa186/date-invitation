"use client";
import React, { useState, useRef, useEffect } from "react";

const PLAYLIST = [
  {
    title: "Blue",
    artist: "Dai Xinfei",
    src: "https://azure-novels.s3.us-east-1.amazonaws.com/Dai+Xinfei+-+Blue+(Acoustic+Unofficial+Music+Video).mp3",
    cover: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "ONLY",
    artist: "LeeHi",
    src: "https://azure-novels.s3.us-east-1.amazonaws.com/%EC%9D%B4%ED%95%98%EC%9D%B4+(LeeHi)+-+'ONLY'+Official+MV+(ENG_CHN).mp3",
    cover: "https://images.unsplash.com/photo-1414124488080-0188dcbb8834?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "fly away",
    artist: "Jang Yoon Ju",
    src: "https://azure-novels.s3.us-east-1.amazonaws.com/saib.+-+in+your+arms..mp3",
    cover: "https://images.unsplash.com/photo-1597891387547-99bb301e98ef?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

let daysTogether = Math.floor((Date.now() - new Date("2019-06-24").getTime()) / (1000 * 60 * 60 * 24));
let nextDate = {
  date: new Date(new Date().getFullYear(), 0, 11, 19, 30),
  name: "Italian Dinner Night",
  location: "Mongolia, Ulaanbaatar",
  time: "7:30 PM &bull; Friday",
}

export default function Landing() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  /* Weather State */
  const [weather, setWeather] = useState({
    current: null,
    nextDate: null,
  });

  const currentSong = PLAYLIST[currentSongIndex];

  /* Weather Fetching Effect */
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = 47.9184; // Ulaanbaatar
        const lon = 106.9177; // Ulaanbaatar

        // Fetch Current
        const currentRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=celsius`
        );
        const currentData = await currentRes.json();

        // Fetch Forecast
        const targetDate = nextDate.date.toISOString().split('T')[0];
        const forecastRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=celsius&start_date=${targetDate}&end_date=${targetDate}`
        );
        const forecastData = await forecastRes.json();

        setWeather({
          current: {
            temp: Math.round(currentData.current.temperature_2m),
            code: currentData.current.weather_code
          },
          nextDate: forecastData.daily ? {
            max: Math.round(forecastData.daily.temperature_2m_max[0]),
            min: Math.round(forecastData.daily.temperature_2m_min[0]),
            code: forecastData.daily.weather_code[0]
          } : null
        });

      } catch (error) {
        console.error("Weather fetch failed", error);
      }
    };

    fetchWeather();
  }, []);

  // Helper to map WMO codes
  const getWeatherDesc = (code) => {
    if (code === 0) return "Clear";
    if (code >= 1 && code <= 3) return "Partly Cloudy";
    if (code >= 45 && code <= 48) return "Fog";
    if (code >= 51 && code <= 67) return "Rain";
    if (code >= 71) return "Snow";
    return "Cloudy";
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div className="bg-neutral-950 text-neutral-400 min-h-screen flex flex-col items-center justify-center antialiased selection:bg-rose-500/30 selection:text-white overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* Current Weather Widget */}
      {weather.current && (
        <div className="absolute top-6 right-6 flex items-center gap-2 text-neutral-500 bg-neutral-900/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 z-20">
          <span className="iconify" data-icon="lucide:cloud-sun" data-width="16"></span>
          <span className="text-xs font-medium">{weather.current.temp}°C</span>
        </div>
      )}

      <main className="relative z-10 w-full max-w-md px-6 flex flex-col gap-6">
        {/* Date Counter Section */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/10 text-rose-300 text-xs font-medium mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
            </span>
            Still counting
          </div>
          <h1 className="text-7xl font-medium text-white tracking-tighter mb-2">{daysTogether}</h1>
          <p className="text-sm text-neutral-500 font-medium tracking-wide uppercase">
            Days Together
          </p>
        </div>

        {/* Next Date Card */}
        <div className="group relative bg-neutral-900/40 border border-white/5 backdrop-blur-md rounded-2xl p-1 overflow-hidden transition-all hover:bg-neutral-900/60 hover:border-white/10">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Next Date
              </span>
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-neutral-400">
                <span className="iconify" data-icon="lucide:calendar-heart" data-width="14"></span>
              </div>
            </div>

            {new Date() > nextDate.date ? (
              /* Message if date has passed */
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-sm text-neutral-400 font-medium">Coming Soon</p>
                <p className="text-xs text-neutral-600 mt-1">Releasing next date info...</p>
              </div>
            ) : (
              /* Event Details if date is upcoming (Oct 14) */
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center bg-neutral-800/50 rounded-lg px-3 py-2 border border-white/5 min-w-[3.5rem]">
                  <span className="text-[10px] text-rose-400 font-bold uppercase">
                    {nextDate.date.getMonth() + 1}
                  </span>
                  <span className="text-xl font-medium text-white tracking-tight">
                    {nextDate.date.getDate()}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-medium text-white tracking-tight">
                    {nextDate.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-neutral-400">
                    <span className="iconify" data-icon="lucide:map-pin" data-width="12"></span>
                    <span>{nextDate.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-neutral-500">
                    <span className="iconify" data-icon="lucide:clock" data-width="12"></span>
                    <span>{nextDate.time}</span>
                  </div>
                  {/* Next Date Weather Forecast */}
                  {weather.nextDate ? (
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-neutral-500">
                      <span className="iconify" data-icon="lucide:cloud-sun" data-width="12"></span>
                      <span>{getWeatherDesc(weather.nextDate.code)} • {weather.nextDate.max}° / {weather.nextDate.min}°</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-neutral-600">
                      <span className="iconify" data-icon="lucide:cloud-off" data-width="12"></span>
                      <span>Forecast n/a</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom progress decorative - Only show if active? optional, checking design. User didn't specify, keeping it. */}
          <div className="h-0.5 w-full bg-neutral-800 mt-2">
            <div className="h-full w-2/3 bg-rose-500/50"></div>
          </div>
        </div>

        {/* Music Player */}
        <div className="bg-neutral-900/40 border border-white/5 backdrop-blur-md rounded-2xl p-5 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={currentSong.src}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleNext}
          />

          <div className="flex gap-4 items-center">
            {/* Album Art */}
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
              <img
                src={currentSong.cover}
                className="w-full h-full object-cover"
                alt="Album Art"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Song Info */}
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start">
                <div className="truncate pr-2">
                  <h3 className="text-white text-sm font-medium tracking-tight truncate">
                    {currentSong.title}
                  </h3>
                  <p className="text-neutral-500 text-xs truncate">
                    {currentSong.artist}
                  </p>
                </div>
                <button className="text-rose-500/80 hover:text-rose-400 transition-colors">
                  <span className="iconify" data-icon="lucide:heart" data-width="16" data-fill="currentColor"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Controls & Progress */}
          <div className="mt-4">
            <div className="relative w-full h-4 flex items-center group/slider">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="relative z-10 w-full"
              />
            </div>

            <div className="flex justify-between text-[10px] text-neutral-500 font-mono -mt-1 mb-3">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between px-2">
              <button className="text-neutral-500 hover:text-white transition-colors">
                <span className="iconify" data-icon="lucide:shuffle" data-width="14"></span>
              </button>
              <div className="flex items-center gap-5">
                <button
                  onClick={handlePrev}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <span className="iconify" data-icon="lucide:skip-back" data-width="18" data-fill="currentColor"></span>
                </button>
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/10"
                >
                  {isPlaying ?
                    (<span className="iconify ml-0.5" data-icon="lucide:pause" data-width="14" data-fill="currentColor" />)
                    :
                    (<span className="iconify ml-0.5" data-icon="lucide:play" data-width="14" data-fill="currentColor" />)
                  }
                </button>
                <button
                  onClick={handleNext}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <span className="iconify" data-icon="lucide:skip-forward" data-width="18" data-fill="currentColor"></span>
                </button>
              </div>
              <button className="text-neutral-500 hover:text-white transition-colors">
                <span className="iconify" data-icon="lucide:repeat" data-width="14"></span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-6 text-[10px] text-neutral-600 font-medium tracking-tight">
        A&A FOREVER
      </footer>
    </div>
  );
}
