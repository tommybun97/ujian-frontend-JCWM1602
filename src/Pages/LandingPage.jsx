import axios from "axios"
import React from "react"
import checkUserLogin from "./../Support/Functions/checkUserLogin"
export default class LandingPage extends React.Component{

    state = {
        dataProducts: null,
        isUserLogin: null
    }

    componentDidMount(){
        this.getDataProduct()
     }

     onCheckUserLogin = () => {
         let id = localStorage.getItem("id")

         let result = checkUserLogin(id)
         this.setState({isUserLogin: result})
     }


    getDataProduct = () => {
        axios.get("http://localhost:2000/products")
        .then((response)=> {
            console.log(response)
            this.setState({dataProducts: response.data })
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    addtoCart = () => {
        window.location = "/Detailproduct"
    }

    // addToCart= () => {
       
    //     let idUser = localStorage.getItem("id")
    //     let quantity = 1

    //     this.props.getData
    // }

    render(){
        return(
            <>
           
             <div className="container d-flex justify-content-center align-items-center" style={{height: "75vh"}} >
                {
                    this.state.dataProducts?
                        this.state.dataProducts.map((value, index)=>{
                            return(
                                <>
                                <div className="card" key={index} style={{width: "18rem", height: "100%"}}>
                                <img src={value.img} className="card-img-top" style={{height: "200px"}}/>
                                    <div className="card-body">
                                        <p className="card-text">{value.name}</p>
                                        <p className="card-text">{value.price}</p>
                                        <p className="card-text">{value.description}</p>

                                        <input type="button" value="Add To Cart" className="btn btn-primary" onclick={this.addToCart}/>
                                    </div>
                                   
                                        
                                   
                                </div>

                                </>
                            )
                        })
                        :
                        null
                }

                 
             </div>
            
      
           
            </>
           
        )
    }
}