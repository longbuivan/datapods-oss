import React, { useState } from "react";
import { MoonIcon, SunIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

const Docs = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white dark:bg-black text-black dark:text-white">
        <header className="shadow mx-auto py-1">
          <div className="container mx-auto px-4 py-1 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src={"icon.svg"} alt="DataPods" className="h-8" />
              <h1 className="text-xl font-bold">DataPods</h1>
            </div>
              <div className="hidden md:flex md:items-center md:space-x-4 ml-4">
                <a href="/" className="block text-base md:text-base py-2 md:py-0">
                  Home
                </a>
                <a
                  href="/services"
                  className="block text-base md:text-base py-2 md:py-0"
                >
                  Services
                </a>
                <a
                  href="/docs"
                  className="block text-base md:text-base py-2 md:py-0"
                >
                  Docs
                </a>
                {/* <a
                  href="https://de-book.longdatadevlog.com"
                  className="block text-base md:text-base py-2 md:py-0"
                >
                  Knowledge Base
                </a> */}
            {/* </div> */}
            {/* <div className="flex items-center space-x-4"> */}
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
            <a href="/" className="block text-base md:text-base py-2 md:py-0">
              Home
            </a>
            <a
              href="/services"
              className="block text-base md:text-base py-2 md:py-0"
            >
              Services
            </a>
            <a href="/docs" className="block text-base md:text-base py-2 md:py-0">
              Docs
            </a>
            {/* <a
              href="https://de-book.longdatadevlog.com"
              className="block text-base md:text-base py-2 md:py-0"
            >
              Knowledge Base
            </a> */}
          </nav>
        </header>

        <div className=" doc-container max-w-2xl mx-auto mb-8">
          <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Documentation</h1>

            <section className=" mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                How to Self-Host a Service
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                <ol className="list-decimal pl-8 mt-4">
                  <li>
                    Download Dockerfile from{" "}
                    <a
                      className="text-orange-800 text-xl"
                      href="https://github.com/longbuivan/dotfile/tree/main/datapods-oss"
                    >
                      DataPod-OSS
                    </a>
                  </li>
                  <li>Install necessary software and dependencies. (Docker)</li>
                  <li>
                    Download Docker Compose file and run this command
                    (`docker-compose up -d`)
                  </li>
                  <li>Ensure services are created and run.</li>
                  <li>
                    Monitor and maintain the service regularly. Access services
                    with corresponding ports
                  </li>
                </ol>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Benefits of Self-Hosting
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                <ul className="list-disc pl-8 mt-4">
                  <li>Full control over infrastructure and data.</li>
                  <li>Customization and flexibility.</li>
                  <li>Potential cost savings in the long run.</li>
                  <li>Ability to meet specific compliance requirements.</li>
                  <li>Independence from third-party providers.</li>
                </ul>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Why Use Managed Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                <ul className="list-disc pl-8 mt-4">
                  <li>
                    Offload infrastructure management and maintenance tasks.
                  </li>
                  <li>Access to specialized expertise and support.</li>
                  <li>Automatic scaling and high availability.</li>
                  <li>Reduced operational burden.</li>
                  <li>Faster time to market for projects.</li>
                </ul>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Benefits of Managed Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                <ul className="list-disc pl-8 mt-4">
                  <li>
                    Focus on core business activities rather than
                    infrastructure.
                  </li>
                  <li>Reliability and SLA-backed service guarantees.</li>
                  <li>Continuous updates and improvements.</li>
                  <li>Scalability to accommodate growing needs.</li>
                  <li>Access to cutting-edge technologies.</li>
                </ul>
              </p>
            </section>
          <h1 className="text-3xl font-bold mt-8 mb-2">Screenshots</h1>
          <h2 className="text-2xl font-semibold mb-4">
            Launch DataPods with Docker
          </h2>
          <section className="flex flex-col items-center justify-center mb-8">
            <div className="max-w-5xl grid grid-cols-1 gap-4">
              <img
                src="assets/demo/docker-compose-build.png"
                alt="docker build"
                className="w-small rounded-lg shadow-md"
              />
              <img
                src="assets/demo/docker-compose-up.png"
                alt="docker up"
                className="w-small rounded-lg shadow-md"
              />
              <img
                src="assets/demo/docker-containers.png"
                alt="docker containers"
                className="w-small rounded-lg shadow-md"
              />
              <h2 className="text-2xl font-semibold mb-4">
                Starting Application
              </h2>
              <img
                src="assets/demo/mage-pipeline.png"
                alt="mage pipeline"
                className="w-small rounded-lg shadow-md"
              />
              <img
                src="assets/demo/metabase-ui.png"
                alt="metabase ui"
                className="w-small rounded-lg shadow-md"
              />
              <img
                src="assets/demo/metabase-dashboard.png"
                alt="metabase dashboard"
                className="w-small rounded-lg shadow-md"
              />
              <img
                src="assets/demo/metabaseBookingPermDash.png"
                alt="metabase dashboard 2"
                className="w-small rounded-lg shadow-md"
              />
              <h2 className="text-2xl font-semibold mb-4">
                Cloud-Native Data Platform
              </h2>
              <img
                src="assets/demo/RenderDeploymentAccount.png"
                alt="deployment account"
                className="w-small rounded-lg shadow-md"
              />
            </div>
          </section>
        </div>
                  </div>

        <footer className="py-4">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 DataPods. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Docs;
