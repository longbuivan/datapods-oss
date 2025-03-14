// src/components/ApplicationSelector.js
import React, { useState } from 'react';

const ApplicationSelector = () => {
  const [selectedApp, setSelectedApp] = useState('');

  const handleSelection = (app) => {
    setSelectedApp(app);
  };

  // const getIframeSrc = () => {
  //   switch (selectedApp) {
  //     case 'mage':
  //       return 'https://mage.datapods-docker.orb.local';
  //     case 'airflow':
  //       return 'https://airflow.datapods-docker.orb.local';
  //     case 'superset':
  //       return 'https://nginx-superset.datapods-docker.orb.local';
  //     case 'metabase':
  //       return 'https://metabase.datapods-docker.orb.local';
  //     case 'postgres':
  //       return 'https://nginx-pgadmin.datapods-docker.orb.local';
  //     default:
  //       return '';
  //   }
  // };
  const getIframeSrc = () => {
    switch (selectedApp) {
      case 'mage':
        return 'https://mage.ai';
      case 'airflow':
        return 'https://airflow.apache.org/';
      case 'superset':
        return 'https://en.wikipedia.org/wiki/Apache_Superset';
      case 'metabase':
        return 'https://www.metabase.com/';
      case 'postgres':
        return 'https://en.wikipedia.org/wiki/PostgreSQL'
      default:
        return '/';
    }
  };

  return (
    <div className="flex-col p-10 items-center justify-center h-screen text-center bg-gray-800">
      <h2 className="text-2xl font-bold text-white mb-10">This features are in developments, please visit <span><a className='text-yellow-500 hover:text-orange-500 underline' href='/docs'> Screenshots</a> </span>for getting more about DataPods ...</h2>
      <h1 className="text-3xl font-bold text-white mb-2">Select an Application</h1>
      <div className="mb-4">
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-2 rounded m-2"
          onClick={() => handleSelection('mage')}
        >
          Mage
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded m-2"
          onClick={() => handleSelection('airflow')}
        >
          Airflow
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded m-2"
          onClick={() => handleSelection('superset')}
        >
          Superset
        </button>
        <button
          className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-2 rounded m-2"
          onClick={() => handleSelection('metabase')}
        >
          Metabase
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded m-2"
          onClick={() => handleSelection('postgres')}
        >
          PostgreSQL
        </button>
      </div>
      {selectedApp && (
        <iframe
          title={selectedApp}
          src={getIframeSrc()}
          className="w-full h-4/5 border-none mt-4"

          // sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      )}
    </div>
  );
};

export default ApplicationSelector;
