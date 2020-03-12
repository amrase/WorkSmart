import React, { Component } from 'react'
import JobShow from '../components/JobShow'
import CompanyContainer from '../components/CompanyContainer'
import HomeContainer from '../components/HomeContainer'
import LoginMenu from '../main-containers/LoginMenu'
import UserShowPage from '../components/UserShowPage'
import CompanyShowPage from '../components/CompanyShowPage'
import JobShowPage from '../components/JobShowPage'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

export default class Content extends Component {

    state = {
        jobs: [],
        companies:[],

    }

    handleChange = event => {
     this.setState({
         searchTerm: event.target.value
     })
    };


    addJobs = (job)=>{
        this.setState({ 
            jobs: [...this.state.jobs, job]
         })
    }





    componentDidMount() {
        Promise.all([fetch('http://localhost:3000/jobs'), fetch('http://localhost:3000/companies')])
            .then(([res1, res2]) => { 
                return Promise.all([res1.json(), res2.json()]) 
            })
            .then(([res1, res2])  => {
            this.setState({
              jobs: res1,
              companies: res2
            });
          })  
    } 

  

    homeComponent = () => {
        return <HomeContainer loggedIn={this.props.loggedIn} jobs={this.state.jobs} handleJobClick={this.handleJobClick}/>
    }

    jobComponent = () => {
        return <JobShow  jobs={this.state.jobs} key={this.state.jobs.id}/>
    }

    companyComponent = () => {
        return <CompanyContainer companies={this.state.companies}/>
    }

    loginComponent = (props) => {
        console.log(props)
        return <LoginMenu history={props.history} setLoggedIn={this.props.setLoggedIn}/>
    }

    userShowComponent = (props) => {
        return <UserShowPage id={props.match.params.id} loggedIn={this.props.loggedIn} setLoggedIn={this.props.setLoggedIn} history={props.history}/>
    }

    jobShowComponent = (props) => {
        return <JobShowPage history={props.history} id={props.match.params.id} loggedIn={this.props.loggedIn}/>
    }

    companyShowComponent = (props) => {
        return <CompanyShowPage history={props.history} id={props.match.params.id} loggedIn={this.props.loggedIn}  addJobs={this.addJobs}/>
    }


    



    render() {
        return (

                <div>   
                       
                        <Route path="/user" component={this.userComponent}/>
                        <Route exact path="/" component={this.homeComponent}/>
                        <Route path="/job" component={this.jobComponent}/>
                        <Route path="/companies" component={this.companyComponent}/>
                        <Route path="/login" component={this.loginComponent}/>
                        <Route path="/job" component={this.jobComponent}/>
                        <Route path="/users/:id" component={this.userShowComponent}/>
                        <Route path="/jobs/:id" component={this.jobShowComponent}/>
                        <Route path="/company/:id"component={this.companyShowComponent}/>
                       
                        </div>

           
        )
    }
}
