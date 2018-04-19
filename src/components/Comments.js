import React, {Component} from 'react'
import './Comments.css'
import PT from 'prop-types'
import axios from 'axios'

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
    return(
        <div>
            <div>
                <h4>Post a comment</h4>
                <input></input>
            </div>
        <ul className='comment-ul'>
            {this.state.comments.map(comment => {
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
                <p>{comment.votes}</p>
                <i className="fas fa-arrow-down comment-arrows" onClick={() => commentVote(comment, 'down')}></i>
            </div>
            <div>
                <div className='comment-author-details'>
                    <label>{comment.created_by.name} - </label>
                    <label>{formatDate(comment.created_at)}</label>
                </div>
                <p className='comment-body'>{comment.body}</p>
            </div>
        </div>
    )
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