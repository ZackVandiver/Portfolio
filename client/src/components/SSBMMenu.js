import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const menuOptions = [
  "Projects",
  "Technologies",
  "About Me",
  "Settings",
];

export default function SSBMMenu() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : menuOptions.length - 1));
      } else if (event.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev < menuOptions.length - 1 ? prev + 1 : 0));
      } else if (event.key === "Enter") {
        console.log(`Selected: ${menuOptions[selectedIndex]}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* ✅ Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/videos/MainMenuLoop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* ✅ Optional Blur Overlay for Readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 video-overlay z-[-1]"></div>

      {/* ✅ Menu UI */}
      <div className="flex justify-center items-center h-screen text-white relative">
      <div className="relative w-[500px] h-[300px] flex flex-col items-center gap-4">
  {menuOptions.map((option, index) => (
    <motion.div
    key={option}
    initial={{ opacity: 0.8, scale: 1 }}
    animate={{
      scale: selectedIndex === index ? 1.2 : 1,
      opacity: selectedIndex === index ? 1 : 0.8,
    }}
    transition={{
      duration: 0.08, // Near instant speed
      ease: "easeOut", // Fast snappy exit
    }}
    className={`ssbm-button ${selectedIndex === index ? "selected" : ""}`}
  >
    <span>{option}</span>
  </motion.div>
  ))}
</div>
      </div>
    </div>
  );
}
