
import axios from 'axios'

// Importmaos las variables de entorno que contienen el URL de la API
import { API_URL, moviesEndpoint } from '../../consts'

/*******  Funciones que accederan al API para un CRUD a la base de datos *******/

// Funcion que obtiene todas las peliculas o una sola filtrada por id si se le pasa como parametro
export const getMoviesService = async (movieId) => {
    try{
        const response = await axios.get(`${API_URL}${moviesEndpoint}${movieId ? movieId : ''}`)
        if(response.data.error){
            // El servidor manda error
            return {
                hasError: true,
                error: response.data.error
            }
        }
        if (response.data){
            console.log(response.data.message)
            //console.log(response)        
            return response.data.data
        }
    }catch(error){
        // Si hay algun error externo
        return {
            hasError: true,
            error: error.message
        }
    }
}

/*
export const getOneMovieByIdService = async (movieId) => {
    try{
        const response = await axios.get(`${API_URL}${moviesEndpoint}${movieId}`)
        if(response.data.error){
            return {
                hasError: true,
                error: response.data.error
            }
        }
        if (response.data){
            console.log(response.data.message)            
            return response.data.data
        }
    }catch(error){
        return {
            hasError: true,
            error: error.message
        }
    }
}
*/