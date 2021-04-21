import React, { Component } from 'react';
import Chart from 'chart.js';
import * as d3 from 'd3';

class LineChart extends Component{

    constructor(props){
        super(props)

        this.createGraph = this.createGraph.bind(this);
    }

    createGraph(){

        let data = [5, 10, 15, 20]
        let height = 200;
        let width = 200;
        let barWidth = 40;
        let barOffset = 20;
        d3.select('#line-chart').append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', '#dff0d8')
            .selectAll('rect').data(data)
            .enter().append('rect')
                .attr('width', barWidth)
                .attr('height', function(data){
                    return data
                })
                .attr('x', function (data, i) {
                    return i * (barWidth + barOffset);
                })
                .attr('y', function(data){
                    return height - data;
                })

    }



    render(){

        return(
            <div id='line-chart'>
                {this.createGraph()}
            </div>
        )
    }


}

export default LineChart;