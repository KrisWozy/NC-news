import React, {Component} from 'react'
import './ArticleList.css'
import PT from 'prop-types'
import axios from 'axios'

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
    return (
        <div className={`artcile-box ${this.props.currentTopic}`}>
            <ul className='article-list'>{this.state.articles.map(article => {
                return( 
                    <ArticleLink article={article} key={article._id}/>
                )
            })}
            </ul>
        </div>
    )}
}

ArticleList.propTypes = {
    currentTopic : PT.string.isRequired
}

class ArticleLink extends Component {
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

    render() {
    const {article} = this.props
    return (
        <div>
            <div onClick={() => this.showArticle()} className='article-link-box'>
            <div className='votes-number'>{article.votes}</div>
                <div>
                    <li className='article-link'>{article.title}</li>
                    <p className='article-author'>Posted to {article.belongs_to.title} by {article.created_by.name}</p>
                    <p className='comment-count'>{article.comments} comments</p>
                </div>
            </div>
            <div className={(!this.state.hidden) ? 'unhidden' : 'hidden'} >
                <p className='article-body'>{article.body}</p>
            </div>
        </div>
    )
    } 
    
    static propTypes = {
        article : PT.object.isRequired
    }
}

export default ArticleList