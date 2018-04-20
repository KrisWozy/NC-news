import React, { Component } from 'react'
import './User.css'
import axios from 'axios'

class User extends Component {
    state = {
        user: {}
    }
    componentDidMount = () => {
        axios.get(`https://kris-ncnews.herokuapp.com/api/users/${this.props.match.params.user_id}`)
          .then((res) => {
            this.setState({
              user: res.data
            }) 
        })
    }
    render() {
        return <Profile user={this.state.user}/>
    }
}

function Profile ({user}) {
    return (
        <div className='user-profile-box'>
            <img className='profile-image' src={user.avatar_url} alt='avatar-url'></img>
            <div className='user-name-info'>
                <p>Name: {user.name}</p>
                <p>Username: {user.username}</p>
            </div>
        </div>
    )
}

export default User