import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const menuOptions = [
  "Projects / Works",
  "Tech-Stack",
  "TL;DR",
  "Get in Touch",
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
    <div className="flex justify-center items-center h-screen bg-black text-white relative">
      <div className="relative w-[500px] h-[400px] flex flex-col items-center space-y-4">
        {menuOptions.map((option, index) => (
         <motion.div
         key={option}
         initial={{ opacity: 0.8, scale: 1 }}
         animate={{
           scale: selectedIndex === index ? 1.05 : 1,
           opacity: selectedIndex === index ? 1 : 0.7,
         }}
         transition={{ type: "spring", stiffness: 250, damping: 20 }}
         className={`relative flex items-center justify-center w-[320px] h-[60px] 
                     text-lg font-bold tracking-wider transition-all ssbm-button 
                     ${selectedIndex === index ? "selected" : ""}`}
       >
         <span>{option}</span>
       </motion.div>
       
        ))}
      </div>
    </div>
  );
}

