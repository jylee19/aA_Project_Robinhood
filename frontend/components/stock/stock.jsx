import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Stock extends Component {

    constructor(props){
        super(props);
        this.state = {
            abv: this.props.currentStock.NYSE_abv,
            value: this.props.currentStock.value
        }
    }

    render () {
        return(
            <div>
                <div>Value</div>
                <div>{this.props.currentStock.value}</div>
            </div>
        )
    }



}

export default Stock;