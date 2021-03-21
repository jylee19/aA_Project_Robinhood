import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Stock extends Component {

    constructor(props){
        super(props);
        this.state = {
            abv: null,
            value: null,
            portfolio_id: null,
            comp_description: null,
            number: 1,
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
    }

    tradeOptions(){
        return(
            <div>
                <button className='trade-option' onClick={this.createBuy}>
                    Buy {this.props.currentStock.NYSE_abv}
                </button>
                <button className='trade-option' onClick={this.createSell}>
                    Sell {this.props.currentStock.NYSE_abv}
                </button>
            </div>
        )
    }

    createBuy(){
        let stock = {
            NYSE_abv: 'APPL',
            value: 150,
            portfolio_id: 6,
            comp_description: "testing",
            number: 1,
            purchase_price: 150
        }
        
        this.props.buyStock(stock)
    }

    createSell(){

    }

    componentDidMount(){
        
    }

    renderTickers(){
        console.log(this.state.tickers)
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
        this.props.showStock(this.state.abv);
        this.setState({ redirect: `/stocks/${this.state.abv}` })
    }

    redirectStock(e){
        let stock = e.target.getAttribute('data-arg1');
        this.props.showStock(stock)
        this.setState({redirect: `/stocks/${stock}`})
    }

    convertPromise(p){
        console.log(p)
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
        console.log(this.state.redirect)
        if (this.state.redirect && this.state.redirect != `/${this.props.currentStock.NYSE_abv}`) {
            return <Redirect to={this.state.redirect}/>
        } else {
            return(
                <div>
                    <div className="topnav">
                        <img className="logo-dashboard" src={window.logo} alt="cannot display"/>
                        <div className='search-bar'>
                            <input id='dashboard-search-nav' type="text" onChange={ this.handleSearch } onKeyUp = { this.handleKeyPress } placeholder="Search For A Stock" autoComplete='off'></input>
                            { this.renderTickers() }
                        </div>
                        <ul className='nav-dash-links'>
                            <div className='dash-links'>Free Stocks</div>
                            <div className='dash-links'>Portfolio</div>
                            <div className='dash-links'>Cash</div>
                            <div className='dash-links'>Messages</div>
                            <div className='dash-links'>Account</div>
                        </ul>
                    </div>
                    <div>Value</div>
                    <div>{this.props.currentStock.value}</div>
                        {this.tradeOptions()}
                    <div>
                    {/* <div>
                        {this.props.currentStock.comp_description}
                    </div> */}
                    </div>
                </div>
            )
        }
    }



}

export default Stock;