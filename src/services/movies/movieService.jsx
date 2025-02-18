
import axios from 'axios'

// Importmaos las variables de entorno que contienen el URL de la API
import { API_URL, moviesEndpoint } from '../../consts'

/*******  Funciones que accederan al API para un CRUD a la base de datos *******/

// Este servicio consulta el get de la API para obtener peliculas segun algunos parametros, 
    /*
        -> Si se obtiene un mmovieId, quiere decir que se esta buscando una pelicula especifica por id y esta se manda en la URL de la API
        -> Si se obtiene algun tag, quiere decir que se estan filtrando peliculas por tag y se manda como parametro de la URL a la API
    */
export const getMoviesService = async (movieId, tags) => {
    try{
        const response = await axios.get(`${API_URL}${moviesEndpoint}${movieId ? movieId : ''}${tags ? `?tags=${tags}` : ''}`)
        console.log('tags recibidos en el servicio',tags)
        console.log('movie recibida en el servicio',movieId)
        
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

// Servicio que se encarga de guardar una nueva pelicula en la base de datos
export const createMovieService = async (movieData) => {
    try{
        const response = await axios.post(`${API_URL}${moviesEndpoint}`, movieData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
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
            return {
                movie: response.data.data,
                message : response.data.message
            }
        }
    }catch(error){
        // Si hay algun error externo
        return {
            hasError: true,
            error: error.message
        }
    }
}

// Este servicio hace la consulta a la API para actualizar los datos de una pelicula, usa el movieId para identificar la pelicula y guardar los nuevos datos de 'movieData'
export const updateMovieByIdService = async (movieId, movieData) => {
    try{
        const response = await axios.put(`${API_URL}${moviesEndpoint}${movieId}`, movieData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
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
            return {
                movie: response.data.data,
                message : response.data.message
            }
        }
    }catch(error){
        // Si hay algun error externo
        return {
            hasError: true,
            error: error.message
        }
    }
}

// Este servicio hace la consulta a la API para eliminar una pelicula segun su ID
export const deleteMovieByIdService = async movieId => {
    try{
        const response = await axios.delete(`${API_URL}${moviesEndpoint}${movieId}`)
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
            return {
                movie: response.data.data,
                message : response.data.message
            }
        }
    }catch(error){
        // Si hay algun error externo
        return {
            hasError: true,
            error: error.message
        }
    }
}