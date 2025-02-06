
import React from "react";
import { Link } from "react-router-dom";

import reactLogo from "../../assets/react-logo.png";
import azulSchoolLogo from "../../assets/azul-school-logo.png";

import './index.scss'

const HomePage = () => (
    <>
        <div className="homepage-container">
            <div className="img-div">
                <img src={reactLogo} alt="react-logo" />
                <img src={azulSchoolLogo} alt="azul-school-logo" />
            </div>
            <h1>Welcome to the best movies page</h1>
            <Link to="/movies">
                <button>
                    Ver peliculas
                </button>
            </Link>
        </div>
    </>
)

export default HomePage