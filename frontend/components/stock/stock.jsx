import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import NewsContainer from './news_container';

class Stock extends Component {

    constructor(props){
        super(props);
        this.state = {
            abv: null,
            current_price: this.props.currentStock.current_price,
            redirect: null,
            tickers: []
        }
        this.tradeOptions = this.tradeOptions.bind(this);
        this.createBuy = this.createBuy.bind(this);
        this.createSell = this.createSell.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.convertPromise = this.convertPromise.bind(this);
        this.renderTickers = this.renderTickers.bind(this);
        this.redirectStock = this.redirectStock.bind(this);
        this.ownStock = this.ownStock.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.reviewOrder = this.reviewOrder.bind(this);
    }

    tradeOptions(){
        return(
            <div className='buy-sell-div'>
                <button className='trade-option' onClick={this.createBuy}>
                    Buy {this.props.currentStock.NYSE_abv}
                </button>
                {this.ownStock()}
            </div>
        )
    }

    ownStock(){
        console.log(this.props.currentStock)
        if (this.props.currentStock.number != null){
            return (
            <div>
                <button className='trade-option' onClick={this.createSell}>
                    Sell {this.props.currentStock.NYSE_abv}
                </button>
            </div>
            )
        }
        
    }

    createBuy(){
        console.log(this.props.currentStock.NYSE_abv)
        let stock = {
            NYSE_abv: this.props.currentStock.NYSE_abv,
            current_price: this.props.currentStock.current_price,
            portfolio_id: this.props.currentStock.portfolio_id,
            comp_description: this.props.currentStock.comp_description,
            number: 1,
            purchase_price: this.props.currentStock.purchase_price
        }

        this.props.buyStock(stock)
    }

    createSell(){
        let stock = {
            // id: this.props.currentStock.id,
            NYSE_abv: this.props.currentStock.NYSE_abv,
            current_price: this.props.currentStock.current_price,
            portfolio_id: this.props.currentStock.portfolio_id,
            comp_description: this.props.currentStock.comp_description,
            number: 1,
            purchase_price: this.props.currentStock.purchase_price
        }
        
        this.props.sellStock(stock)
    }

    reviewOrder(){

    }

    componentDidMount(){
        // console.log(this.props.currentStock.NYSE_abv)
        // setInterval(() => this.refreshData(), 10000)
    }

    refreshData(){
        // debugger
        if (this.props.currentStock.NYSE_abv !== undefined){
            console.log(this.props.currentStock)
            console.log(this.props.currentStock.NYSE_abv);
            console.log(this.props.currentPortfolio.id)
            let stock = {
                NYSE_abv: this.props.currentStock.NYSE_abv,
                portfolio_id: this.props.currentPortfolio.id
            }
            this.props.showStock(stock).then(this.setState({ current_price: this.props.currentStock.current_price }))
        }
    }

    renderTickers(){
        // console.log(this.state.tickers)
        if (this.state.tickers.length != 0 && this.state.abv != null){
            return(
                <div className = 'search-bar-tickers'>
                    {this.state.tickers.map((stocks, i) => 
                        <button className='search-btn' key={i} onClick={this.redirectStock} data-arg1={stocks.symbol}>
                            {`${stocks.symbol}, ${stocks.name}`}
                        </button>
                    )}
                </div>
            )
        }
    }

    handleSubmit(e){
        let stock = {
            NYSE_abv: this.state.abv,
            portfolio_id: this.props.currentPortfolio.id
        }
        this.props.showStock(stock);
        this.setState({ redirect: `/stocks/${this.state.abv}` })
    }

    redirectStock(e){
        let stock = {
            NYSE_abv: e.target.getAttribute('data-arg1'),
            portfolio_id: this.props.currentPortfolio.id
        }
        this.props.showStock(stock)
        this.setState({redirect: `/stocks/${stock.NYSE_abv}`})
    }

    convertPromise(p){
        this.setState({ tickers: p });
    }


    handleSearch(e){
        if(e.target.value === ""){
            this.setState({ abv: null })
        } else {
            this.setState({ abv: e.target.value })
            // console.log(e.target.value)
            fetch(`https://cors-container.herokuapp.com/https://ticker-2e1ica8b9.now.sh//keyword/${e.target.value}`)
                .then(results => {
                    // console.log("here")
                    return results.json();
                    // this.convertPromise(results.json());
                })
                .then(data =>{
                    this.convertPromise(data);
                })
            // console.log(this.state.tickers);
        }
    }

    handleKeyPress(e) {
        if ((e.key === 'Enter') && (this.state.abv != null)) {
            this.handleSubmit();
        }
    }

    render () {
        if (this.state.redirect && this.state.redirect != `/${this.props.currentStock.NYSE_abv}`) {
            return <Redirect to={this.state.redirect}/>
        } else {
            return(
                <div className='page'>
                    <div className="topnav">
                        <img className="logo-dashboard" src={window.logo} alt="cannot display"/>
                        <div className='search-bar'>
                            <input id='dashboard-search-nav' type="text" onChange={ this.handleSearch } onKeyUp = { this.handleKeyPress } placeholder="Search For A Stock" autoComplete='off'></input>
                            { this.renderTickers() }
                        </div>
                        <ul className='nav-dash-links'>
                            <btn className='dash-links'>Free Stocks</btn>
                            <btn className='dash-links'>Portfolio</btn>
                            <btn className='dash-links'>Cash</btn>
                            <btn className='dash-links'>Messages</btn>
                            <btn className='dash-links'>Account</btn>
                        </ul>
                    </div>
                    <div className='spacer'>
                    </div>
                    <div id='stock-name'>{this.props.currentStock.company_name}</div>
                    <div id='stock-price'>{this.props.currentStock.current_price}</div>
                    <div className='trade-section'>
                        {this.tradeOptions()}
                        <div className='trade-segments'>
                            <p id='trade-text'>Invest in</p>
                            <select className='trade-select'>
                                <option value="Dollars">Dollars</option>
                                <option value="Shares">Shares</option>  
                            </select>
                        </div>
                        <div className='trade-segments'>
                            <p id='trade-text'>Amount</p>
                            <input id='trade-amount'></input>
                        </div>
                        <div className='trade-segments'>
                            <p id='trade-text-quantity'>Est. Quantity</p>
                        </div>

                        <button className='review-order' onClick={this.reviewOrder}>Review Order</button>
                        <div id='bp-container'>
                            <div id='buying-power'>
                                ${this.props.currentPortfolio.funds.toFixed(2)} Buying Power Available
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        {this.props.currentStock.comp_description}
                    </div> */}
                    <NewsContainer
                        abv={this.props.currentStock.NYSE_abv}
                    />
                </div>
            )
        }
    }



}

export default Stock;