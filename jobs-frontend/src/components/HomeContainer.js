import React, { Component } from 'react'
import JobContainer from '../child-components/JobContainer'
import { Segment,Header } from 'semantic-ui-react'


export default class HomeContainer extends Component {

    state = {
        jobs: [],
        searchTerm:''
    }

    componentDidMount(){
        fetch(`http://localhost:3000/jobs`)
        .then(r => r.json())
        .then((response) => {
            this.setState({
                jobs: response
            })
        })
    }

    handleSearch = (event) =>{
        console.log(event.target.value)
        this.setState({
            searchTerm: event.target.value
        })
    }

    filterJobs = () =>{
        return this.state.jobs.filter(job => job.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }
  

    render() {
        
        return (
            <>
            <Segment>
                <div className="center-form-elements">
                <div onChange={this.handleSearch}  class="ui center icon input">
                        <input type="text"   placeholder="Search..." value={this.state.searchTerm} onChange={this.handleChange}/>
                <i class="search icon"></i>
                </div>
                </div>  
            <Header as="h1" textAlign="center">WORK-SMART</Header>
            <div className="into">
                <p>Hi! Welcome to WORK-SMART, a job hunting application to help you start developing your career. You can login, browse jobs/companies and send in applications. Go wild!</p>
            </div>  
            </Segment>
           
            <div className="jobs-list">
                <JobContainer jobs={this.filterJobs()} handleJobClick={this.props.handleJobClick} />
            </div>
            </>
        )
    }
}
