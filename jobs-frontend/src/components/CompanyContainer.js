import React, { Component } from 'react'
import CompanyCard from '../child-components/CompanyCard'
import { Grid, Segment } from 'semantic-ui-react'

export default class CompanyContainer extends Component {

    mapAllCompanies = () => {
        return this.props.companies.map(company => {
            return <CompanyCard key={company.id} company={company} />
        })
    }
    



    render() {
    
        return (
            <Grid centered celled="internally" columns={3} celled grid>        
                {this.mapAllCompanies() }
            </Grid>
        )
    }
}
