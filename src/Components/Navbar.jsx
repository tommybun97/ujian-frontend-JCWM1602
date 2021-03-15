import axios from "axios"
import React from "react"
import linkAPI from "./../Support/Constant/linkAPI"
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component{

    state= {
        email: null
    }

    componentDidMount(){
        this.getEmail()
    }

    getEmail= () => {
        let id = localStorage.getItem("id")

        if(id){
            axios.get(linkAPI + `/${id}`)
            .then((response) =>{
                console.log(response)
                this.setState({email: response.data.email})
            })
            .catch ((error)=> {
                console.log(error)
            })
        }
    }

    onLogout = () => {
        let confirm = window.confirm("Anda yakin mau logout?")

        if(confirm){
            localStorage.removeItem("id")
            window.location="/"
        }
    }

    

    render(){
        return(
            <>
                <div className="jati-bg-primary" style={{height: "65px"}} >
                    <div className= "d-flex align-items-center row jati-font-playfair" style={{height: "65px"}} >
                        <div className="col-6 col-md-3">
                            <span className="jati-font-size-35" style={{marginLeft: "150px", fontWeight:"900"}}><Link to="/">
                            Hai
                            </Link>
                               
                            </span>
                        </div>

                        <div className="d-none d-md-flex justify-content-md-between col-md-6 jati-font-size-18 jati-font-roboto" style={{width: "100%", fontWeight:"normal"}} > 
                            <span style={{paddingLeft: "300px"}}> Product </span>
                            <span >Showroom</span>
                            <span style={{paddingRight: "300px"}}>Sale</span>
                        </div>

                        <div className="d-flex ">
                            <span>
                                {
                                    this.state.email?
                                        this.state.email
                                    :
                                        null
                                }
                            </span>
                            <span className="jati-clickable mx-3"><Link to="/login">Login</Link> </span>
                            <span className="jati-clickable" onclink={this.onLogout}>Logout</span>
                            
                        </div>
                    </div>       
                </div>
            </>
        )
    }
}
