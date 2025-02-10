
import React from 'react'
import { Link } from 'react-router-dom'

import './notfound.scss'

const NotFound = () => (
    <>
        <div className="notFound-container">
            <div className='error-message'>
                <h1>Error 404</h1>
                <p>Pagina no encontrada</p>
            </div>
            <Link to="/">
                <button>
                    Volver al inicio
                </button>
            </Link>
        </div>
    </>
)

export {
    NotFound
}