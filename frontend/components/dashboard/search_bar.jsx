import React from 'react';
import { Redirect, withRouter } from 'react-router';
import Select from 'react-select';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedOption: null,
            abv: null,
            tickers: [],
            redirect: null
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.convertPromise = this.convertPromise.bind(this);
        this.renderTickers = this.renderTickers.bind(this);
    }

    handleSubmit(e){
        this.props.showStock(this.state.abv);
        this.setState({ redirect: `/${this.state.abv}` })
    }

    convertPromise(p){
        console.log(p)
        this.setState({ tickers: p });
    }

    handleSearch(e){
        console.log("here")
        this.setState({ abv: e.target.value })
        let tickers;
        console.log(e.target.value)
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

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    renderTickers(){
        //     return(
        //         <div className = 'search-bar-tickers'>
        //             {this.state.tickers.map((stocks, i) => 
        //                 <ul key={i}>
        //                     {`${stocks.symbol}, ${stocks.name}`}
        //                 </ul>
        //             )}
        //         </div>
        //     )
        // }
        let options = this.state.tickers.map((stocks, i) => 
            `${stocks.symbol}`
        )
        return options;
    }

    render(){
        return(
            <div>
                <Select 
                    id='select-stock'
                    value={this.state.selectedOption}
                    options={this.renderTickers()}
                    onChange={this.handleSearch}
                    placeholder="Search"
                    openMenuOnClick={false}
                    onKeyUp = {this.handleKeyPress}
                />
            </div>
        )
    }

}

export default SearchBar