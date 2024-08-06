import React from 'react'
import { Routes, Route } from 'react-router-dom'


// Aqui pondremos las rutas que hay dentro de nuestra aplicacion
const AppRoutes = () => (
    <Routes>
        <Route exact path='/' element={<p>Hello World from principal component</p>}  />
        <Route exact path='/peliculas' element={<p>Aun no se han cargado peliculas :c</p>} />
        <Route exact path='*' element={<p>Caray, ese no lo tenemos</p>} />
    </Routes>
)

export default AppRoutes