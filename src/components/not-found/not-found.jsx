import React from "react"
import './index.scss'
import { Link } from "react-router-dom"
// Cuando se usan imagenes dentro del proyecto, es necesario importarlas

const NotFound = () => (
    <>
        <div className="not-found-container">
            <div>
                <p className="not-found-text">
                    Error 404
                </p>
                <p className="not-foun-description">
                    Page not found :c
                </p>
            </div>
            <button className="not-found-button">
                <Link to='/'>
                    Inicio
                </Link>
            </button>
        </div>
    </>
)

export default NotFound