
// Componente en el que se obtendra la lista de peliculas de la API

// importamos Component para hacer un componente de clase
import React, { Component } from "react"

// importamos nuestros servicios 
import { getMovies } from "../../../services/"

export default class MovieList extends Component {
    constructor() {
        super()
        this.state = {
            movies:[]
        }
    }

    // Se ejecuta en cuanto el componente se renderiza
    componentDidMount = async () => {
        await getMovies()
    }

    render() {
        return (
            <>
                <p>La lista de peliculas:</p>
            </>
        )
    }

}