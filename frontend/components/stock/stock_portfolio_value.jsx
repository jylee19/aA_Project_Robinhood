import React, { Component} from 'react';


class StockPortfolioValue extends Component{

    constructor(props){
        super(props)
        this.checkReturn = this.checkReturn.bind(this)
    }

    checkReturn(){
        let difference = (this.props.currentPrice - this.props.prevClose).toFixed(2) * this.props.numShares;
        let percentageChange = ((difference / (this.props.prevClose * this.props.numShares)) * 100).toFixed(2);
        if (difference >= 0){
            return(
                <div className='day-change'>
                    <div>
                        +${difference} (+{percentageChange}%)
                    </div>
                </div>
            )
        } else {
            difference = difference * -1;
            return(
                <div className='day-change'>
                    <div>
                        -${difference} ({percentageChange}%)
                    </div>
                </div>
            )
        }
    }

    checkTotalReturn(){
        let total_difference = ((this.props.currentPrice * this.props.numShares) - this.props.cost).toFixed(2);
        let total_percentageChange = (total_difference / (this.props.cost) * 100).toFixed(2);
        if (total_difference >= 0){
            return(
                <div className='day-change'>
                    <div>
                        +${total_difference} (+{total_percentageChange}%)
                    </div>
                </div>
            )
        } else {
            total_difference = total_difference * -1;
            return(
                <div className='day-change'>
                    <div>
                        -${total_difference} ({total_percentageChange}%)
                    </div>
                </div>
            )
        }
    }

    render(){
        return(
            <div className='stock-portfolio-value'>
                <div className='spv-box'>
                    <div id='help-center-spv'>
                            <p id='spv-box-title'>Your Market Value</p>
                            <div id='spv-money'>${this.props.currentValue}</div>
                        <div id='spv-container'> 
                            <p>Cost</p>
                            <div>${this.props.cost}</div>
                        </div>
                        <div id='spv-container'>
                            <p>Today's Return</p>
                            {this.checkReturn()}
                        </div>
                        <div id='spv-container-bottom'>
                            <p>Total Return</p>
                            {this.checkTotalReturn()}
                        </div>
                    </div>
                </div>
                <div className='spv-box'>
                    <div id='help-center-spv'>
                            <p id='spv-box-title'>Your Average Cost</p>
                            <div id='spv-money'>${this.props.avgCost.toFixed(2)}</div>
                        <div id='spv-container'>
                            <p>Shares</p>
                            <div>{this.props.numShares}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default StockPortfolioValue;