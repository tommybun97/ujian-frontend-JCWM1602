import axios from "axios"
import React from "react"
import checkUserLogin from "./../Support/Functions/checkUserLogin"
import {connect} from "react-redux"
import {getDataCart} from "./../redux/CartAction"

class DetailProduct extends React.Component{

    state={
        isUserLogin: null,
        dataDetailProduct: null,
        mainImage: null
    }

    componentDidMount(){
        this.getDataProduct()
        this.onCheckUserLogin()
    }

    onCheckUserLogin = () => {
        let id = localStorage.getItem('id')

        let result = checkUserLogin(id)
        this.setState({isUserLogin: result})
    }

    getDataProduct= () => {
        let idProduct = this.props.location.pathname.split("/")[0]
        console.log(idProduct)
       

        axios.get(`http://localhost:2000/products/${idProduct}`)
        .then((response)=> {
            console.log(response.data)
            this.setState({dataDetailProduct: response.data})
            this.setState({mainImage: response.data.image})
        })
        .catch((error)=> {
            console.log(error)
        })
    }

    addToCart= () => {
        let idProduct = this.props.location.pathname.split("/")[2]
        let idUser = localStorage.getItem("id")
        let quantity = 1

        this.props.getDataCart(idProduct, idUser, quantity)
    }


    render(){
        return(
            <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="row justify-content-center">
                            <div class="col-12">
                                <img src={this.state.mainImage} className="img-fluid" alt=""/>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
        )
        
    }
}

const mapDisppatchToProps = {getDataCart}

export default connect ("", mapDisppatchToProps)(DetailProduct)