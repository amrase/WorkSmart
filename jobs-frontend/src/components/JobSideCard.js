import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class JobSideCard extends Component {
    render() {
        let job = this.props.job
        return (
            <Link to={`/jobs/${job.id}`}>
            <Card>
                <Card.Content>
                    <Image
                        floated="right"
                        size="mini"
                        src={job.company.logo}/>
                    <Card.Header>{job.title}</Card.Header>
                    <Card.Meta>Posted: {job.post_date.slice(0, 10)}</Card.Meta>
                    <Card.Description>
                        {job.description.split(" ").slice(0, 7).join(" ")}...
                    </Card.Description>
                </Card.Content>
            </Card>
            </Link>
        );
    }
}

export default JobSideCard;