import React from 'react';
import { Redirect, withRouter } from 'react-router';
import Select from 'react-select';

class Tracker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            asset: this.props.asset[0],
            current_price: this.props.asset[1],
            previous_close: this.props.asset[2],
            number: this.props.asset[3],
            redirect: null
        }

        this.redirectStock = this.redirectStock.bind(this)
        this.calculateDifference = this.calculateDifference.bind(this)
        this.properGrammer = this.properGrammer.bind(this)
    }

    redirectStock(e){
        let stock = {
            NYSE_abv: this.state.asset,
            portfolio_id: this.props.portfolio_id
        }
        this.props.showStock(stock)
        this.setState({redirect: `/stocks/${stock.NYSE_abv}`})
    }

    calculateDifference(){
        let difference = (this.state.current_price - this.state.previous_close).toFixed(2);
        let percentageChange = ((difference / this.state.previous_close) * 100).toFixed(2);
        if (difference >= 0){
            return(
                <p id='container-percentage-positive'>
                    +{percentageChange}%
                </p>
            )
        } else {
            difference = difference * -1;
            return(
                <p id='container-percentage-negative'>
                    {percentageChange}%
                </p>
            )
        }

    }

    properGrammer(){
        if(this.state.number <=1 ){
            return(
                <p id='container-num-shares'>{this.state.number} Share</p>
            )
        } else {
            return(
                <p id='container-num-shares'>{this.state.number} Shares</p>
            )
        }
    }

    render(){
        if(this.state.redirect){
            return <Redirect to={this.state.redirect}/>
        }
        let holder = this.state.current_price
        let polished = parseFloat(holder).toFixed(2)
        return(
            <button className='container-assets' onClick={this.redirectStock}>
                <div className='left-side-tracker'>
                    <p id='container-asset-name'>{this.state.asset}</p>
                    {this.properGrammer()}
                </div>
                <div className='right-side-tracker'>
                    <p id='container-current-price'>${polished}</p>
                    {this.calculateDifference()}
                </div>
            </button>

        )
    }

}

export default Tracker