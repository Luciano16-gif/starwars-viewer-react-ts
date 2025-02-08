import ReactDOM from 'react-dom/client';

import './index.css';

import Home from './pages/Home';

import People from './pages/people/People';
import IndividualPeople from './pages/people/IndividualPeople';

import Planets from './pages/Planets/Planets';
import IndividualPlanets from './pages/Planets/IndividualPlanets';

import Films from './pages/films/Films';

import Starships from './pages/starships/Starships';
import IndividualStarhips from './pages/starships/IndividualStarships';

import Layout from './components/layout/layout';

import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/people" element={<People/>} />
        <Route path="/people/:id" element={<IndividualPeople/>} />
        <Route path="/Planets" element={<Planets/>} />
        <Route path="/Planets/:id" element={<IndividualPlanets/>} />
        <Route path="/Films" element={<Films/>} />
        <Route path="/Starships" element={<Starships/>} />
        <Route path="/Starships/:id" element={<IndividualStarhips/>} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

