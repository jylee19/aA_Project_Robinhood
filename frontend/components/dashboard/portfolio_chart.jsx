import React, { Component } from 'react';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation'

class PortfolioChart extends Component{

    constructor(props){
        super(props)
        this.state = {
            time: undefined,
            value: this.props.value
        }

        this.getCurrentTime = this.getCurrentTime.bind(this)
        this.calculateDifference = this.calculateDifference.bind(this)
    }

    componentDidMount(){
        Chart.pluginService.register({
        beforeDraw: function(chart, easing) {
            if (chart.tooltip._active && chart.tooltip._active.length) {
                const activePoint = chart.controller.tooltip._active[0];
                const ctx = chart.ctx;
                const x = activePoint.tooltipPosition().x;
                const topY = chart.scales['y-axis-0'].top;
                const bottomY = chart.scales['y-axis-0'].bottom;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY + 20);
                ctx.lineTo(x, bottomY);
                ctx.fillText('Test', x - 15 , 10);
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#40494e';
                ctx.stroke();
                ctx.restore();
            }
        }
        });
    }

    calculateDifference(){
        let difference = 0;
        let percentageChange = 0;
        if(this.state.value){
            difference = (this.state.value - this.props.prev_close).toFixed(2);
        }else{
            difference = (this.props.value - this.props.prev_close).toFixed(2);
        }
        percentageChange = ((difference / this.props.prev_close) * 100).toFixed(2);
        if (difference >= 0){
            return(
                <div className='day-change'>
                    <div>
                        +${difference} (+{percentageChange}%)
                    </div>
                    <span id='today'>Today</span>
                </div>
            )
        } else {
            difference = difference * -1;
            return(
                <div className='day-change'>
                    <div>
                        -${difference} ({percentageChange}%)
                    </div>
                    <span id='today'>Today</span>
                </div>
            )
        }

    }

    getCurrentTime(){
        let d = new Date();
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let time = ''
        if ((hours >= 12) && (hours < 16)){
            time = `${hours}:${minutes} PM`
        } else if ((hours >= 16) || ((hours <= 9) && (minutes < 30))) {
            time = '4:00 PM'
        } else {
            time = `${hours}:${minutes} AM`
        }
        return time;
    }
    
    
    render(){
        // console.log(this.props.annot)
        let options = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        display: false
                    }
                }],
                xAxes: [{
                    ticks: {
                        display: false
                    }
                }]
            },
            annotation: {
                annotations: [{
                    drawTime: 'afterDatasetsDraw',
                    type: 'line',
                    mode: 'horizontal',
                    scaleID: 'y-axis-0',
                    value: this.props.prev_close,
                    borderColor: 'rgb(64,73,77)',
                    borderWidth: 1,
                    borderDash: [5,5],
                    borderCapStyle: 'round'
                }]
            },
            tooltips:{
                enabled: true,
                intersect: false,
                position: 'nearest',
                axis: 'x',
                displayColors: false
            },
            // interaction: {
            //     mode: 'nearest',
            //     axis: 'xy'
            // }
            hover:{
                intersect: false,
                mode: 'nearest',
                axis: 'x',
                animationDuration: 0
            }

        };
        let dates = []
        let prices = []
        let holder;
        let i;
        for(i = 0; i < this.props.graph_data.length; i++){
            dates.push(this.props.graph_data[i][0])
            holder = (parseFloat(this.props.graph_data[i][1]) + this.props.funds).toFixed(2)
            prices.push(holder)
        }
        
        dates.push(this.getCurrentTime())
        prices.push((this.props.value).toFixed(2))


        return(
            <div id='line-chart'>
                <div id='stock-price'>${this.props.value.toFixed(2)}</div>
                {this.calculateDifference()}
                <div>
                    <Line
                        data={{
                            labels: dates,
                            datasets: [{
                                data: prices,
                                fill: false,
                                backgroundColor: 'rgb(13,200,5)',
                                borderColor: 'rgb(13,200,5)',
                                borderWidth: 1,
                                radius: 0
                            }]
                        }}
                        height = {300}
                        width = {710}
                        options={options}
                    />
                </div>

            </div>
        )
    }
}

export default PortfolioChart;