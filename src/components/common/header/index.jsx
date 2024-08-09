import React from "react"
import './index.scss'
import { Link } from "react-router-dom"
//import searchImg from '../../../assets/search-img.png';

const Header = () => {
    return(
        <>
        <header className="header-container">
            <ul>
                <li>
                    <Link to='/'>Inicio</Link>
                </li>
                <li>
                    <Link to='/peliculas'>Peliculas</Link>
                </li>
                <li>
                    <Link to='/peliculas/crear'>Crear pelicula</Link></li>
            </ul>
            <div className="search-container">
                <input type="text" name="search" placeholder="Buscar Pelicula" />
                <button>Buscar</button>
            </div>
        </header>
        </>
    )
}

export default Header