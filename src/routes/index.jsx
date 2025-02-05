
import React from 'react';
import { Routes, Route } from 'react-router-dom';


import HomePage from '../components/homepage/homepage';


// Declaramos las rutas como un functional component (En este caso no tendremos un state)
// Con parentesis significa que retornaremos directamente jsx
const RoutesOfApp = () => (
    <Routes>
        <Route exact path="/" Component ={HomePage} />
        <Route exact path='/movies' Component = {() => <p>Aqui se podran observar las peliculas proximamente...</p>} />
        <Route path ="*" Component={() => <h1>404 Not Found</h1>} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
);

export default RoutesOfApp;