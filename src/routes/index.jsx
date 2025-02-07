
import React from 'react';
import { Routes, Route } from 'react-router-dom';


import { MovieList } from '../components/movies';
import HomePage from '../components/homepage/homepage';


// Declaramos las rutas como un functional component (En este caso no tendremos un state)
// Con parentesis significa que retornaremos directamente jsx
const RoutesOfApp = () => (
    <Routes>
        <Route exact path="/" element ={<HomePage/>} />
        <Route exact path='/movies' element = {<MovieList/>} />
        <Route path ="*" element={<h1>404 Not Found</h1>} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
);

export default RoutesOfApp;