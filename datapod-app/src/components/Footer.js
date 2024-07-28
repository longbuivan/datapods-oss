import React from 'react';

const Footer = () => {
  return (

      <div class="container mx-auto px-4 pt-20">
        <div class="Youtube ">
        <h1 class="text-3xl fonat-semibold text-xl decoration	underline-offset-1 italic">P/S:</h1>
        <h2 class="text-3xl fonat-semibold text-xl decoration	underline-offset-1 italic">If you want to check how I improve Productivity, check it out</h2>
        <a href="https://youtu.be/2nKRHoWemDQ">
                  <img class="border border-slate-300 dark:border-zinc-700 rounded-xl" alt="Youtube banner" width="1440" height="720" src="M1-Setup.png" loading="lazy" decoding="async"></img>
                  <div class="mt-3 text-xl text-cyan-800">Youtube: How to Setup your machine as Data Engineer</div>
                  <div class="opacity-70">Stack: Homebrew, iTerm2, Custom terminal,Containers, Others...</div>
          </a>
        </div>
        <br/>
        <div>
            <h2 class="text-3xl fonat-semibold text-xl decoration	underline-offset-1 italic">Created with:</h2>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li class="text-center mb-4">
                <a href="https://tailwindcss.com/">
                  <img class="border border-slate-300 dark:border-zinc-700 rounded-xl" alt="Tailwind banner" width="1440" height="720" src="tailwind-banner.jpg" loading="lazy" decoding="async"></img>
                  <div class="mt-3 text-xl">Tailwind</div>
                  <div class="opacity-70">Dynamic Tailwind CSS</div>
                </a>
              </li>
              <li class="text-center mb-4">
                <a href="https://react.dev/">
                  <img class="border border-slate-300 dark:border-zinc-700 rounded-xl" alt="ReactJs banner" width="1440" height="720" src="react-banner.jpg" loading="lazy" decoding="async"></img>

                  <div class="mt-3 text-xl">ReactJs</div>
                  <div class="opacity-70">
                    Fantastic Framework for building applications
                  </div>
                </a>
              </li>
            </ul>
        </div>  
        <footer class="relative bg-blueGray-700 pt-8 pb-6">
            <div class="flex-center text-center lg:text-center ">
              <h4 class="text-3xl fonat-semibold text-blueGray-700 ">Boosting up productivity!</h4>
            </div>
            <div class="flex flex-wrap items-center">
              <div class="w-full md:w-4/12 px-4 mx-auto text-center">
                <div class="text-sm text-blueGray-700 font-semibold py-1">
                
                  Copyright © <span id="get-current-year">2023 - Long Bui. All rights reserved.</span>
                </div>
              </div>
            </div>
        </footer>
      </div>
  
  );
};

export default Footer;
