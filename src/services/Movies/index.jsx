// importamos nuestra variable de entorno que utilizaremos
import { API_URL, moviesEndpoint } from "../../consts"
// importamos una libreria (axios) para trabajar con las peticiones HTTP
import axios from "axios"

// Funcion que hace la peticion GET a la API
export const getAllMovies = async () => {
    /*Esta funcion es asincrona, ya que se debe esperar por el resultado que regrese la peticion HTTP */
    // Variable donde almacenara la respuesta (json) del API
    const response = await axios.get(`${API_URL}${moviesEndpoint}`)
    console.log(response)
}