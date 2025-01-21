import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import Home from './pages/Home';

import People from './pages/people/People';
import IndividualPeople from './pages/people/IndividualPeople';

import Films from './pages/films/Films';

import Planets from './pages/Planets/Planets';
import IndividualPlanets from './pages/Planets/IndividualPlanets';

import TopMenu from './components/menus/TopMenu';
import HamburgerMenu from './components/menus/HamburgerMenu';

import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
    <BrowserRouter>
      <TopMenu/>
      <HamburgerMenu/>
      <Routes>
        <Route path="/" element={<Home/>}  />

        <Route path="/people" element={<People/>}  />
        <Route path="/people/:id" element={<IndividualPeople/>}  />

        <Route path="/Films" element={<Films/>}  />

        <Route path="/Planets" element={<Planets/>}  />
        <Route path="/Planets/:id" element={<IndividualPlanets/>}/>
      </Routes>
    </BrowserRouter>
  //</React.StrictMode>
);


