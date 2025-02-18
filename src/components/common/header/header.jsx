
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./index.scss"

// Creamos nuestro componente header (Este deberia estar presente en toda la pagina en la parte superior)
const Header = () => {
    // Utilizamos el state para guardar lo que se ponga en buscar y navigate para navegar con los tags
    const navigate = useNavigate()

    // Meteodo que se ejecutara al precionar el boton
    const handleSearch = () => {
        
    }
    return (
        <>
            <header className = "header-container">
                <ul>
                    <li>
                        <Link to={"/"}>| Inicio |</Link>
                    </li>
                    <li>
                        <Link to={'/movies'}>| Peliculas |</Link>
                    </li>
                    <li>
                        <Link to={'/movies/create'}>| Crear Pelicula |</Link>
                    </li>
                </ul>
                <div className="search-container">
                    <input type="text" name="search-input" placeholder="Buscar..."/>
                    <button>Buscar</button>
                </div>
            </header>
        </>
    )
}

export default Header