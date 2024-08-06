import React from "react"
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes"

const App = () => {
  return(
    <BrowserRouter>
      {/* implementamos Routes, que seran las rutas dentro del index en la carpeta routes */}
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App