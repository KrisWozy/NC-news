import React, {Component} from 'react'
import './Comments.css'
import PT from 'prop-types'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Comments extends Component {
    state = {
        comments: [],
        voteCount: 0
    }

    componentWillReceiveProps = () => {
        axios.get(`https://kris-ncnews.herokuapp.com/api/articles/${this.props.article._id}/comments`)
          .then((res) => {
            this.setState({
              comments: res.data
            }) 
        })
    }

    commentVote = (comment, value) => {
        axios.put(`https://kris-ncnews.herokuapp.com/api/comments/${comment._id}/?vote=${value}`)
        .then((res) => {
            console.log(res)
        })
        let newVoteCount = comment.votes
        value === 'up' ? newVoteCount += 1 : newVoteCount -= 1
            this.setState({
                voteCount : newVoteCount
            })
    }

    render() {
        const {loggedInUser, article} = this.props
        return(
        <div>
            <AddComment loggedInUser = {loggedInUser} article = {article}/>
        <ul className='comment-ul'>
            {this.state.comments.map((comment, i) => {
                return (
                    <li className='comment-list'>
                        <Comment comment={comment} commentVote={this.commentVote} key={comment._id} voteCount={this.state.voteCount}/>
                    </li>
                    )
            })}
        </ul>
        </div>
        )   
    }

}

Comments.propTypes = {
    article : PT.object.isRequired
}

function Comment ({comment, commentVote, voteCount}) {
    return (
        <div className='comment-box'>
            <img className='user-avatar' src={comment.created_by.avatar_url} alt='avatar-url'></img>
            <div className='comment-votes-number'>
                <i className="fas fa-arrow-up comment-arrows" onClick={() => commentVote(comment,'up')}></i>
                <p>{voteCount}</p>
                <i className="fas fa-arrow-down comment-arrows" onClick={() => commentVote(comment, 'down')}></i>
            </div>
            <div>
                <div className='comment-author-details'>
                    <label><Link to={`/users/${comment.created_by.username}`}>{comment.created_by.name}</Link> - </label>
                    <label>{formatDate(comment.created_at)}</label>
                </div>
                <p className='comment-body'>{comment.body}</p>
            </div>
        </div>
    )
}

class AddComment extends Component {
    state ={
        currentUser: this.props.loggedInUser,
        commentBody: '',
        article: this.props.article
    }

    handleChange = event => {
        const commentText = event.target.value
        this.setState({
            commentBody: commentText
        })
    }

    postComment = () => {
        axios.post(`https://kris-ncnews.herokuapp.com/api/articles/${this.state.article._id}/comments`, {
            body: this.state.commentBody,
            created_by: this.state.currentUser._id
          })
          .then((res) => {
              console.log(res)
          })
    }

    clearCommentField = () => {
        this.setState({
            commentBody: ''
        })
    }

    render () {
    return (
        <div>
            <textarea 
                type='text' 
                className='add-comment-field' 
                placeholder='Post a comment...' 
                onChange={this.handleChange}>
            </textarea>
            <button 
                className='comment-button' 
                onClick={() => {this.postComment(); this.clearCommentField()}}>Post
            </button>
        </div>
    )
    }
}

function formatDate(date){
    const newDate = new Date(date * 1000)
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const month = months[newDate.getMonth()]
    const day = newDate.getDate();
    const hour = newDate.getHours();
    const min = newDate.getMinutes();
    return `${day} ${month} - ${hour}:${min}` 
  }

export default Comments