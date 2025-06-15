import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

// Import components that will be loaded immediately
import Layout from './components/layout/layout';
import Home from './pages/Home';

// doing lazy oading to improve performance on mobile
const People = lazy(() => import('./pages/people/People'));
const IndividualPeople = lazy(() => import('./pages/people/IndividualPeople'));
const Planets = lazy(() => import('./pages/Planets/Planets'));
const IndividualPlanets = lazy(() => import('./pages/Planets/IndividualPlanets'));
const Films = lazy(() => import('./pages/films/Films'));
const IndividualFilm = lazy(() => import('./pages/films/IndividualFilm'));
const Starships = lazy(() => import('./pages/starships/Starships'));
const IndividualStarships = lazy(() => import('./pages/starships/IndividualStarships'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={
          <Home />
        } />
        
        <Route path="/people" element={
            <People />        
        } />
        
        <Route path="/people/:id" element={
            <IndividualPeople />        
        } />

        <Route path="/Planets" element={
            <Planets />       
        } />
        
        <Route path="/Planets/:id" element={
            <IndividualPlanets />
        } />
        
        <Route path="/Films" element={
            <Films />
        } />
        
        <Route path="/Films/:id" element={
            <IndividualFilm />
        } />

        <Route path="/Starships" element={
   
            <Starships />  
        } />
        
        <Route path="/Starships/:id" element={
            <IndividualStarships /> 
        } />
      </Routes>
    </Layout>
  </BrowserRouter>
);