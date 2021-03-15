import React from "react";
import axios from "axios";
import swal from "sweetalert"

export default class Cart extends React.Component{

    state = {
        dataCarts: null,
        dataProducts: null,
        totalItem: 0,
        totalPrice: 0
    }

    componentDidMount(){
        this.getDataCarts()
    }

    getDataCarts = () => {
        let id = localStorage.getItem("id")

        axios.get(`http://localhost:2000/carts?idUser=${id}`)
        .then((res) => {
            let linkURLToGetDataProduct = ''
            
            res.data.forEach((value, index) => {
                linkURLToGetDataProduct += `id=${value.idProduct}&`
            })
            res.data.sort((a, b) => {
                return a.idProduct - b.idProduct
            })

            this.setState({dataCarts: res.data})
            console.log(this.state.dataCarts)

            axios.get(`http://localhost:2000/products?${linkURLToGetDataProduct}`)
            .then((res) => {
                this.setState({dataProducts: res.data})
                
                this.getOrderSummary()
            })
            .catch((err) => {
                console.log(err)
            })
        })

        .catch((err) => {
            console.log(err)
        })
    }
    
    getOrderSummary = () => {
        let totalItem = 0
        let totalPrice = 0

        this.state.dataCarts.forEach((value, index) => {
            totalItem += value.quantity
            totalPrice += this.state.dataProducts[index].price * value.quantity
        })

        this.setState({totalItem: totalItem, totalPrice: totalPrice})
    }

    updateQuantityProduct = (button, idCart, quantity) => {
        let quantitySebelumnya = quantity
        let quantityTerbaru = 0

        if(button === 'Plus'){
            quantityTerbaru = quantitySebelumnya + 1
        }else{
            quantityTerbaru = quantitySebelumnya - 1
        }
        
        axios.patch(`http://localhost:2000/carts/${idCart}`, {quantity: quantityTerbaru})
        .then((res) => {
            if(res.status === 200){
                this.getDataCarts()
            }
        })  
        .catch((err) => {
            console.log(err)
        })
    }

    deleteProduct = (idCart) => {
        swal({
            title: "Are you sure want to delete this product?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if(willDelete){
                axios.delete(`http://localhost:2000/carts/${idCart}`)
                .then((res) => {
                    swal({
                        title: "Product delete succesfull!",
                        icon: "success",
                        button: "Ok",
                    });

                    window.location = '/cart'
                })
                .catch((err) => {
                    swal({
                        title: {err},
                        icon: "cancel",
                        button: "Ok",
                    });
                })
            } else {
              
            }
          });
    }

    createTransaction = () => {
       
        let idUSer = localStorage.getItem('id')

        
        let date = new Date()
        date = date.toString()

        let newDate = date.split(' ')[2] + '-' + date.split(' ')[1] + '-' + date.split(' ')[3] + ' ' + date.split(' ')[4]
        
        
        let totalPrice = this.state.totalPrice

       
        let detailItems = this.state.dataCarts.map((value, index) => {
            return{
                    productName: this.state.dataProducts[index].name,
                    productPrice: this.state.dataProducts[index].price,
                    productDiscount: this.state.dataProducts[index].diskon,
                    productQuantity: value.quantity,
                    productImage: this.state.dataProducts[index].image1
            }
        })

        const dataToSend = {
            idUser: idUSer,
            status: 'Unpaid',
            createdAt: newDate,
            total: totalPrice,
            detail: detailItems
        }

        
        axios.post('http://localhost:2000/transactions', dataToSend)
        .then((res) => {
            
            let idTransaction = res.data.id 

            this.state.dataCarts.forEach((value, index) => {
                let stockSebelumnya = this.state.dataProducts[index].stock
                let stockTerbaru = stockSebelumnya - value.quantity

                axios.patch(`http://localhost:2000/products/${value.idProduct}`, {stock: stockTerbaru})
                .then((res) => {
                  

                    axios.delete(`http://localhost:2000/carts/${value.id}`)
                    .then((res) => {
                        window.location = '/checkout/' + idTransaction 
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }


    render(){

        if(this.state.dataCarts === null || this.state.dataProducts) {
            return(
                null
            )
        }

        return(
            <>
                <div classname="bg-light">
                    <div className="container">
                        <div className="row">
                            <div className= "col-12">
                                <div className="p-2 my-5 bg-white" style={{borderRadius: "3px"}}>
                                    <div className= "col-12 mt-3">
                                        <h3>
                                            Shopping Cart
                                        </h3>
                                        <hr/>
                                    </div>

                                </div>

                            </div>
                            <div className= "col-12" style={{height: "400px"}}>
                                <div className="p-4 mt-0 mt-md-5 bg-white" style={{borderRadius: "3px"}}>
                                    <div className="col-12 mt-3">
                                        <h5>
                                            Order Summary
                                        </h5>
                                        <hr/>ijin 
                                        <div className = "d-flex justify-content-between my-2">
                                            <div>
                                                Total Items:
                                            </div>
                                            {/* <div>
                                                {this.state.totalItem} Item
                                            </div> */}
                                        </div>
                                        <hr/>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h5>
                                                    Total
                                                </h5>
                                            </div>
                                            <div>
                                                {/* <h5 className="font-weight-bold">
                                                    Rp.{this.state.totalPrice.toLocaleString()}
                                                </h5> */}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="mt-4">
                                    <div>
                                        {/* {
                                            this.state.datacarts.length === 0?
                                                null
                                            :
                                                <input type="button" value="Checkout" className="btn btn-primary font-weight-bold" onClick={this.createTransaction}/>
                                        } */}
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}