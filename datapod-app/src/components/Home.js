import React, { useState, useEffect } from "react";
import Header from "./Header";

import {
  DownloadIcon,
  ExternalLinkIcon,
  MoonIcon, SunIcon, MenuIcon, XIcon
} from "@heroicons/react/outline";
import Nav from "./Nav";
import downloadDockerFiles from "./Download";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const TypingText = ({ text, typingSpeed }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, typingSpeed);
      return () => clearInterval(interval);
    }, [text, typingSpeed]);

    return <span>{displayText}</span>;
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white dark:bg-black text-black dark:text-white">
        <header className="shadow mx-auto py-1">
          <div className="container mx-auto px-4 py-1 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={"icon.svg"} alt="DataPods" className="h-8" href="/"/>
              <h1 className="text-xl font-bold">DataPods</h1>
            </div>
            <nav className="hidden md:flex md:items-center md:space-x-4 ml-4">
            <a href="/" className="block text-sm md:text-base py-2 md:py-0">
            Home
              </a>
              <a href="/services"
                className="block text-sm md:text-base py-2 md:py-0">
                Services
              </a>
              <a href="/docs" className="block text-sm md:text-base py-2 md:py-0">
                Docs
              </a>
              <a href="https://de-book.longdatadevlog.com" className="block text-sm md:text-base py-2 md:py-0">
                Knowledge Base
              </a>
              {/* <a href="https://blogs.longdatadevlog.com" className="block text-sm md:text-base py-2 md:py-0">
                About
              </a> */}

            </nav>
          <div className="flex items-center space-x-4">
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
              <button
                onClick={toggleNav}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 md:hidden"
              >
                {isNavOpen ? (
                  <XIcon className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
              </div>
              </div>
              <nav
            className={`${
              isNavOpen ? "block" : "hidden"
            } md:hidden px-4 pb-4`}
          >
            <a href="/" className="block text-sm md:text-base py-2 md:py-0">
              Home
            </a>
            <a
              href="/services"
              className="block text-sm md:text-base py-2 md:py-0"
            >
              Services
            </a>
            <a href="/docs" className="block text-sm md:text-base py-2 md:py-0">
              Docs
            </a>
            <a
              href="https://de-book.longdatadevlog.com"
              className="block text-sm md:text-base py-2 md:py-0"
            >
              Knowledge Base
            </a>
          </nav>
        </header>

        <div className="p-6">
          <div className="container mx-auto px-6 md:px-4 text-center mb-4">
            <p className="text-2xl md:text-4xl leading-relaxed">
              <strong>
                <TypingText
                  text="With DataPods, an open-source & self-hostable data platform, quickly bring your data into Production..."
                  typingSpeed={30}
                />
              </strong>
            </p>
          </div>

          <div className="flex flex-col md:flex-row m-5 justify-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={() => {
                // Add download functionality here
              }}
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-400 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2"
            >
              <ExternalLinkIcon className="h-5 w-5" />
              <a href="/contact" className="">Managed Service</a>
            </button>
            <button
              onClick={() => {
                // Add download functionality here
              }}
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-400 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2"
            >
              <DownloadIcon className="h-5 w-5" />
              <a href="/docs">Self-hosted</a>
            </button>
          </div>
          <div className="header-title pb-5 text-xl flex justify-center items-center">
            <span className="text-yellow-500 hover:text-orange-500 underline">
              <a href="/docs">Screenshots</a>
            </span>
          </div>
        </div>
        <Header />

        <main className="container mx-auto px-8 py-8">
          <section className="max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="dark:bg-gray-900 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">Mass Integration</h2>
                <p>Collecting, transforming various sources.</p>
              </div>
              <div className="dark:bg-gray-900 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">Unified Data</h2>
                <p>Centralizing data, super formats.</p>
              </div>
              <div className="dark:bg-gray-900 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">Advanced Analytics</h2>
                <p>Extracting insight, data as domain.</p>
              </div>
              <div className="dark:bg-gray-900 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">HyperScale & Portable</h2>
                <p>ScaleFast, deploy everywhere.</p>
              </div>
            </div>
          </section>

          <section className="max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4">Services Collection</h2>
            <div>With <span className="text-green-800 text-xl"><a>essential</a></span> of data platform, focusing on open-source-software, and customizable</div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <img
                src="assets/banner/docker.jpeg"
                alt="Docker"
                className="w-24 h-16 rounded-lg shadow-md"
              />
              <img
                src="assets/banner/metabase.jpeg"
                alt="Metabase"
                className="w-24 h-16 rounded-lg shadow-md"
              />
              <img
                src="assets/banner/postgres.jpeg"
                alt="PostgreSQL"
                className="w-24 h-16 rounded-lg shadow-md"
              />
              <img
                src="assets/banner/mage-ai.jpeg"
                alt="Mage AI"
                className="w-24 h-16 rounded-lg shadow-md"
              />
              <img
                src="assets/banner/more.svg"
                alt="More"
                className="w-24 h-16 rounded-lg shadow-md p-2"
              />
            </div>
          </section>

          <section className="max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4">Support and Contribution</h2>
            <p className="mb-4">
              Check out the Repository on GitHub and contribute to the project.{" "}
              <a
                href="https://github.com/longbuivan/datapods-oss"
                className="text-blue-500 underline"
              >
                Repository on GitHub
              </a>
            </p>
          </section>
        </main>

        <footer className="py-4">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 DataPods. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
