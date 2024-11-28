import React, { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";

const Nav = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark"); // Toggle 'dark' class on <html> element
  };

  return (
    <div className="">
      <nav className="flex space-x-4">
        <a href="/" className="text-base md:text-base">
          Home
        </a>
        <a href="/services" className="text-base md:text-base">
          Services
        </a>

        <a href="/about" className="text-base md:text-base">
          About
        </a>
        <a
          href="https://de-book.longdatadevlog.com"
          className="text-base md:text-base"
        >
          More
        </a>
        {/* <a href="https://blogs.longdatadevlog.com" className="">
          About
        </a> */}
        {/* <a href="/pricing" className="">
                  Pricing
                </a> */}
        <button
          onClick={toggleDarkMode}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        >
          {darkMode ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>
      </nav>
    </div>
  );
};

export default Nav;
