import React, { Component } from 'react'
import { Segment, Card, Image, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
export default class CompanyShowPage extends Component {
    
    state ={
        companies: null,
        company: null,
        title:'',
        description:"",
        companyid:null,
        companyName:"",
        job_states: ""
    }


    componentDidMount(){
        fetch(`http://localhost:3000/companies`)
        .then(r => r.json())
        .then((companies) => {
            let company = companies.find((company) => {
                return company.id == this.props.id
            })
            this.setState({
                company: company,
                companies: companies
            })
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.id != this.props.id){
            let company = this.state.companies.find((company) => {
                return company.id == this.props.id
            })
            this.setState({
                company: company
            })
        }
    }

    handleChange = (evt) =>{
        this.setState({
            [evt.target.name] : evt.target.value
        })
        
    }

    handleSubmit = (evt) =>{
        const {title,postdate,description} =this.state
        
        evt.preventDefault()
        fetch(`http://localhost:3000/jobs`,{
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description,
                companyName: this.state.company.companyName,
                company_id : this.state.company.id
         

            })
        })
        .then(resp =>resp.json())
        .then(newJob=>{
            this.props.addJobs(newJob)
            this.props.history.push("/")
            console.log(newJob)
        })

    }


    genCompanyDisplay = () =>{
        if(this.state.company){
            let company = this.state.company
            return (
                <>
                <Segment textAlign="center">
                    <Card centered>
                        <Image src={company.logo}></Image>
                    </Card>
                    <Header as="h1" textAlign="center" >
                        <Header.Content>
                            {company.name}
                            <Header.Subheader as="h4" textAlign="center">Email: {company.email}</Header.Subheader>   
                            <Header.Subheader as="h4" textAlign="center">Website: {company.website}</Header.Subheader>
                            <Header.Subheader as="h6" textAlign="center">Address: {company.address}</Header.Subheader>   
                            <Header.Subheader as="h6" textAlign="center">City: {company.city}</Header.Subheader>
                        </Header.Content>
                    </Header>
                  
                </Segment>
        
                </>
            )
        } else {
            return null
        }
    } 
    render() {
        console.log(this.state.company)
        return (
            <div>
                {this.genCompanyDisplay()}
                <form class="ui form" onSubmit={this.handleSubmit}>
                 <div class="field">
                    <label>
                    Title:
                    <input type="text" value={this.state.value} name='title' onChange={this.handleChange} />
                    </label>
                </div> 
                <div className="field">
                </div>  
                <div class="field">
                    <label>
                    Description:
                    <textarea value={this.state.value} name='description'onChange={this.handleChange} />
                    </label>
                </div>

                <input class="ui button" type="submit" value="Submit" />
            </form>
            </div>
        )
    }
}
