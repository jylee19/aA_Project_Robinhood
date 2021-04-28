import React, { Component} from 'react';


class About extends Component{

    constructor(props){
        super(props)
        this.state = {
            ceo: null,
            employees: null,
            headquarters: null,
            founded: null,
            marketCap: null,
            peRatio: null,
            divYield: null,
            avgVolume: null,
            highToday: null,
            lowToday: null,
            openPrice: null,
            volume: null,
            yearHigh: null,
            yearLow: null,
            gotData1: false,
            gotData2: false,
            gotData3: false
        }
        this.convertPromise = this.convertPromise.bind(this)
        this.getInfo = this.getInfo.bind(this)
        this.rowOne = this.rowOne.bind(this)
        this.rowTwo = this.rowTwo.bind(this)
        this.rowThree = this.rowThree.bind(this)
        this.rowFour = this.rowFour.bind(this)
    }

    getInfo(){
        if(this.state.gotData1 == false){
            fetch(`https://cors-container.herokuapp.com/https://cloud.iexapis.com/stable/stock/${this.props.abv}/quote?token=pk_338de47bba214f5bb31b35bd33a273e8`)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    this.convertPromise(data, 1)
            })
        }else if(this.state.gotData2 == false){
            fetch(`https://cors-container.herokuapp.com/https://cloud.iexapis.com/stable/stock/${this.props.abv}/company?token=pk_338de47bba214f5bb31b35bd33a273e8`)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    this.convertPromise(data, 2)
                })

        } else if(this.state.gotData3 == false){
                fetch(`https://cors-container.herokuapp.com/https://www.alphavantage.co/query?function=OVERVIEW&symbol=${this.props.abv}&apikey=JLIBEKIH4Z1YQDP1`)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    this.convertPromise(data, 3)
            }) 

        }
    }
    

    convertPromise(data, n){
        console.log(data)
        let headquarters;
        let marketcap;
        let mc;
        if (n == 1){
            if (data.marketCap >= 1000000000000){
                marketcap = (data.marketCap / 1000000000000).toFixed(2);
                mc = `${marketcap}T`
            } else if (data.marketCap >= 1000000000){
                marketcap = (data.marketCap / 1000000000).toFixed(2);
                mc = `${marketcap}B`
            } else {
                marketcap = (data.marketCap / 1000000).toFixed(2);
                mc = `${marketcap}M`
            }
            this.setState({
                marketCap: mc,
                peRatio: data.peRatio,
                avgVolume: data.avgTotalVolume,
                volume: data.volume,
                yearHigh: data.week52High,
                yearLow: data.week52Low,
                lowToday: data.low,
                highToday: data.high,
                marketCap: mc,
                openPrice: data.open,
                gotData1: true
            })
        } else if (n == 2) {
            headquarters = data.city + ", " + data.state;
            this.setState({
                ceo: data.CEO, 
                employees: data.employees, 
                headquarters: headquarters,
                gotData2: true
            })
        } else {
            this.setState({
                divYield: data.DividendYield,
                gotData3: true
            });
        }
    }

    rowOne(){
        let row = {
            ceo: this.state.ceo,
            employees: this.state.employees,
            headquarters: this.state.headquarters ,
            founded: "-"  
        }

        return(
            <div className='row-container'>
                <div className='data-box'>
                    <p className='data-title'>CEO</p>
                    <p>{row.ceo}</p>
                </div>
                <div className='data-box'>
                    <p className='data-title'>Employees</p>
                    <p>{row.employees}</p>
                </div>
                <div className='data-box'>
                    <p className='data-title'>Headquarters</p>
                    <p>{row.headquarters}</p>
                </div>
                <div className='data-box'>
                    <p className='data-title'>Founded</p>
                    <p>{row.founded}</p>
                </div>
            </div>
        )

    }

    rowTwo(){
        let row = {
            mc: this.state.marketCap,
            pe: this.state.peRatio,
            dy: this.state.divYield,
            avgV: this.state.avgVolume
        }
        return(
            <div className='row-container'>
                <div className='data-box'>
                    <p className='data-title'>Market Cap</p>
                    <p>{row.mc}</p>
                </div>
                <div className='data-box'>
                    <p className='data-title'>Price-Earnings Ratio</p>
                    <p>{row.pe}</p>
                </div>
                <div className='data-box'>
                    <p className='data-title'>Dividend Yield</p>
                    <p>{row.dy}</p>
                </div>
                <div className='data-box'>
                    <p className='data-title'>Average Volume</p>
                    <p>{row.avgV}</p>
                </div>
            </div>
        )

    }

    rowThree(){
        // let row = {

        // }
        // return(
        //     <div>
        //         <div>
        //             <p></p>
        //             <p>{row.ceo}</p>
        //         </div>
        //         <div>
        //             <p>Employees</p>
        //             <p>{row.employees}</p>
        //         </div>
        //         <div>
        //             <p>Headquarters</p>
        //             <p>{row.headquarters}</p>
        //         </div>
        //         <div>
        //             <p>Founded</p>
        //             <p>{row.founded}</p>
        //         </div>
        //     </div>
        // )

    }

    rowFour(){
        // return(
        //     <div>
        //         <div>
        //             <p>CEO</p>
        //             <p>{row.ceo}</p>
        //         </div>
        //         <div>
        //             <p>Employees</p>
        //             <p>{row.employees}</p>
        //         </div>
        //         <div>
        //             <p>Headquarters</p>
        //             <p>{row.headquarters}</p>
        //         </div>
        //         <div>
        //             <p>Founded</p>
        //             <p>{row.founded}</p>
        //         </div>
        //     </div>
        // )

    }

    render(){
        this.getInfo();
        return(
            <div id='about-section'>
                <div id='about-title'>
                    About
                </div>
                <p id='about-description'>{this.props.description}</p>
                <div className='company-stats'>
                    <div className='stat-row'>
                        {this.rowOne()}
                    </div>
                    <div className='stat-row'>
                        {this.rowTwo()}
                    </div>
                    <div className='stat-row'>
                        {this.rowThree()}
                    </div>
                    <div className='stat-row'>
                        {this.rowFour()}
                    </div>
                </div>
            </div>
        )
    }

}

export default About;