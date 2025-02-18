// Importamos react ya que haremos un componente de react
import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from "react-toastify"

// Importamos nuestros componentes 
import RoutesOfApp from "./routes"
import { Header, Footer } from "./components"

import 'react-toastify/ReactToastify.css'
import './App.scss'

// Declaramos la app como un functional component
const App = () => {
  return (
    <Router>
      <Header/> {/* Al cargar el header aqui, se asegura que aparezca siempre arriba en todas las rutas de la app */}
      <div className="main-container">
        <RoutesOfApp/>  {/* Aqui se cargaran las rutas de la aplicacion */}
      </div>
      <Footer/> {/* Al cargar el footer aqui, se asegura que aparezca siempre abajo en todas las rutas de la app */}
      <ToastContainer/> {/* Se manda el contenedor de tostify desde la App principal para que se pueda usar en cualquier otro componente */}
    </Router>
  )
}


// Exportamos la app 
export default App