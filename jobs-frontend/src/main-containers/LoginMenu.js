import React, { Component } from 'react';
import { Button, Header } from 'semantic-ui-react'

class LoginMenu extends Component {
    state = {
        userName: "",
        userPass: "",
        companyName: "",
        companyPass: ""
    }

    handleChange = (evt) => {
        
        this.setState({
            [evt.target.name]:evt.target.value
        })
    }



    attemptLogin = (evt) => {
        evt.preventDefault()
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                username: this.state[`${evt.target.name}Name`],
                password: this.state[`${evt.target.name}Pass`],
                companyName:this.state[`${evt.target.name}Name`],
                companyPass:this.state[`${evt.target.name}Pass`]
              
            })
        })
        .then(r => r.json())
        .then((response) => {
            if(response["token"]){
                this.props.setLoggedIn(response)
                this.props.history.push("/")
            } else {
                alert(response["errors"][0])
            }
        })
    }



    attemptCreate = (evt) => {
        evt.preventDefault()
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                username: this.state[`${evt.target.name}Name`],
                password: this.state[`${evt.target.name}Pass`]
            })
        })
        .then(r => r.json())
        .then((response) => {
            if(response["token"]){
                this.props.setLoggedIn(response)
                this.props.history.push("/")
            } else {
                alert(response["errors"][0])
            }
        })
    }


    attemptLoginCompany = (evt) =>{
        evt.preventDefault()
        fetch("http://localhost:3000/companylogin",{
            method:"POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                companyName: this.state[`${evt.target.name}Name`],
                companyPassword: this.state[`${evt.target.name}Pass`]
            })

        })
        .then(resp => resp.json())
        .then((response) => {
            if(response["token"]){
                this.props.setLoggedIn(response)
                this.props.history.push('/')
            } else {
                alert(response["errors"][0])
            }
        })
    }
    attemptCreateCompany = (evt) =>{
        evt.preventDefault()
        fetch("http://localhost:3000/companies", {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                companyName: this.state[`${evt.target.name}Name`],
                companyPass: this.state[`${evt.target.name}Pass`]
            })
        })
        .then(r => r.json())
        .then((response) => {
            if(response["token"]){
                this.props.setLoggedIn(response)
                this.props.history.push('/')
            } else {
                alert(response["errors"][0])
            }
        })

    }

    render() {
        console.log(this.state.companyName)
        return (
            <>  
                 <div   class="ui middle aligned center aligned grid" id="user-login" >
                    <div class="column">
               
                            <div class="content">
                            <form class="ui large form">

                            <div class="ui stacked secondary  segment">
                            <div class="field">
                            <div class="ui left icon input"></div>
                            <div id="user-login" className="login-block">
                                <div>
                                <Header as="h2" textAlign="center">Login As User</Header>
                                <input onChange={this.handleChange} name="userName" value={this.state.userName} placeholder="Username"></input>
                                <input onChange={this.handleChange} name="userPass" value={this.state.userPass} type="password" placeholder="Password"></input>
                                <Button name="user" onClick={this.attemptLogin}>Login!</Button>
                                <Button name="user" onClick={this.attemptCreate}>Create User Account!</Button>
                                </div>
                            <div>
                                <Header as="h2" textAlign="center">Login As Company</Header>
                            <input onChange={this.handleChange} name="companyName" value={this.state.companyName} placeholder="Username"></input>
                            <input onChange={this.handleChange} name="companyPass" value={this.state.companyPass} type="password" placeholder="Password"></input>
                            <Button name="company" onClick={this.attemptLoginCompany}>Login!</Button>
                            <Button name="company" onClick={this.attemptCreateCompany}>Create Company Account!</Button>
                            </div>
                            </div>
                            </div>
                            </div>
                        </form>
                </div>
               </div>
               </div> 
            </>
        );
    }
}

export default LoginMenu;