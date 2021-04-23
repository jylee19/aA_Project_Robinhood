import React, { Component } from 'react';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';




// import { range } from 'd3';

class LineChart extends Component{
    
    constructor(props){
        super(props)
    
        this.state = {
            data: [],
            getData: false
        }

        this.getData = this.getData.bind(this)
        this.convertPromise = this.convertPromise.bind(this)
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

    convertPromise(d){
        console.log(d)
        let arr = [];
        d.map((time, i) => { 
            console.log(time.average);
            arr.push(time.average.toFixed(2))
        })
        if(this.props.current_price != null){
            arr.push(this.props.current_price.toFixed(2))
        }
        console.log(arr);
        this.setState({ data: arr, getData: true })
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
                    type: 'line',
                    mode: 'horizontal',
                    scaleID: 'y-axis-0',
                    value: this.props.annot,
                    borderColor: 'rgb(30,35,37)',
                    borderWidth: 2,
                    label: {
                        enable: false,
                        content: 'Test'
                    }

                }]
            }
        };
        
        return(
            <div id='line-chart'>
                <Line
                    data={{
                        labels: ['a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e',],
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
