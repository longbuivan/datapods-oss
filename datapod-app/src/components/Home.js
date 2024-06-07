import React, { useState, useEffect } from "react";
import Header from "./Header";

import {
  DownloadIcon,
  ExternalLinkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/outline";
import Nav from "./Nav";
import downloadDockerFiles from "./Download";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
        <header className=" shadow">
          <div className="container mx-auto px-4 py-1 flex justify-between items-center">
            <div className="container mx-auto px-4 py-4 space-x-4 flex justify-left items-center">
              <img src={"icon.svg"} alt="DataPods" className="h-8" />{" "}
              {/* Use the imported SVG */}
              <h1 className="text-xl font-bold">DataPods</h1>
            </div>
            {/* <Nav /> */}
            <nav className="flex space-x-4">
              <a href="/" className="">
                Home
              </a>
              <a href="https://blogs.longdatadevlog.com" className="">
                About
              </a>
              <a
                href="/docs"
                className=""
              >
                Docs
              </a>
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
        </header>

        <div className="p-6">
          <div className="container mx-auto px-6 md-4 justify-center items-center mb-4">
            <p className="text-4xl leading-relaxed ">
              <strong>
                <TypingText
                  text="With DataPods, an open-source & self-hostable data platform, quickly bring your data into Production..."
                  typingSpeed={30}
                />
              </strong>
            </p>
          </div>

          <div className="flex m-5 justify-center mb-4 space-x-4">
            <button
              onClick={() => {
                // Add download functionality here
                // alert("Download");
              }}
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-400 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2"
            >
              <ExternalLinkIcon className="h-5 w-5" />
              {/* <span>Managed Services</span> */}
              <a href="/contact">Managed Service</a>
            </button>
            <button
              onClick={() => {
                // href = "https"
                // Add download functionality here
                // alert("Download");
              }}
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-400 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2"
                >
              <DownloadIcon className="h-5 w-5" />
              <a href="/docs">Self-hosted</a>
              {/* <span>Self-hosted</span> */}
            </button>

            {/* <button
              onClick={() => {
                // Add download functionality here
                alert("Download");
              }}
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-400 dark:hover:bg-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2"
            >
              <DownloadIcon className="h-5 w-5" />
              <span>Download</span>
            </button> */}
          </div>
          <div className='header-title pb-5 text-xl flex justify-center items-center  whitespace-4'>
              <span className='text-yellow-500 hover:text-orange-500 underline'>
                <a href="/docs">Screenshots</a>
            </span>
          </div>

        </div>

        <Header />

        <main className="container mx-auto px-2 py-8">
          {/* <section className="flex flex-col items-center justify-center mb-8">
            <div className="w-full mb-8">
              <img
            src="assets/background.jpeg"
            alt="Background"
            className="w-full rounded-lg shadow-md"
          />
            </div>
          </section> */}

          <section className="max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <div className="max-w-screen-lg mx-auto mb-8 flex justify-center gap-4">
              <div className="dark:bg-gray-900 dark:border-solid dark p-4 rounded-lg w-full md:w-80 shadow-md dark:shadow-color-gray dark:shadow-md-dark">
                <h2 className="text-xl font-bold mb-2">Mass Integration</h2>
                <p>Collecting, transforming various sources.</p>
              </div>

              <div className="dark:bg-gray-900 dark:border-solid dark p-4 rounded-lg w-full md:w-80 shadow-md dark:shadow-color-gray dark:shadow-md-dark">
                <h2 className="text-xl font-bold mb-2">Unified Data</h2>
                <p>Centralizing data, super formats.</p>
              </div>

              <div className="dark:bg-gray-900 dark:border-solid dark p-4 rounded-lg w-full md:w-80 shadow-md dark:shadow-color-gray dark:shadow-md-dark">
                <h2 className="text-xl font-bold mb-2">Advanced Analytics</h2>
                <p>Extracting insight, data as domain.</p>
              </div>

              <div className="dark:bg-gray-900 dark:border-solid dark p-4 rounded-lg w-full md:w-80 shadow-md dark:shadow-color-gray dark:shadow-md-dark">
                <h2 className="text-xl font-bold mb-2">
                  HyperScale & Portable
                </h2>
                <p>ScaleFast, deploy everywhere.</p>
              </div>
            </div>
          </section>

          {/* <section className="max-w-2xl mx-auto mb-8"> */}
          <section className="max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4">Services Collection</h2>
            <div className="max-w-40 max-h-20 mx-auto mb-8 flex justify-center gap-2">
              <img
                src="assets/banner/docker.jpeg"
                alt="Docker"
                className="w-small rounded-lg shadow-md"
              />
              
              <img
                src="assets/banner/metabase.jpeg"
                alt="Metabase"
                className="w-small rounded-lg shadow-md"
              />
              <img
                src="assets/banner/postgres.jpeg"
                alt="PostgreSQL"
                className="w-small rounded-lg shadow-md"
              />
              <img
                src="assets/banner/mage-ai.jpeg"
                alt="Mage AI"
                className="w-small rounded-lg shadow-md"
              />
            </div>
          </section>
          {/* This section is for Contributing */}
          <section className="max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Support and Contribution
            </h2>
            <p className="mb-4">
              Check out the Repository on GitHub and contribute to the project.
              <a href="https://github.com/longbuivan/datapods-oss">Repository on GitHub</a>
            </p>
            {/* < Pricing /> */}
        
            </section>
        </main>

        <footer className="py-4">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 DataPods. All rights reserved.</p>
          </div>
        </footer>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;