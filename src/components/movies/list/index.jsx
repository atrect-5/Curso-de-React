import React, { Component } from "react";
import { getAllMovies } from "../../../services";

// Clase en la que se guardaran los datos de las peliculas de nuestro response API
export default class MovieList extends Component {

    constructor () {
        super()
        // Creamos el state de nuestro componente clase
        this.state = {
            movies : []
        }
    }

    // (Se ejecutara cuando el componente se renderiza)
    // Esta funcion es la que ejecutara la otra funcion de la peticion HTTP
    componentDidMount = async () => {
        await getAllMovies()
    }

    render () {
        return(
            <>
            <h1>La lista de peliculas se ha cargado o se ha intentado cargar</h1>
            </>
        )
    }

}