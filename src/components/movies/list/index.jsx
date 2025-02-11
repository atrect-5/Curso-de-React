
// Componente en el que se obtendra la lista de peliculas de la API

// importamos Component para hacer un componente de clase
import React, { Component } from "react"
import moment from "moment/moment"

// importamos nuestros servicios 
import { getMoviesService } from "../../../services/"

// importmos los estilos
import './index.scss'

export default class MovieList extends Component {
    constructor() {
        super()
        this.state = {
            movies:[],
            isReady: false,
            hasError: false,
            error: null
        }
    }

    // Se ejecuta en cuanto el componente se renderiza
    componentDidMount = async () => {
        // Se llama al servicio que obtiene las peliculas de la api
        const movies = await getMoviesService()

        // Si no hay error guardamos la lista de peliculas, si hay error guardamos el error
        if (!movies.error) {
            this.setState({
                movies : movies,
                isReady : true
            })
        }else{
            this.setState({
                hasError : true,
                error : movies.error
            })
        }
    }

    render() {

        const { movies, isReady, hasError, error } = this.state

        // Cargamos el componente segun se necesita basandonos en el estado de la respuesta del API
        return (
            <>
                <p>La lista de peliculas:</p>
                {
                    isReady ? 
                        <ListComponent
                            movies={movies}
                        />
                        :
                        hasError ?
                            <ErrorComponent
                                error={error}
                            />
                            : <LoadingComponent/> 
                            
                }
            </>
        )
    }

}


// Creamos los componentes que se cargaran en la pantalla

// Componente para listar las peliculas que hay registradas
const ListComponent = (props) => (
    <>
        {
         // Revisamos que si hayan peliculas existentes   
         props.movies.length > 0 ?
            props.movies.map((movie) => (
                <MovieCard key={movie._id}
                    movie={movie}
                />
            ))
            : <p>No hay peliculas registradas aun</p>
        }
    </>
)

// Componente de pelicula individual
const MovieCard = ({movie}) => (
    <>
        <div className="movie-card-container">
            <div className="movie-card-info">
                <div className="movie-card-important">
                    <p className="movie-card-title">{movie.title}</p>
                    <p className="movie-card-description">{movie.description}</p>
                </div>
                <div className="movie-card-detail">
                    <p>
                        Costo de la entrada: <span>{movie.tiketPrice}</span>
                    </p>
                    <p>
                        Duracion de la pelicula: <span>{movie.duration} mins</span>
                    </p>
                    <p>
                        {
                            movie.isOnCinemas ? 
                                'Disponible en cines'
                                : 'No disponible en cines'
                        }
                    </p>
                </div>
                <div className="movie-card-schedules">
                    {
                        movie.schedules.length > 0 ?
                            <>
                            <p>Horarios disponibles: </p>
                            {
                                movie.schedules.map((schedule) => (
                                    <p key={schedule._id}>{moment(schedule.time).format('DD / MM - HH:mm')}</p>
                                ))
                            }
                            </>
                            : <p>No hay horarios disponibles</p>
                    }
                </div>
            </div>
        </div>
        <hr />
    </>
)


// Componente para mostrar los errores
const ErrorComponent = ({error}) => (
    <>
        <p>Hubo un error inesperado :c</p>
        <p> -{'>'} {error}</p>
    </>
)


// Componente que se muestra mientras se cargan las peliculas
const LoadingComponent = (props) => (
    <>
        <p>Obteniendo peliculas...</p>
    </>
)