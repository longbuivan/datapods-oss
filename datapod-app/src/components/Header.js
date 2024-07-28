import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className="Header Container header-container">
      <div className="header-content">
        <div className='header-title pb-5 text-base whitespace-4'>Starting</div>
        <div className="header-description text-2xl font-mplus font-medium">DataPods
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="inline" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M268 112l144 144-144 144m124-144H100"></path></svg>
        <span className='text-orange-500'>Spark</span> Data Services</div>
      </div>
    </div>

  );
};

export default Header;
