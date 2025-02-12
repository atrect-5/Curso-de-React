
import React from 'react';
import { Routes, Route } from 'react-router-dom';


import { MovieList, HomePage, NotFound, MovieDetail } from '../components'


// Declaramos las rutas como un functional component (En este caso no tendremos un state)
// Con parentesis significa que retornaremos directamente jsx
const RoutesOfApp = () => (
    <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path='/movies' element = {<MovieList/>} />
        <Route exact path='/movies/create' element = {<p>Aqui se podran crear peliculas</p>} />
        <Route exact path="/movies/:movieId" element={<MovieDetail />} />
        <Route path ="*" element = {<NotFound/>} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
);

export default RoutesOfApp;