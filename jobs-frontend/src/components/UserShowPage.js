import React, { Component } from 'react';
import { Icon, Header, Segment, Image, Input, Button } from "semantic-ui-react"
import JobContainer from '../child-components/JobContainer';
import Content from '../content/Content';

class UserShowPage extends Component {

    state = {
        jobStates: [],
        validated: false,
        user: null,
        usernameInput: ""
    }
    
    validateGenUser = () => {
        if(this.props.loggedIn){
            fetch(`http://localhost:3000/users/${this.props.id}`, {
            headers: {
                Authorization: this.props.loggedIn.token
            }
            })
            .then(r => r.json())
            .then((user) => {
                console.log(user)
                if(user.id == this.props.loggedIn.id){
                    this.setState({
                        jobStates: user.job_states,
                        validated: true,
                        user: user,
                        usernameInput: user.username
                    })
                }
            })
        }
    }

    componentDidMount(){
        this.validateGenUser()
    }

    handleUserChange = (evt) => {
        this.setState({
            usernameInput: evt.target.value
        })
    }

    handleUpdateUsername = (evt) => {
        fetch(`http://localhost:3000/users/${this.state.user.id}`, {
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                "accept":"application/json"
            },
            body: JSON.stringify({
                username: this.state.usernameInput
            })
        })
        .then(r => r.json())
        .then((response) => {
            if(response["error"]){
                alert(response["error"])
            } else {
                this.setState({
                    user: response
                })
            }
        })
    }

    genAccountEditForm = () => {
        console.log(this.state.validated)
        if(this.state.validated){
            return (
                <Segment>
                    <Header as="h1" textAlign="center" >Welcome {this.state.user.username}!</Header>
                    <div className="center-form-elements">
                        <div>
                            <Input onChange={this.handleUserChange} placeholder="Edit your username" value={this.state.usernameInput}></Input>
                        </div>
                        <div>
                            <Button onClick={this.handleUpdateUsername} >Update Username</Button>
                        </div>
                        <div>
                            <Segment color="red">
                                <Button onClick={this.handleDeleteAccount} >Delete Account</Button>
                            </Segment>
                        </div>
                    </div>
                </Segment>
            )
        }
    }

    handleDeleteAccount = () => {
        fetch(`http://localhost:3000/users/${this.state.user.id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then((response) => {
            this.props.setLoggedIn(null)
            this.props.history.push('/login')
        })
    }

    genJobContainers = () =>{ 
        let applying = this.state.jobStates.filter((js)=>{
            return js.status == "applying" || js.status == "applying Accepted"
        }).map((js) => {
            return js.job
        })
        let interviewing = this.state.jobStates.filter((js)=>{
            return js.status == "interviewing" || js.status == "interviewing Accepted"
        }).map((js) => {
            return js.job
        })
        let hired = this.state.jobStates.filter((js)=>{
            return js.status == "hired"
        }).map((js) => {
            return js.job
        })
        return (
            <>
            {this.genAccountEditForm()}
            <Segment>
                <Header as="h1" textAlign="center">Applciation Pending</Header>
                <JobContainer jobs={applying}/>
            </Segment>
            <Segment>
            <Header as="h1" textAlign="center">Interviewing</Header>
                <JobContainer jobs={interviewing}/>
            </Segment>
            <Segment>
            <Header as="h1" textAlign="center">Hired!</Header>
                <JobContainer jobs={hired}/>
            </Segment>
            </>
        )
    }

    render() {
        return (
           <div>
               {this.genJobContainers()}
           </div>
        );
    }
}

export default UserShowPage;