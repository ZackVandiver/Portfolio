import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Menu definitions remain the same
const mainMenuOptions = ["Projects", "Technologies", "About Me", "Settings"];
const subMenus = {
  Projects: ["Project #1", "Project #2", "Project #3", "Project #4"],
  Technologies: ["Frontend", "Backend", "Database", "AI"],
  "About Me": ["Locations", "Career", "Hobbies", "Socials"],
  Settings: ["Button #1", "Button #2", "Button #3", "Button #4"],
};

// Variants for push (entering) transitions
const variantsPushEnter = {
  initial: { opacity: 0, x: 300, y: 300, rotate: 45 },
  animate: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    rotate: 0, 
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: -300, 
    y: -300, 
    rotate: -45, 
    transition: { duration: 0.3, ease: "easeIn" }
  },
};

// Variants for pop (entering) transitions
const variantsPopEnter = {
  initial: { opacity: 0, x: -300, y: -300, rotate: -45 },
  animate: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    rotate: 0, 
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: 300, 
    y: 300, 
    rotate: 45, 
    transition: { duration: 0.3, ease: "easeIn" }
  },
};

// Static variants for the main menu (Menu 1)
const staticVariants = {
  initial: { opacity: 0, x: -300, y: -300, rotate: -45 },
  animate: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    rotate: 0, 
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: -300, 
    y: -300, 
    rotate: -45, 
    transition: { duration: 0.3, ease: "easeIn" }
  },
};

export default function SSBMMenu() {
  // menuStack tracks our menu history; starts with "main"
  const [menuStack, setMenuStack] = useState(["main"]);
  // prevMenu holds the menu that's transitioning out (if any)
  const [prevMenu, setPrevMenu] = useState(null);
  // transitionDirection can be "push" or "pop"
  const [transitionDirection, setTransitionDirection] = useState(null);
  // Track selected index for the active menu
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Use a ref to store the last transition timestamp.
  const lastTransitionTimeRef = useRef(0);

  const activeMenu = menuStack[menuStack.length - 1];
  const getOptions = (menu) =>
    menu === "main" ? mainMenuOptions : subMenus[menu] || [];
  const activeOptions = getOptions(activeMenu);

  // Determine active menu's animation variants based on direction.
  let activeVariants;
  if (transitionDirection === "push") {
    activeVariants = activeMenu === "main" ? staticVariants : variantsPushEnter;
  } else if (transitionDirection === "pop") {
    activeVariants = activeMenu === "main" ? staticVariants : variantsPopEnter;
  } else {
    activeVariants = { initial: { opacity: 1, x: 0, y: 0, rotate: 0 }, animate: { opacity: 1 } };
  }

  // Choose exit variants based on transition direction.
  let exitVariants;
  if (transitionDirection === "push") {
    exitVariants = variantsPushEnter;
  } else if (transitionDirection === "pop") {
    exitVariants = variantsPopEnter;
  } else {
    exitVariants = {};
  }

  // Reset previous menu and transition direction when exit completes.
  const handleExitComplete = () => {
    setPrevMenu(null);
    setTransitionDirection(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent new transitions if less than 350ms have passed.
      const now = Date.now();
      if (now - lastTransitionTimeRef.current < 350) return;

      switch (event.key) {
        case "ArrowUp":
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : activeOptions.length - 1
          );
          break;
        case "ArrowDown":
          setSelectedIndex((prev) =>
            prev < activeOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case "Enter":
        case "ArrowRight":
          if (activeMenu === "main") {
            lastTransitionTimeRef.current = Date.now();
            const newMenu = mainMenuOptions[selectedIndex];
            setPrevMenu(activeMenu);
            setMenuStack((prev) => [...prev, newMenu]);
            setSelectedIndex(0);
            setTransitionDirection("push");
          } else {
            console.log(`Selected: ${activeOptions[selectedIndex]}`);
          }
          break;
        case "Backspace":
        case "ArrowLeft":
          if (menuStack.length > 1) {
            lastTransitionTimeRef.current = Date.now();
            setPrevMenu(activeMenu);
            setMenuStack((prev) => prev.slice(0, prev.length - 1));
            setSelectedIndex(0);
            setTransitionDirection("pop");
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeOptions, activeMenu, menuStack, selectedIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video & Overlay */}
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
      <div className="ssbm-polygon-border"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/20 video-overlay z-[-1]"></div>

      {/* Animate both exiting and active menus concurrently */}
      <div className="flex justify-center items-center h-screen text-white relative">
        <AnimatePresence onExitComplete={handleExitComplete}>
          {prevMenu && (
            <motion.div
              key={`prev-${prevMenu}`}
              variants={exitVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute w-[500px] h-[300px] flex flex-col items-center gap-4"
            >
              {getOptions(prevMenu).map((option) => (
                <div key={option} className="ssbm-button">
                  <span>{option}</span>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div
            key={`active-${activeMenu}`}
            variants={activeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-[500px] h-[300px] flex flex-col items-center gap-4"
          >
            {activeOptions.map((option, index) => (
              <motion.div
                key={option}
                initial={{ scale: 1, opacity: 1 }}
                animate={
                  selectedIndex === index
                    ? { scale: [1, 1.2, 1], opacity: 1 }
                    : { scale: 1, opacity: 1 }
                }
                transition={
                  selectedIndex === index
                    ? { duration: 1.7, ease: "easeInOut", repeat: Infinity }
                    : { duration: 0 }
                }
                onClick={() => {
                  const now = Date.now();
                  if (now - lastTransitionTimeRef.current < 350) return;
                  if (selectedIndex === index) {
                    if (activeMenu === "main") {
                      lastTransitionTimeRef.current = Date.now();
                      const newMenu = mainMenuOptions[index];
                      setPrevMenu(activeMenu);
                      setMenuStack((prev) => [...prev, newMenu]);
                      setSelectedIndex(0);
                      setTransitionDirection("push");
                    } else {
                      console.log(`Selected: ${activeOptions[index]}`);
                    }
                  } else {
                    setSelectedIndex(index);
                  }
                }}
                className={`ssbm-button ${selectedIndex === index ? "selected" : ""}`}
              >
                <span>{option}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
