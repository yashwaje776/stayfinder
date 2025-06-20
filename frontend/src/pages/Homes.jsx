import React from 'react';
import Hero from '../components/Hero';
import Featured from '../components/Featured';
import ExclusivePage from '../components/Exclusivepage';

const Homes = () => {
  return (
    <div className="min-h-[70vh]">
      <Hero />
      <Featured />
      <ExclusivePage />
    </div>
  );
};

export default Homes;
