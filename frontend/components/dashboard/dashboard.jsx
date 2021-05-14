import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import GeneralNews from './general_news';
import PortfolioChartContainer from './portfolio_chart_container';
import TrackerContainer from './tracker_container';
import FadeLoader from "react-spinners/FadeLoader";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.currentUser.id,
            portfolio_id: this.props.currentUser.id,
            abv: null,
            tickers: []
        }

        this.signout = this.signout.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.convertPromise = this.convertPromise.bind(this);
        this.renderTickers = this.renderTickers.bind(this);
        this.redirectStock = this.redirectStock.bind(this);
        this.createChart = this.createChart.bind(this);
        this.tracker = this.tracker.bind(this)
    }

    signout(e){
        this.props.logout()
        this.props.history.push('/');
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
            fetch(`http://localhost:8080/https://ticker-2e1ica8b9.now.sh//keyword/${e.target.value}`)
                .then(results => {
                    return results.json();
                })
                .then(data =>{
                    this.convertPromise(data);
                })
        }
    }

    renderTickers(){
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

    componentDidMount(){
        this.props.showPortfolio(this.props.currentUser.id)
    }

    createChart(){
        if(this.props.currentPortfolio.graph_data){
            return(
                    <PortfolioChartContainer
                        prev_close={this.props.currentPortfolio.prev_close}
                        value={this.props.currentPortfolio.value}
                        portfolio_id={this.props.currentPortfolio.id}
                        graph_data={this.props.currentPortfolio.graph_data}
                        funds={this.props.currentPortfolio.funds}
                    />
                
            )
        } else {
            return(
                <div id='placeholder-chart'>Welcome to Robingoods! Please buy any stock to visualize your portfolio</div>
            )
        }
    }

    tracker(){
        if(this.props.currentPortfolio.assets_owned){
            if(this.props.currentPortfolio.assets_owned.length != 0){
                return(
                    <div id='subtracker'>
                        {this.props.currentPortfolio.assets_owned.map((stock, i) => 
                            <TrackerContainer 
                                asset={stock}
                                portfolio_id={this.props.currentPortfolio.id}
                            />                                
                        )}
                    </div>
                )
            } else {
                return(
                    <div id='tracker-holder'>
                        Purchase stocks to keep track of them
                    </div>
                )
            }
        } else {
            return(
                    <div id='tracker-holder'>
                        Purchase stocks to keep track of them
                    </div>
            )  
        }

    }

    render(){
        const portfolio = this.props.currentPortfolio
        if(!portfolio){
            return(
                <div className='setting-loader'>
                    <FadeLoader
                        color={"#00c805"}
                        loading={true}
                        height={15}
                        width={5}
                        radius={2}
                        margin={2}
                    />
                </div>
            )
        } else {
            if(this.state.redirect) {
                return <Redirect to={this.state.redirect}/> 
            } else {
                return(
                    <div className='setting'>
                            <div className="topnav">
                                <img className="logo-dashboard" src={window.logo} alt="cannot display"/>
                                {/* <SearchBar /> */}
                                <div className='search-bar'>
                                    <input id='dashboard-search-nav' type="text" onChange={ this.handleSearch } placeholder="Search For A Stock" autoComplete='off'></input>
                                    { this.renderTickers() }
                                </div>
                                {/* <Select options={this.state.tickers} onChange={this.handleSearch} placeholder="Search" openMenuOnClick={false} /> */}
                                <ul className='nav-dash-links'>
                                    {this.props.otherForm}
                                    <btn className='dash-links' onClick={this.signout}>Log Out</btn>
                                </ul>
            
                            </div>
                        <div className='db-page'>
                            <div className='spacer'>
                            </div>
                            <div className='tracker'>
                                <div className='tracker-title'>Stocks</div>
                                {this.tracker()}
                            </div>
                            <div className='db-container'>
                                {this.createChart()}
                                <div className='buying-power'>
                                    <div id='bp'>Buying Power</div>
                                    <div id='liquidity' >${(this.props.currentPortfolio.funds).toFixed(2)}</div>
                                </div>
                                <GeneralNews/>
                            </div>
                        </div>
                    </div>
                )
            }
        }

    }


}

export default Dashboard