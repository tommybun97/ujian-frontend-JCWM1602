import React from "react"
import LandingPage from "./Pages/LandingPage"
import Navbar from "./Components/Navbar"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Login from "./Pages/Login"
import DetailProduct from "./Pages/DetailProduct"
import Cart from "./Pages/cart"


// CSS
import "./Support/Stylesheets/Utils.css"


export default class App extends React.Component{
  render(){
    return(
      <>
        <BrowserRouter>
        <Navbar/>
          <Switch>
            <Route exact path= "/" component={LandingPage}/>
            <Route path="/login" component={Login}/>
            <Route path="/Detailproduct" component={DetailProduct}/>
            <Route path="/Cart" component={Cart}/>
            

            
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}