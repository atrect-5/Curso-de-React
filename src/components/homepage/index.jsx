import React from "react"
import './index.scss'
import { Link } from "react-router-dom"
// Cuando se usan imagenes dentro del proyecto, es necesario importarlas
import AzulSchoolLogo from '../../assets/Azul-School-Logo.png'

const HomePage = () => (
    <>
        <div className="welcome-container">
            <img src={AzulSchoolLogo} alt="react-logo" />
            <p className="welcome-text">
                The best movie platform, from Azul School
            </p>
            <button className="welcome-button">
                <Link to='/peliculas'>
                    Ver peliculas
                </Link>
            </button>
        </div>
    </>
)

export default HomePage