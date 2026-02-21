"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiMusic } from "react-icons/fi";
import { IoPauseCircle } from "react-icons/io5";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const targetVolume = 0.25;

  // Auto-play on first user interaction (scroll, click, touch)
  useEffect(() => {
    const handleInteraction = () => {
      if (hasInteracted) return;
      setHasInteracted(true);

      const audio = audioRef.current;
      if (!audio) return;

      audio.volume = 0;
      audio.play().then(() => {
        gsap.to(audio, { volume: targetVolume, duration: 2 });
        setIsPlaying(true);
      }).catch(() => {
        // Silently ignore autoplay restrictions so the console stays clean.
        // The user can still play the music manually via the button.
      });
    };

    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    window.addEventListener("pointerdown", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      gsap.to(audio, {
        volume: 0,
        duration: 0.8,
        onComplete: () => audio.pause(),
      });
      setIsPlaying(false);
    } else {
      audio.volume = 0;
      audio.play().then(() => {
        gsap.to(audio, { volume: targetVolume, duration: 1 });
        setIsPlaying(true);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        <source src="/theme.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-50 rounded-full w-10 h-10 flex items-center justify-center shadow-xl transition-all duration-300 ${isPlaying
          ? "bg-accent text-white scale-110"
          : "bg-secondary text-white hover:bg-accent"
          }`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <IoPauseCircle className="text-lg" />
        ) : (
          <FiMusic className="text-sm" />
        )}
      </button>
    </>
  );
};

export default MusicPlayer;
