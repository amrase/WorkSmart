import React, { Component } from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class JobCard extends Component {
    render() {
        return (
            <Link to={`/jobs/${this.props.job.id}`}>
            <Card style={{padding: "1em"}} onClick={()=>this.props.handleJobClick(this.props.job.id)}>
                <Card.Content>
                    <Card.Header>{this.props.job.title}</Card.Header>
                    <Card.Meta>{this.props.job.companyName}</Card.Meta>
                    <Card.Meta>Posted: {this.props.job.post_date.slice(0, 10)}</Card.Meta>
                    <Card.Description>{`${this.props.job.description.slice(0, 20)}...`}</Card.Description>
                </Card.Content>
            </Card>
            </Link>
        )
    }
}
