
import React from "react";
import { Link } from "react-router-dom";

import "./index.scss"

// Creamos nuestro componente header (Este deberia estar presente en toda la pagina en la parte superior)
const Header = () => {
    return (
        <>
            <header className = "header-container">
                <ul>
                    <li>
                        <Link to={"/"}>| Inicio</Link>
                    </li>
                    <li>
                        <Link to={'/movies'}>| Peliculas</Link>
                    </li>
                    <li>
                        <Link to={'/movies/create'}>| Crear Pelicula</Link>
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