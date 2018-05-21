import React, {Component} from 'react'
import './ArticleList.css'
import PT from 'prop-types'
import axios from 'axios'
import Comments from './Comments'
import {Link} from 'react-router-dom'
import api from '../api'
import LoadingSpinner from './LoadingSpinner'

class ArticleList extends Component { 
    state = {
        articles: [],
        loading: true
    }

    componentDidMount = () => {
        const topicURL = `https://kris-ncnews.herokuapp.com/api/topics/${this.props.match.params.topic_id}/articles`
        const articleURL = `https://kris-ncnews.herokuapp.com/api/articles/${this.props.match.params.article_id}`
        !this.props.match.params.topic_id ? this.getArticles(articleURL) : this.getArticles(topicURL)
    }

    componentDidUpdate = (prevProps) => {
        const oldParams = prevProps.match.params.topic_id
        const newParams = this.props.match.params.topic_id
        if (newParams !== oldParams) 
        {const topicURL = `https://kris-ncnews.herokuapp.com/api/topics/${this.props.match.params.topic_id}/articles`
        const articleURL = `https://kris-ncnews.herokuapp.com/api/articles/${this.props.match.params.article_id}`
        !this.props.match.params.topic_id ? this.getArticles(articleURL) : this.getArticles(topicURL)
        this.setState({
            loading: true
        })}
    }

    getArticles = (url) => {axios.get(url).then((res) => {
        Array.isArray(res.data) ?
          this.setState({
              articles: res.data,
              loading: false
            }) : this.setState({
                articles: [res.data],
                loading: false
            })  
      })
    }
    

    render() {
    
    const {loggedInUser} = this.props
    const {articles, loading} = this.state
    const {topic_id} = this.props.match.params
    const onlyOne = this.state.articles.length === 1 ? false : true
    return (
        <div className={`artcile-box ${topic_id ? topic_id : 'solo-article'}`}>
            <ul className='article-list'>{articles.map(article => {
                return <Article 
                    article={article} 
                    loggedInUser={loggedInUser} 
                    onlyOne={onlyOne} 
                    key={article._id}
                    loading={loading}/>
            })}
            </ul>
        </div>
    )}
}

class Article extends Component {
    state = {
        hidden: true,
        voteCount: 0,
        loading: true
    }

    componentDidMount = () => {
        this.setState({
            voteCount : this.props.article.votes,
            loading: false
        })
    }

    showArticle = () => {
        if (this.state.hidden) 
            {this.setState({hidden : false})
        } else 
            {this.setState({hidden : true})
        }
    }

    articleVote = (value) => {
        api.articleVotePut(this.props.article._id, value)
        .then((res) => {
            console.log(res)
        })
        let newVoteCount = this.state.voteCount
        value === 'up' ? newVoteCount += 1 : newVoteCount -= 1
            this.setState({
                voteCount : newVoteCount
            })
    }

    render() {
    const {article, loggedInUser, onlyOne, loading} = this.props
    const topicLink = article.belongs_to.title.toLowerCase()
    if (loading) {return <div><LoadingSpinner/></div>} else {
    return (
        <div>
            <div className='article-link-box'>
                <div className='votes-number'>
                    <i 
                        className="fas fa-arrow-up arrow" 
                        onClick={() => this.articleVote('up')}>
                    </i>
                    <p>
                        {this.state.voteCount}
                    </p>
                    <i 
                        className="fas fa-arrow-down arrow" 
                        onClick={() => this.articleVote('down')}>
                    </i>
                </div>
                <div onClick={() => this.showArticle()}>
                    <li className='article-link'>{article.title}</li>
                    <p 
                        className='article-author'>Posted to 
                        <Link 
                            to={`/topics/${topicLink}`} 
                            className='article-topic-link'
                        >{` ${article.belongs_to.title} `}
                        </Link> by 
                        <Link 
                            to={`/users/${article.created_by.username}`} 
                            className='article-topic-link'
                        >{` ${article.created_by.name} `}
                        </Link>
                    </p>
                    <p className='comment-count'>{article.comments} comments</p>
                </div>
            </div>
            <div className={(this.state.hidden && onlyOne) ? 'hidden' : 'unhidden'} >
                <div className='article-body'>
                    <p>
                        {article.body}
                    </p>
                    <Link 
                        to={`/articles/${article._id}`} 
                        className={'full-article-link ' + (onlyOne ? 'com-unhidden' : 'hidden')}
                    >Get full article</Link>
                    <div className='comments-div'>
                        <Comments 
                            article={article} 
                            loggedInUser={loggedInUser}/>
                    </div>
                </div>
            </div>
        </div>
    )
    }}
    
    static propTypes = {
        article : PT.object.isRequired
    }
}

export default ArticleList