
import axios from 'axios'

// Importmaos las variables de entorno que contienen el URL de la API
import { API_URL, moviesEndpoint } from '../../consts'

// Funciones que accederan al API para un CRUD a la base de datos 
export const getMoviesService = async () => {
    try{
        const response = await axios.get(`${API_URL}${moviesEndpoint}`)
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

 