// Importamos react ya que haremos un componente de react
import React from "react"
import { BrowserRouter as Router } from "react-router-dom"

// Importamos nuestros componentes 
import RoutesOfApp from "./routes"
import { Header, Footer } from "./components"

import './App.scss'

// Declaramos la app como un functional component
const App = () => {
  return (
    <Router>
      <Header/>
      <div className="main-container">
        <RoutesOfApp/>  
      </div>
      <Footer/> 
    </Router>
  )
}


// Exportamos la app 
export default App