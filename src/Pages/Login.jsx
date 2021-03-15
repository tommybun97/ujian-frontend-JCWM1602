import React from "react"
import axios from "axios"
import linkAPI from "./../Support/Constant/linkAPI"
import EmailValidator from "./../Support/Functions/EmailValidator"
import PasswordValidator from "./../Support/Functions/PasswordValidator"

export default class Login extends React.Component{

    state = {
        error: null,
        email: null,
        password: null,
    }

    SubmitRegister = () => {
        let inputUserRegister = this.refs.inputUser.value
        

        let resultemailvalidator = EmailValidator(inputUserRegister)
            console.log(resultemailvalidator)

            if(resultemailvalidator !== true){
                this.setState({error: "Email tidak sesuai"})
            }else {
                this.setState({error: null , email: inputUserRegister})
            }
        
      
            
    }

    SubmitPassword = () => {
        let inputPassword = this.refs.inputPassword.value

        let resultpassword = PasswordValidator(inputPassword)
        console.log(resultpassword)

        if(resultpassword !== true){
            this.setState({error: resultpassword})
        }else{
            this.setState({error:null, password: inputPassword })
        }
    }

    sendDataToAPI = () => {
        if(this.state.email !== null){
            axios.get(linkAPI + "?email" + this.state.email)
            .then((response)=> {
                console.log(response)
                if(response.data.length === 1){
                    this.setState({error: "Selamat anda berhasil login"})
                    localStorage.setItem ("id", response.data[0].id)
                    window.location = "/"
                }else{
                    axios.post(linkAPI, {email: this.state.email, password: this.state.password})
                    .then ((response)=>{
                        console.log(response)
                        alert("selamat akun anda telah berhasil register")
                        localStorage.setItem("id", response.data.id)
                        window.location = "/"
                    })
                    .catch ((error)=> {
                        console.log(error)
                    })
                }
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    }





    render(){
        return(
            // Email, password Submit 
            <div className="container d-flex justify-content-center flex-column" style={{height: "100vh"}}>
                <input type="text" ref="inputUser" placeholder="Input your email" className="form form-control" onChange={this.SubmitRegister}/>
                <input type="password" ref="inputPassword" placeholder="Input your password" className="form form-control my-3" onChange={this.SubmitPassword}/>
                <input type="button" value="submit" className="btn btn-primary" onClick={this.sendDataToAPI}/>

                <p className="text-danger ">
                    {
                        this.state.error?
                            this.state.error
                        :
                            null
                    }
                </p>
            </div>
        )
    }
}
    