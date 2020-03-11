import React, { Component } from 'react';
import { Segment, Card, Image, Header, Button } from 'semantic-ui-react'
import JobSideCard from './JobSideCard'
import { Link } from 'react-router-dom'

class JobShowPage extends Component {

    state = {
        job: null,
        jobs: null,
        description: ""
    }

    componentDidMount(){
        fetch(`http://localhost:3000/jobs`)
        .then(r => r.json())
        .then((jobs) => {
            let job = jobs.find((job) => {
                return job.id == this.props.id
            })
            this.setState({
                job: job,
                jobs: jobs,
                description: job.description
            })
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.id != this.props.id){
            let job = this.state.jobs.find((job) => {
                return job.id == this.props.id
            })
            this.setState({
                job: job,
                description: job.description
            })
        }
    }

    genJobDisplay = () =>{
        if(this.state.job){
            let job = this.state.job
            return (
                <>
                <Segment textAlign="center">
                    <Card centered>
                        <Image src={job.company.logo}></Image>
                    </Card>
                    <Header as="h1" textAlign="center" >
                        <Header.Content>
                            {job.title} - {job.companyName}
                            <Header.Subheader as="h3" textAlign="center">Posted: {job.post_date.slice(0, 10)}</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <p>
                        {job.description}
                        <br></br>
                        {this.genEditDescription(job)}
                    </p>
                </Segment>
                <Segment id="to-center">
                    {this.getConditionalSegment()}
                </Segment>
                </>
            )
        } else {
            return null
        }
    }

    genEditDescription = (job) => {
        if(this.props.loggedIn){
            if(job.company.id == this.props.loggedIn.id){
                return (
                    <>
                    <br></br>
                    <textarea onChange={this.handleDescChange} value={this.state.description}></textarea>
                    <br></br>
                    <Button onClick={this.handleUpdateDescription} >Edit Job Description</Button>
                    </>
                )
            } else {
                return null
            }
        }
    }

    handleUpdateDescription = () => {
        fetch(`http://localhost:3000/jobs/${this.state.job.id}`, {
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                "accept":"application/json"
            },
            body: JSON.stringify({
                description: this.state.description
            })
        }).then(r => r.json())
        .then((updatedJob) => {
            console.log(updatedJob)
            let newJobs = [...this.state.jobs]
            let foundIndex = null
            newJobs.forEach((job, i)=>{
                if(job.id == updatedJob.id){foundIndex = i}
            })
            newJobs[foundIndex] = updatedJob
            this.setState({
                job: updatedJob,
                jobs:newJobs
            })
        })
    }

    handleDescChange = (evt) => {
        this.setState({
            description: evt.target.value
        })
    }

    companyJobForm = () => {
        if(this.state.job.company.id == this.props.loggedIn.id){
            let delJob = <Button onClick={()=>{this.deleteJob(this.state.job)}}>Remove Job Posting</Button>
            let job = this.state.job
            let applying = job.job_states.filter((js) => {
                return js.status == "applying" || js.status == "applying Accepted"
            })
            let interviewing = job.job_states.filter((js) => {
                return js.status == "interviewing" || js.status == "interviewing Accepted"
            })
            let hired = job.job_states.filter((js) => {
                return js.status == "hired"
            })

            return (
                <>
                <Header as="h3">Applicants</Header>
                <Card.Group>
                    {this.genApplicants(applying)}
                </Card.Group>
                <Header as="h3">Interviewing</Header>
                <Card.Group>
                    {this.genInterviewes(interviewing)}
                </Card.Group>
                <Header as="h3">Hired Candidates</Header>
                <Card.Group>
                    {this.genHired(hired)}
                </Card.Group>
                <div id="center-button">
                    <div>
                        {delJob}
                    </div>
                </div>
                </>
            )
        }
    }

    genApplicants = (apps) => {
        return apps.map((app) => {
            let button = <Button onClick={()=>{this.acceptApp(app)}}>Accept</Button>
            let disButton = <Button disabled>Accept</Button>
            return (
                <Card>
                    <Card.Content>
                        <Card.Header>Name: {app.user.username}</Card.Header>
                        <Card.Meta>Status: {app.status.charAt(0).toUpperCase() + app.status.slice(1)}</Card.Meta>
                        {app.status == "applying" ? button : disButton}
                        <Button onClick={()=>{this.deleteJobApp(app)}}>Drop Candidate</Button>
                    </Card.Content>
                </Card>
            )
        })
    }

    genInterviewes = (ints) => {
        return ints.map((int) => {
            let button = <Button onClick={()=>{this.acceptInterview(int)}}>Hire</Button>
            let disButton = <Button disabled>Hire</Button>
            return (
                <Card>
                    <Card.Content>
                        <Card.Header>{int.user.username}</Card.Header>
                        <Card.Meta>Status: {int.status.charAt(0).toUpperCase() + int.status.slice(1)}</Card.Meta>
                        {int.status == "interviewing" ? button : disButton}
                        <Button onClick={()=>{this.deleteJobApp(int)}}>Drop Candidate</Button>
                    </Card.Content>
                </Card>
            )
        })
    }

    genHired = (hires) => {
        return hires.map((hire) => {
            return (
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{hire.user.username}</Card.Header>
                        <Card.Meta>Status: {hire.status.charAt(0).toUpperCase() + hire.status.slice(1)}</Card.Meta>
                    </Card.Content>
                </Card>
            )
        })
    }
    
    userJobForm = () => {
        let status = this.state.job.job_states.filter((js) => {
            return js.user.id == this.props.loggedIn.id
        })
        if(status[0]){
            let js = status[0]
            let button = null
            let delButton = null
            switch(js.status){
                case "applying Accepted":
                    button = <Button onClick={()=>{this.sendInterviewAccept(js)}}>Accept</Button>
                    delButton = <Button onClick={()=>{this.deleteJobApp(js)}}>Withdraw Application</Button>
                    break;
                case "interviewing Accepted":
                    button = <Button onClick={()=>{this.sendJobAccept(js)}}>Accept</Button>
                    delButton = <Button onClick={()=>{this.deleteJobApp(js)}}>Withdraw Application</Button>
                    break;
                case "hired":
                    button = null
                    break;
                default:
                    button = <Button disabled>Accept</Button>
            }
            return (
                <div id="center-button">
                    <div>
                        <Header as="h1">{js.status.charAt(0).toUpperCase() + js.status.slice(1)}</Header>
                        {button}
                        {delButton}
                    </div>
                </div>
            )
        } else {
            return (
                <div id="center-button">
                    <div>
                    <Button onClick={this.sendApplication}>
                        Apply!
                    </Button>
                    </div>
                </div>
            )
        }
    }

    deleteJob = (job) => {
        fetch(`http://localhost:3000/jobs/${job.id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then((response) => {
            this.props.history.push("/")
        })
    }

    acceptApp = (js) => {
        fetch(`http://localhost:3000/job_states/${js.id}`, {
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                "accepts":"application"
            },
            body: JSON.stringify({
                status: "applying Accepted"
            })
        })
        .then(r => r.json())
        .then((response) => {
            this.props.history.push(`/`)
        })
    }

    acceptInterview = (js) => {
        fetch(`http://localhost:3000/job_states/${js.id}`, {
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                "accepts":"application"
            },
            body: JSON.stringify({
                status: "interviewing Accepted"
            })
        })
        .then(r => r.json())
        .then((response) => {
            this.props.history.push(`/`)
        })
    }

    deleteJobApp = (js) => {
        fetch(`http://localhost:3000/job_states/${js.id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then((response) => {
            this.props.history.push("/")
        })
    }

    sendJobAccept = (js) => {
        fetch(`http://localhost:3000/job_states/${js.id}`, {
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                "accepts":"application"
            },
            body: JSON.stringify({
                status: "hired"
            })
        })
        .then(r => r.json())
        .then((response) => {
            this.props.history.push(`/users/${this.props.loggedIn.id}`)
        })
    }

    sendInterviewAccept = (js) => {
        fetch(`http://localhost:3000/job_states/${js.id}`, {
            method: "PATCH",
            headers: {
                "content-type":"application/json",
                "accepts":"application"
            },
            body: JSON.stringify({
                status: "interviewing"
            })
        })
        .then(r => r.json())
        .then((response) => {
            this.props.history.push(`/users/${this.props.loggedIn.id}`)
        })
    }

    sendApplication = () => {
        fetch("http://localhost:3000/job_states", {
            method: "POST",
            headers: {
                "content-type":"application/json",
                "accepts":"application"
            },
            body: JSON.stringify({
                user_id: this.props.loggedIn.id,
                job_id: this.state.job.id,
                status: "applying"
            })
        })
        .then(r => r.json())
        .then((response) => {
            this.props.history.push(`/users/${this.props.loggedIn.id}`)
        })
    }

    getConditionalSegment = () => {
        let logged = this.props.loggedIn
        if(logged){
            if(logged.type == "user"){
                return this.userJobForm()
            } else if(logged.type == "company"){
                return this.companyJobForm()
            } else {
                return "You've done something really weird to get this message"
            }
        } else {
            return (
                <div id="center-button">
                    <Link to="/login">
                    <Button>Sign In</Button>
                    </Link>
                </div>
            )
        }
    }

    genSideBar = () => {
        if(this.state.jobs){
            return (
                this.state.jobs.map((job) => {
                    return <JobSideCard job={job}/>
                })
            )
        } else {
            return null
        }
    }

    render() {
        return (
            <div className="job-show-page" style={{paddingTop: "2em"}}>
                <div className="job-show">
                    {this.genJobDisplay()}
                </div>
                <div className="sidebar">
                    <Card.Group>
                        {this.genSideBar()}
                    </Card.Group>
                </div>
            </div>
        );
    }
}

export default JobShowPage;