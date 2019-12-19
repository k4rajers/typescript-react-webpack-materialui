import React from "react"
// import logo from "./logo.svg"
import "./App.css"
import { Button } from "@material-ui/core"

const App: React.FC = () => {
  return (
    <div className="App">
      <Button variant="contained" color="primary">
        Hurray! React Typescript Webpack Material-UI
      </Button>
    </div>
  )
}

export default App
