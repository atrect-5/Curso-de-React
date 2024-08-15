import React from "react"
import { BrowserRouter } from "react-router-dom"
import { Header, Footer, AppRoutes } from "./components/common/index.jsx"
import './App.scss'

const App = () => {
  return(
    <>  
      <BrowserRouter>
        <Header/>
        <div className="main-container">
          {/* implementamos AppRoutes, que seran las rutas dentro del index en la carpeta routes */}
          <AppRoutes/>
        </div>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App