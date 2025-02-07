
import axios from 'axios'

// Importmaos las variables de entorno que contienen el URL de la API
import { API_URL, moviesEndpoint } from '../../consts'

// Funciones que accederan al API para un CRUD a la base de datos 
export const getMovies = async () => {
    const response = await axios.get(`${API_URL}${moviesEndpoint}`)
    console.log(response)
}

