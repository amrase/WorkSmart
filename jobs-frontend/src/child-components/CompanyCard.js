import React, { Component } from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'


export default class CompanyCard extends Component {

    render() {
        const {name, address,city,website,logo,email} = this.props.company     
        return (
            <Card style={{passing:"1em" ,text: "center"}} >
                <Card.Header>{name}</Card.Header> 
                 <Card.Meta>{address}</Card.Meta>
                 <Card.Meta>{city}</Card.Meta>
                <Card.Meta>{email}</Card.Meta>
                <Card.Meta>{website}</Card.Meta>
                <div class="ui small image centered">
                <img src={logo}/></div>
            </Card>
           

        )
    }
}
