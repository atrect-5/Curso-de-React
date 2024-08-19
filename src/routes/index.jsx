import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../components/homepage'
import NotFound from '../components/not-found/not-found'


// Aqui pondremos las rutas que hay dentro de nuestra aplicacion
const AppRoutes = () => (
    <Routes>
        <Route exact path='/' Component={HomePage}  />
        <Route exact path='/peliculas' element={<p>Aun no se han cargado peliculas :c</p>} />
        <Route exact path='*' Component={NotFound} />
    </Routes>
)

export default AppRoutes