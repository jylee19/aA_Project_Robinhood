import React, { Component } from 'react';
import Chart from 'chart.js';
import * as d3 from 'd3';
import { range } from 'd3';

class LineChart extends Component{

    constructor(props){
        super(props)

        this.createGraph = this.createGraph.bind(this);
    }

    createGraph(){

        let data = [ {x:1, y:25}, {x:2, y:50}, {x: 3, y: 100}, {x:4, y: 150} ]
        let margin = {top: 5, right: 15, bottom: 15, left: 30};
        let height = 200 - margin.left - margin.right;
        let width = 200 - margin.top - margin.bottom;

        let xValue = [1,2,3,4]
        let yValue = [25,50,100,150]

        let xScale = d3.scaleLinear()
            .domain([0,5])
            range([0, width]);
        let yScale = d3.scaleLinear()
            .domain([0,1])
            .range([0, height])
        let line = d3.line()
            .x(function(d, i) { return xScale(i); })
            .y(function(d) { return yScale(d.y); })
            .curve(d3.curveMonotoneX)

        let svg = d3.select('#line-chart')
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform',
                      'translate(' + margin.left + ',' + margin.top + ')')
            .append('path')
                .attr('d', )
            .selectAll('circle').data(data)
            .enter().append('circle')
                .attr('cy', d=> yScale(yValue))
        
        

        // d3.select('#line-chart').append('svg')
        //     .attr('width', width)
        //     .attr('height', height)
        //     .style('background', '#dff0d8')
        //     .selectAll('rect').data(data)
        //     .enter().append('rect')
        //         .attr('width', barWidth)
        //         .attr('height', function(data){
        //             return data
        //         })
        //         .attr('x', function (data, i) {
        //             return i * (barWidth + barOffset);
        //         })
        //         .attr('y', function(data){
        //             return height - data;
        //         })

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