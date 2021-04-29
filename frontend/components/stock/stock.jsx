import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import NewsContainer from './news_container';
import LineChartContainer from '../line_chart/line_chart_container';
import StockPortfolioValue from './stock_portfolio_value';
import About from './about';
import { id } from 'chartjs-plugin-annotation';

class Stock extends Component {

    constructor(props){
        super(props);
        this.state = {
            abv: null,
            redirect: null,
            tickers: [],
            option: 'buy',
            method: 'Dollars',
            shareAmount: 0,
            dollarAmount: 0,
            refresh: false
        }
        this.sendToDB = this.sendToDB.bind(this);
        this.tradeOptions = this.tradeOptions.bind(this);
        this.createBuy = this.createBuy.bind(this);
        this.createSell = this.createSell.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.convertPromise = this.convertPromise.bind(this);
        this.renderTickers = this.renderTickers.bind(this);
        this.redirectStock = this.redirectStock.bind(this);
        this.ownStock = this.ownStock.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.reviewOrder = this.reviewOrder.bind(this);
        this.calculateDifference = this.calculateDifference.bind(this)
        this.portfolioValue = this.portfolioValue.bind(this);
        this.tradeSegment = this.tradeSegment.bind(this);
        this.buyBtn = this.buyBtn.bind(this);
        this.sellBtn = this.sellBtn.bind(this);
        this.bottomText = this.bottomText.bind(this);
        this.tradeType = this.tradeType.bind(this);
        this.amountTraded = this.amountTraded.bind(this);
        this.updateAmount = this.updateAmount.bind(this);
        this.estimate = this.estimate.bind(this);
        this.setMethod = this.setMethod.bind(this);
        this.signout = this.signout.bind(this);
        // this.buyShare = this.buyShare.bind(this);
        // this.sellShare = this.sellShare.bind(this);
    }

    signout(e){
        this.props.logout();
    }

    tradeSegment(){
        return(
            <div className='trade-section'>
                {this.tradeOptions()}
                <div className='trade-segments'>
                    <p id='trade-text'>Invest in</p>
                    <select className='trade-select' onChange={this.setMethod}>
                        <option value="Dollars">Dollars</option>
                        <option value="Shares">Shares</option>  
                    </select>
                </div>
                {this.tradeType()}
                {this.marketPrice()}
                {this.amountTraded()}
                <button className='review-order' onClick={this.reviewOrder}>Review Order</button>
                <div id='bp-container'>
                    {this.bottomText()}
                </div>
            </div>
        )

    }

    setMethod(e){
        let method = e.target.value;
        console.log(method);
        this.setState({method: method})
    }
    
    marketPrice(){
        if(this.state.method == 'Shares'){
            return(
                <div className='trade-segments'>
                    <p id='market-price'>Market Price</p>
                    <p id='market-price-dollar'>${this.props.currentStock.current_price.toFixed(2)}</p>
                </div>
            )
        }
    }

    amountTraded(){
        if(this.state.method == 'Dollars'){
            return(
                <div className='estimate-segment'>
                    <p id='trade-text-quantity'>Est. Quantity</p>
                    <p id='trade-text-quantity'>{this.estimate()}</p>
                </div>    
            )
        } else {
            return(
                <div className='estimate-segment'>
                    <p id='trade-text-quantity'>Estimated Cost</p>
                    <p id='trade-text-quantity'>${this.estimate()}</p>
                </div>    
            )
        }

    }

    estimate(){
        let estimation = 0;
        if ((this.state.method == 'Dollars') && (this.state.dollarAmount != 0)){
            estimation = (this.state.dollarAmount / this.props.currentStock.current_price).toFixed(6)
        } else if ((this.state.method == 'Shares') && (this.state.shareAmount != 0)){
            estimation = (this.state.shareAmount * this.props.currentStock.current_price).toFixed(2)
        }
        return estimation
    }

    updateAmount(e){
        let amount = parseFloat(e.target.value);
        if (this.state.method == 'Dollars'){
            this.setState({dollarAmount: amount})
        } else {
            this.setState({shareAmount: amount})
        }

    }

    tradeType(){
        if (this.state.method == 'Dollars'){
            return(
                <div className='trade-segments'>
                    <p id='trade-text'>Amount</p>
                    <input id='trade-amount' placeholder='$0.00' onChange={this.updateAmount} autoComplete='off'></input>
                </div>
            )
        } else {
            return(
                <div className='trade-segments'>
                    <p id='trade-text'>Shares</p>
                    <input id='trade-amount' placeholder='0' onChange={this.updateAmount} autoComplete='off'></input>
                </div>
            )
        }

    }

    bottomText(){
        if (this.state.option == 'buy'){
            return(
                <div id='buying-power'>
                    ${this.props.currentPortfolio.funds.toFixed(2)} Buying Power Available
                </div>
            )
        } else {
            let currentValue = this.props.currentStock.current_price * this.props.currentStock.number.toFixed(2);
            return(
                <div id='sell-available'>
                    ${currentValue} Available
                </div>
            )
        }

    }


    tradeOptions(){
        return(
            <div className='buy-sell-div'>
                <button className='trade-option' onClick={this.buyBtn}>
                    Buy {this.props.currentStock.NYSE_abv}
                </button>
                {this.ownStock()}
            </div>
        )
    }

    ownStock(){
        // console.log(this.props.currentStock)
        if (this.props.currentStock.number != null){
            return (
            <div>
                <button className='trade-option' onClick={this.sellBtn}>
                    Sell {this.props.currentStock.NYSE_abv}
                </button>
            </div>
            )
        }
        
    }

    buyBtn(){
        if(this.state.option != 'buy'){
            this.setState({option: 'buy'})
        }
    }

    sellBtn(){
        if(this.state.option != 'sell'){
            this.setState({option: 'sell'})
        }
    }

    createBuy(){
        let stock;
        if (this.state.method == 'Dollars'){
            stock = {
                NYSE_abv: this.props.currentStock.NYSE_abv,
                current_price: this.props.currentStock.current_price,
                portfolio_id: this.props.currentStock.portfolio_id,
                comp_description: this.props.currentStock.comp_description,
                number: (this.state.dollarAmount / this.props.currentStock.current_price).toFixed(6),
                purchase_price: this.props.currentStock.purchase_price
            }
        } else {
            stock = {
                NYSE_abv: this.props.currentStock.NYSE_abv,
                current_price: this.props.currentStock.current_price,
                portfolio_id: this.props.currentStock.portfolio_id,
                comp_description: this.props.currentStock.comp_description,
                number: this.state.shareAmount,
                purchase_price: this.props.currentStock.purchase_price   
            }         
        }

        this.props.buyStock(stock)
        const refresh = {
            NYSE_abv: this.props.currentStock.NYSE_abv,
            portfolio_id: this.props.userID
        }
        let number = this.state.number + stock.number
        // this.props.showStock(refresh).then(this.setState({number: number}))
        window.location.reload();
    }

    createSell(){
        let stock;
        if (this.state.method == 'Dollars'){
            stock = {
                NYSE_abv: this.props.currentStock.NYSE_abv,
                current_price: this.props.currentStock.current_price,
                portfolio_id: this.props.currentStock.portfolio_id,
                comp_description: this.props.currentStock.comp_description,
                number: (this.state.dollarAmount / this.props.currentStock.current_price).toFixed(6),
                purchase_price: this.props.currentStock.purchase_price
            }
        } else {
            stock = {
                NYSE_abv: this.props.currentStock.NYSE_abv,
                current_price: this.props.currentStock.current_price,
                portfolio_id: this.props.currentStock.portfolio_id,
                comp_description: this.props.currentStock.comp_description,
                number: this.state.shareAmount,
                purchase_price: this.props.currentStock.purchase_price   
            }         
        }
        
        this.props.sellStock(stock)
        // window.location.reload();
    }

    reviewOrder(){
        if (this.state.option =='buy'){
            this.createBuy()
        } else {
            this.createSell()
        }

    }

    componentDidMount(){
        
        const stock = {
            NYSE_abv: this.props.match.params.stock,
            portfolio_id: this.props.userID
        }
        
        this.props.showStock(stock)
        this.props.showPortfolio(this.props.userID)
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

    calculateDifference(){
        let difference = (this.props.currentStock.current_price - this.props.currentStock.previous_close).toFixed(2);
        let percentageChange = ((difference / this.props.currentStock.previous_close) * 100).toFixed(2);
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

    portfolioValue(){
        if (this.props.currentStock.number) {
            let cost = (this.props.currentStock.purchase_price * this.props.currentStock.number).toFixed(2);
            let currentValue = this.props.currentStock.current_price * this.props.currentStock.number.toFixed(2);
            return(
                <StockPortfolioValue
                    cost={cost}
                    avgCost={this.props.currentStock.purchase_price}
                    numShares={this.props.currentStock.number}
                    prevClose={this.props.currentStock.previous_close}
                    currentPrice={this.props.currentStock.current_price}
                    currentValue={currentValue}
                />
            )
        }


    }

    sendToDB(){
        this.setState({redirect: `/users`})
    }

    render () {
        console.log(this.props.match.params)
        const stock = this.props.currentStock
        console.log(stock)
        const portfolio = this.props.currentPortfolio
        if (!stock || !portfolio){
            return (
                <div>Loading Stock...</div>
            )
        } else {
            if (this.state.redirect && this.state.redirect != `/${this.props.currentStock.NYSE_abv}`) {
                return <Redirect to={this.state.redirect}/>
            } else {
                return(
                    <div className='setting'>
                            <div className="topnav">
                                <img className="logo-dashboard" src={window.logo} alt="cannot display"/>
                                <div className='search-bar'>
                                    <input id='dashboard-search-nav' type="text" onChange={ this.handleSearch } placeholder="Search For A Stock" autoComplete='off'></input>
                                    { this.renderTickers() }
                                </div>
                                <ul className='nav-dash-links'>
                                    <btn className='dash-links' onClick={this.sendToDB}>Portfolio</btn>
                                    <btn className='dash-links' onClick={this.signout}>Log Out</btn>
                                </ul>
                            </div>
                        <div className='page'>
                            <div className='spacer'>
                            </div>
                            <div id='stock-name'>{this.props.currentStock.company_name}</div>
                            {this.tradeSegment()}
                            <LineChartContainer
                                abv={this.props.currentStock.NYSE_abv}
                                current_price={this.props.currentStock.current_price}
                                prev_close={this.props.currentStock.previous_close}
                                annot={this.props.currentStock.previous_close}
                            />
                            {this.portfolioValue()}
                            <About
                                abv={this.props.currentStock.NYSE_abv}
                                description={this.props.currentStock.comp_description}
                            />
                            <NewsContainer
                                abv={this.props.currentStock.NYSE_abv}
                            />
                        </div>
                    </div>
                )
            }
        }
    }



}

export default Stock;