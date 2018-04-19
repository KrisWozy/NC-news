import React, {Component} from 'react'
import './ArticleList.css'
import PT from 'prop-types'
import axios from 'axios'
import Comments from './Comments'

class ArticleList extends Component {
    state = {
        articles: []
    }

    componentWillReceiveProps = () => {
        axios.get(`https://kris-ncnews.herokuapp.com/api/topics/${this.props.currentTopic}/articles`)
          .then((res) => {
            this.setState({
              articles: res.data
            }) 
        })
    }

    render() {
    const {currentTopic} = this.props
    return (
        <div className={`artcile-box ${currentTopic}`}>
            <ul className='article-list'>{this.state.articles.map(article => {
                return( 
                    <Article article={article} key={article._id} componentWillReceiveProps={this.componentWillReceiveProps}/>
                )
            })}
            </ul>
        </div>
    )}
}

ArticleList.propTypes = {
    currentTopic : PT.string.isRequired
}

class Article extends Component {
    state = {
        hidden: true
    }

    showArticle = () => {
        if (this.state.hidden) 
            {this.setState({hidden : false})
        } else 
            {this.setState({hidden : true})
        }
    }

    articleVote = (value) => {
        axios.put(`https://kris-ncnews.herokuapp.com/api/articles/${this.props.article._id}/?vote=${value}`)
        .then(() => this.props.componentWillReceiveProps())
    }

    render() {
    const {article} = this.props
    return (
        <div>
            <div className='article-link-box'>
                <div className='votes-number'>
                    <i className="fas fa-arrow-up arrow" onClick={() => this.articleVote('up')}></i>
                    <p>{article.votes}</p>
                    <i className="fas fa-arrow-down arrow" onClick={() => this.articleVote('down')}></i>
                </div>
                <div onClick={() => this.showArticle()}>
                    <li className='article-link'>{article.title}</li>
                    <p className='article-author'>Posted to {article.belongs_to.title} by {article.created_by.name}</p>
                    <p className='comment-count'>{article.comments} comments</p>
                </div>
            </div>
            <div className={(!this.state.hidden) ? 'unhidden' : 'hidden'} >
                <div className='article-body'>
                    <p>{article.body}</p>
                    <p>Comments</p>
                    <div className='comments-div'>
                        <Comments article={article}/>
                    </div>
                </div>
            </div>
        </div>
    )
    } 
    
    static propTypes = {
        article : PT.object.isRequired
    }
}

export default ArticleList