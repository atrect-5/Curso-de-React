import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../components/homepage'


// Aqui pondremos las rutas que hay dentro de nuestra aplicacion
const AppRoutes = () => (
    <Routes>
        <Route exact path='/' Component={HomePage}  />
        <Route exact path='/peliculas' element={<p>Aun no se han cargado peliculas :c</p>} />
        <Route exact path='*' element={<p>Caray, ese no lo tenemos</p>} />
    </Routes>
)

export default AppRoutes