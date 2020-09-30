import React, { useState } from 'react';
import './HomePage.scss';

export const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className='home-page'>
      <h2 className='home__header'>Home</h2>
    </section>
  );
};
