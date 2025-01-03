import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import People from './pages/people/People';
import IndividualPeople from './pages/people/IndividualPeople';

import Planets from './pages/Planets/Planets';


import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<People/>}  />
        <Route path="/:id" element={<IndividualPeople/>}  />

        <Route path="/Planets" element={<Planets/>}  />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


