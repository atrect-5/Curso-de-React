
import React, { Component } from "react"
import moment from "moment"
import { useParams, useNavigate } from "react-router-dom"
import { RingLoader } from "react-spinners"

import { getMoviesService } from "../../../services"

import './index.scss'

class MovieDetailClass extends Component {
    constructor(props){
        super(props)
        this.state = {
            movie : {},
            isReady: false,
            hasError: false,
            error: null
        }
    }
    
    componentDidMount = async () => {
        try{
            // Obtenemos la variable de la ruta
            const { movieId } = this.props.params       
            
            // Verificams que se haya mandado correctamente el id de la pelicula
            if (movieId) {
                // Se llama al servicio que obtiene las peliculas, pero con el id como parametro
                const movie = await getMoviesService(movieId)
        
                // Si no hay error guardamos la lista de peliculas, si hay error guardamos el error
                if (!movie.error) {
                    this.setState({
                        movie, // Equivalente a -> movie : movie , Esto por que se llaman igual
                        isReady : true
                    })
                }else{
                    this.setState({
                        hasError : true,
                        error : movie.error
                    })
                }
                
            }else{
                this.setState({
                    hasError : true,
                    error : 'No se obtuvo el id de la pelicula'
                })
            }
        }catch(error){
            this.setState({
                hasError : true,
                error
            })
        }

    }


    render () {
        const { movie, isReady, hasError, error } = this.state
        return (
            <>
                <div className="principal-container">
                    <p className="page-title">Datos de la pelicula: </p>
                    {
                        isReady ? 
                            <DetailComponent
                                movie={movie}
                            />
                            :
                            hasError ?
                                <ErrorComponent
                                    error={error}
                                />
                                : <LoadingComponent/> 
                                
                    }
                </div>
            </>
        )
    }
}

const DetailComponent = ({movie}) => {
    const navigate = useNavigate()

    const eliminarPelicula = () => {
        navigate(`/movies/delete/${movie._id}`)
    }
    const editarPelicula = () => {
        navigate(`/movies/edit/${movie._id}`)
    }
    return (
    <>
        <div className="movie-info">
            <div className="movie-detail-title">
                <img className="img-detail" src={movie.cover} alt="" />

                <p className="movie-title">{movie.title}</p>
            </div>
            
            <p className="movie-description">{movie.description}</p>
            
            <div className="movie-extra-info">
                <div className="movie-principal-detail">
                    <p>
                        Costo de la entrada: <span>${parseFloat(movie.tiketPrice).toFixed(2)}</span>
                    </p>
                    <p>
                        Duracion de la pelicula: <span>{movie.duration} mins</span>
                    </p>
                    <p>
                        A&ntilde;o en que salio la pelicula: <span>{movie.year}</span>
                    </p>
                    <p>
                        Clasificación: <span>{movie.contentRating}</span>
                    </p>
                    <p>
                        {
                            movie.isOnCinemas ? 
                                'Disponible en cines'
                                : 'No disponible en cines'
                        }
                    </p>
                </div>

                <div className="movie-schedules-detail">
                    {
                        movie.schedules.length > 0 ?
                            <>
                            <p>Horarios disponibles: </p>
                            {
                                movie.schedules.map((schedule) => (
                                    <p className="schedule-detail" key={schedule._id}>
                                    {moment(schedule.time).format('DD / MM - HH:mm')}
                                </p>
                                ))
                            }
                            </>
                            : <p>No hay horarios disponibles</p>
                    }
                </div>

                <div className="movie-tags-detail">
                {
                        movie.tags.length > 0 ?
                        <>
                        <p>Genero: </p>
                        {
                            movie.tags.map((tag) => (
                                <p className="tag-detail" key={tag._id}>
                                {tag}
                            </p>
                            ))
                        }
                        </>
                        : <p>No hay genero registrado</p>
                    }
                </div>

                

            </div>
            <hr />
            <div className="button-detail-container">
                <button onClick={editarPelicula}>Editar Pelicula</button>
                <button onClick={eliminarPelicula}>Eliminar Pelicula</button>
            </div>
            
        </div>
        </>
    )
}


// Componente para mostrar los errores
const ErrorComponent = ({error}) => (
    <>
        <p className="info-parragraf">Hubo un error inesperado :c</p>
        <p className="info-parragraf"> -{'>'} {error}</p>
    </>
)


// Componente que se muestra mientras se cargan las peliculas
const LoadingComponent = (props) => (
    <>
        <p className="info-parragraf">Obteniendo datos de la pelicula...</p>
        <RingLoader color="#ffffff" size={100}/>
    </>
)


// Componente funcional que obtiene los parámetros de la ruta y los pasa al componente de clase
const MovieDetail = (props) => {
    const params = useParams();
    return <MovieDetailClass {...props} params={params} />;
};

export default MovieDetail;
