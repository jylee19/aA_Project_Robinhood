import React, { Component } from 'react';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation'

class PortfolioChart extends Component{

    constructor(props){
        super(props)
        this.state = {

        }

    }


    render(){


        return(
            <div>
                <h2 id='portfolio-value'>${(this.props.value).toFixed(2)}</h2>
            </div>
        )
    }
    

}

export default PortfolioChart;