
// Aqui se declaran todas las variables que se usaran siempre en los demas componentes (Globales)

// Importamos las variables de entorno y las exportamos para su uso comun 
export const API_URL = process.env.REACT_APP_API_URL
export const moviesEndpoint = '/api/movies/'

// Clasificaciones de las peliculas
export const movieRating = [
    'G',
    'PG',
    'PG-13',
    'R',
    'X',
    'C',
    'NC-17'
]

// Tags de las peliculas (Genero)
export const movieTags = [
    'Drama',
    'Horror',
    'Mystery',
    'Comedy',
    'Documentary',
    'Adventure',
    'Cartoon',
    'Sci-Fi',
    'Thriller',
    'Crime',
    'Action',
    'Musical'
]