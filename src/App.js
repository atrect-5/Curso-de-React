import React from "react"
import { BrowserRouter } from "react-router-dom"
import { Header, Footer, AppRoutes } from "./components/common/index.jsx"

const App = () => {
  return(
    <>  
      <BrowserRouter>
        <Header/>
        {/* implementamos AppRoutes, que seran las rutas dentro del index en la carpeta routes */}
        <AppRoutes/>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App