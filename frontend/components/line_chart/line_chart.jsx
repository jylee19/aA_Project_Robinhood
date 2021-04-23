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
            getData: false
        }

        this.getData = this.getData.bind(this)
        this.convertPromise = this.convertPromise.bind(this)
        this.getCurrentTime = this.getCurrentTime.bind(this)
    }

    getData(){
            fetch(`https://cors-container.herokuapp.com/https://cloud.iexapis.com/stable/stock/${this.props.abv}/intraday-prices/?token=pk_338de47bba214f5bb31b35bd33a273e8&chartInterval=5`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.convertPromise(data)       
            })

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

    convertPromise(d){
        // console.log(d)
        let arr = [];
        let dates = [];
        d.map((time, i) => { 
            // console.log(time.average);
            arr.push(time.average.toFixed(2))
            dates.push(time.label)
        })
        console.log(this.props.current_price)
        if(this.props.current_price != null){
            arr.push(this.props.current_price.toFixed(2))
            dates.push(this.getCurrentTime())
        }
        // console.log(arr);
        console.log(dates)
        this.setState({ data: arr, dates: dates, getData: true })
    }
    
    
    render(){
        if(this.state.getData == false){
            this.getData();

        }
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
                    value: this.props.annot,
                    borderColor: 'rgb(64,73,77)',
                    borderWidth: 1,
                    borderDash: [5,5],
                    borderCapStyle: 'round'
                }]
            }
        };
        
        return(
            <div id='line-chart'>
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
        )
    }
    
    
}

export default LineChart;
