import React, { Component } from 'react';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation'

Chart.plugins.register([ChartAnnotation])


// import { range } from 'd3';

class LineChart extends Component{
    
    constructor(props){
        super(props)
    
        this.state = {
            data: [],
            dates: [],
            time: undefined,
            price: this.props.current_price,
            getData: false
        }

        this.getData = this.getData.bind(this)
        this.convertPromise = this.convertPromise.bind(this)
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
                let idx = chart.tooltip._active[0]._index
                let time = chart.tooltip._data.labels[idx]
                // let price = chart.tooltip._data.datasets[0].data[idx]
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY + 20);
                ctx.lineTo(x, bottomY);
                ctx.fillText(time, x - 15 , 10);
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
        if(this.state.price){
            difference = (this.state.price - this.props.previous_close).toFixed(2);
        }else{
            difference = (this.props.current_price - this.props.previous_close).toFixed(2);
        }
        percentageChange = ((difference / this.props.previous_close) * 100).toFixed(2);
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

    getData(){
            fetch(`http://localhost:8080/https://cloud.iexapis.com/stable/stock/${this.props.abv}/intraday-prices/?token=pk_338de47bba214f5bb31b35bd33a273e8&chartInterval=5`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.convertPromise(data)       
            })

    }

    getCurrentTime(){
        let est = new Date().toLocaleString("en-US", {timeZone: "America/New_York", hour12: false})
        let hours_s = est[11] + est[12]
        let minutes_s = est[14]+ est[15]
        let hours = parseInt(hours_s)
        let minutes = parseInt(minutes_s)
        let time = ''
        if ((hours >= 12) && (hours < 16)){
            hours = hours - 12;
            time = `${hours}:${minutes} PM`
        } else if ((hours >= 16) || ((hours <= 9) && (minutes < 30))) {
            time = '4:00 PM'
        } else {
            time = `${hours}:${minutes} AM`
        }
        return time;
    }

    convertPromise(d){
        let arr = [];
        let dates = [];
        let holder;
        d.map((time, i) => { 
            if(time.average){
                arr.push(time.average.toFixed(2))
            } else {
                holder = arr[arr.length - 1]
                arr.push(holder)
            }
            dates.push(time.label)
        })
        if(this.props.current_price != null){
            arr.push(this.props.current_price.toFixed(2))
            dates.push(this.getCurrentTime())
        }
        this.setState({ data: arr, dates: dates, getData: true })
    }
    
    
    render(){
        if(this.state.getData == false){
            this.getData();

        }
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
                    value: this.props.annot,
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
                caretPadding: 20,
                displayColors: false,
                titleColor: 'rgb(64,73,77)',
                bodyColor: 'rgb(64,73,77)',
                useHTML: true
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
        
        return(
            <div id='line-chart'>
                <div id='stock-price'>${this.props.current_price}</div>
                {this.calculateDifference()}
                <div id='line-container'>
                    <Line
                        data={{
                            labels: this.state.dates,
                            datasets: [{
                                data: this.state.data,
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

export default LineChart;
