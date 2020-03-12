import React, { Component } from 'react'
import JobCard from './JobCard'
import JobShow from '../components/JobShow'
import { Grid, Image, Card } from 'semantic-ui-react'


export default class JobContainer extends Component {


    state = {
        isClicked : false,
    }

    handleJobClick = (job) =>{
        this.setState({
            isClicked: !this.state.isClicked
        })
    }




    mapAllJobs = () => {
        return this.props.jobs.map(job => {
            return <JobCard key={job.id} job={job}  handleJobClick={this.handleJobClick}/>
        })
    }
    

    

    render() {
        console.log(this.state)
        return (
            <Grid centered celled="internally" columns={3} stackable divided>
                {this.mapAllJobs()}
            </Grid>
        )
    }
}
