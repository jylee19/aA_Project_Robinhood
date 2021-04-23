import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import SearchBar from './search_bar';
import GeneralNews from './general_news';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.currentUser.id,
            portfolio_id: this.props.currentUser.id,
            abv: null,
            redirect: null,
            tickers: []
        }
        // if (this.props.currentUser.portfolio_id === null){
        //     this.props.makePortfolio(this.state)
        //     this.props.updatePortfolioId(this.state);
        // } else {
        //     this.props.showPortfolio(this.state.id);
        // }
        this.signout = this.signout.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.convertPromise = this.convertPromise.bind(this);
        this.renderTickers = this.renderTickers.bind(this);
        this.redirectStock = this.redirectStock.bind(this);
    }

    signout(e){
        this.props.logout();
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
        this.props.showPortfolio(this.state.portfolio_id)
    }

    render(){
        // console.log(this.state.abv)
        // console.log(this.state.tickers)
        if(!this.props.currentPortfolio){
            return null
        } else if(this.state.redirect) {
            return <Redirect to={this.state.redirect}/> 
        } else {
            return(
                <div className='setting'>
                        <div className="topnav">
                            <img className="logo-dashboard" src={window.logo} alt="cannot display"/>
                            {/* <SearchBar /> */}
                            <div className='search-bar'>
                                <input id='dashboard-search-nav' type="text" onChange={ this.handleSearch } onKeyUp = { this.handleKeyPress } placeholder="Search For A Stock" autoComplete='off'></input>
                                { this.renderTickers() }
                            </div>
                            {/* <Select options={this.state.tickers} onChange={this.handleSearch} placeholder="Search" openMenuOnClick={false} /> */}
                            <ul className='nav-dash-links'>
                                <div className='dash-links'>Portfolio</div>
                                <btn className='dash-links'>Account</btn>
                                <btn className='dash-links' onClick={this.signout}>Log Out</btn>
                            </ul>
        
                        </div>
                    <div className='db-page'>
                        <div className='spacer'>
                        </div>

                        <div className='db-container'>
                            <h2 id='portfolio-value'>${(this.props.currentPortfolio.value).toFixed(2)}</h2>
                            <div className='buying-power'>
                                <div id='bp'>Buying Power</div>
                                <div id='liquidity' >${(this.props.currentPortfolio.funds).toFixed(2)}</div>
                            </div>
                            <GeneralNews/>


                            <Link className="btn" to={`/users/${this.state.id}/edit`}>Change User Information</Link>
            
                        </div>
                    </div>
                </div>
            )
        }

    }


}

export default Dashboard