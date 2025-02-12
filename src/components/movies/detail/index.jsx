
import React, { Component } from "react"
import { useParams } from "react-router-dom"
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

const DetailComponent = ({movie}) => (
    <>
    <div className="movie-detail-container">
        <p>{movie.title}</p>
    </div>
    </>
)


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
