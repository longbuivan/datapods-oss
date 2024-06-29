import React, { useState } from "react";
import {
  MoonIcon,
  SunIcon,
} from "@heroicons/react/outline";
import Nav from "./Nav";

import { CheckIcon } from "@heroicons/react/outline";

const Docs = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
            {/* <Nav isDarkMode={darkMode} toggleDarkMode={toggleDarkMode} /> */}
            <nav className="flex space-x-4">
              <a href="/" className="text-sm md:text-base">
                Home
              </a>
              <a href="/services" className="text-sm md:text-base">
                Services
              </a>
              <a href="/docs" className="text-sm md:text-base">
                Docs
              </a>
              <a href="https://de-book.longdatadevlog.com" className="text-sm md:text-base">
                More
              </a>
              {/* <a href="https://blogs.longdatadevlog.com" className="text-sm md:text-base">
                About
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

        <div className="max-w-2xl mx-auto mb-8">
          <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Documentation</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                How to Self-Host a Service
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                <ol className="list-decimal pl-8 mt-4">
                  <li>Download Dockerfile from <a className="text-orange-800 text-xl" href="https://github.com/longbuivan/dotfile/tree/main/datapods-oss">DataPod-OSS</a></li>
                  <li>Install necessary software and dependencies.(Docker)</li>
                  <li>Download Docker Compose file and run this command(`docker-compose up -d`)</li>
                  <li>Ensure services are created and run.</li>
                  <li>Monitor and maintain the service regularly. Access services with corresponding ports</li>
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
          </div>
          <h1 className="text-3xl font-bold mb-8">Screenshots</h1>
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
              <p className="text-gray-700 dark:text-gray-300">
                Writing Pipeline to collect and extract your data from varying sources...
              </p>
              <img
                src="assets/demo/mage-pipeline.png"
                alt="mage pipeline"
                className="w-small rounded-lg shadow-md"
              />
              <p className="text-gray-700 dark:text-gray-300">
                Visualize data with Business Intelligence Tool
              </p>
              <img
                src="assets/demo/metabase-ui.png"
                alt="metabase ui"
                className="w-small rounded-lg shadow-md"
              />
              <p className="text-gray-700 dark:text-gray-300">
                Empower and get insights from your data, including KPIs and metrics
              </p>
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
              <p className="text-gray-700 dark:text-gray-300">
                Deploy everything to the Cloud Service, with less managed, save costs, and focus on Business & Operations.
              </p>
              <img
                src="assets/demo/RenderDeploymentAccount.png"
                alt="deployment account"
                className="w-small rounded-lg shadow-md"
              />

            </div>
          </section>
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
