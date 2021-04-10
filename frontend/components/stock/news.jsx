import React, { Component } from 'react';

class News extends Component{

    constructor(props){
        super(props)
        this.state = {
            news: [],
            gotNews: false
        }
        this.getNews = this.getNews.bind(this);
        this.convertPromise = this.convertPromise.bind(this);
        this.renderNews = this.renderNews.bind(this);
    }

    getNews(){
        fetch(`https://cors-container.herokuapp.com/https://cloud.iexapis.com/stable/stock/${this.props.currentStockAbv}/news/last?token=pk_338de47bba214f5bb31b35bd33a273e8`)
                .then(results => {
                    // console.log("here")
                    return results.json();
                    // this.convertPromise(results.json());
                })
                .then(data =>{
                    this.convertPromise(data);
        })
    }
    
    convertPromise(p){
        this.setState({ news: p, gotNews: true });
    }


    renderNews(){
        let first_news = [];
        let second_news = [];
        this.state.news.map(news => {
            if (first_news.length < 3){
                if (news.lang == "en"){
                    first_news.push(news)
                }
            } else {
                if (news.lang == "en"){
                    second_news.push(news)
                }
            }
        })
        return(
            <div className='news-list'>
                {first_news.map((news, i) => 
                    <div className='article' key={i} >
                        <div className='article-text'>
                            {news.headline}
                            <p id='article-summary'>{news.summary}</p>
                        </div>
                        <img className='article-image' src={news.image}/>
                    </div>
                )}

            </div>
        )
    }

    

    render(){
        if (this.state.gotNews == false){
            this.getNews();
        }
        console.log(this.state.news)
        return(
            <div>
                {this.renderNews()}
            </div>
        )
    }

}

export default News;