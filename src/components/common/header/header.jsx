
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./index.scss"

// Creamos nuestro componente header (Este deberia estar presente en toda la pagina en la parte superior)
const Header = () => {
    // Utilizamos el state para guardar lo que se ponga en buscar y navigate para navegar con los tags
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("") 

    // Meteodo que se ejecutara al precionar el boton
    const handleSearch = () => {
        // Checamos si hay algo escrito en 'buscar'
        if (searchTerm.trim()){
            // Navegamos a la lista de peliculas buscando las tags indicadas
            navigate(`/movies?tags=${searchTerm}`)
        }
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
                    <input type="text" name="search-input" placeholder="Buscar..."
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>{/* Al hacer un cambio en el input de buscar, se guarda el nuevo valor */}
                    <button onClick={handleSearch}>Buscar</button>
                </div>
            </header>
        </>
    )
}

export default Header