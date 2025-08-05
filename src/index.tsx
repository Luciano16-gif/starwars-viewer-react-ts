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
const IndividualFilms = lazy(() => import('./pages/films/IndividualFilms'));
const Starships = lazy(() => import('./pages/starships/Starships'));
const IndividualStarships = lazy(() => import('./pages/starships/IndividualStarships'));
const Vehicles = lazy(() => import('./pages/vehicles/Vehicles'));
const IndividualVehicles = lazy(() => import('./pages/vehicles/IndividualVehicles'));
const Species = lazy(() => import('./pages/species/Species'));
const IndividualSpecies = lazy(() => import('./pages/species/IndividualSpecies'));

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

        <Route path="/planets" element={
            <Planets />       
        } />
        
        <Route path="/planets/:id" element={
            <IndividualPlanets />
        } />
        
        <Route path="/films" element={
            <Films />
        } />
        
        <Route path="/films/:id" element={
            <IndividualFilms />
        } />

        <Route path="/starships" element={
            <Starships />  
        } />
        
        <Route path="/starships/:id" element={
            <IndividualStarships /> 
        } />

        <Route path="/vehicles" element={
            <Vehicles />  
        } />
        
        <Route path="/vehicles/:id" element={
            <IndividualVehicles /> 
        } />

        <Route path="/species" element={
            <Species />  
        } />
        
        <Route path="/species/:id" element={
            <IndividualSpecies /> 
        } />
      </Routes>
    </Layout>
  </BrowserRouter>
);