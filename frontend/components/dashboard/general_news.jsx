import React, { Component } from 'react';

class GeneralNews extends Component{

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
        fetch(`https://cors-container.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=10&apiKey=1db662cde6224aecb13f139643e6a136`)
            .then(results => {
                return results.json();
            })
            .then(
                data => {
                    this.convertPromise(data);
                }
            )
    }

    convertPromise(p){
        this.setState({ news: p, gotNews: true });
    }

    renderNews(){
        if(this.state.gotNews == true){
            return(
                <div className='news-list-gen'>
                    {this.state.news.articles.map((news, i) => 
                        <a href={news.url} target="_blank">
                            <div className='article-gen' key={i} >
                                <div className='article-text-gen'>
                                    <p id='article-source-gen'>{news.source.name}</p>
                                    <p id='article-headline-gen'>{news.title}</p>
                                    <p id='article-summary-gen'>{news.description}</p>
                                </div>
                                <img className='article-image-gen' src={news.urlToImage}/>
                            </div>
                        </a>
                    )}
    
                </div>
            )
        }
    }

    render(){
        if (this.state.gotNews == false){
            this.getNews();
        }
        return(
            <div className='setting-news'>
                <div id='stock-news'>
                    News
                </div>
                {this.renderNews()}
            </div>
        )
    }
    

}

export default GeneralNews;