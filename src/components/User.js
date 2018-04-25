import React, { Component } from 'react'
import './User.css'
import api from '../api'
import LoadingSpinner from './LoadingSpinner'

class User extends Component {
    state = {
        user: {},
        loading : true
    }
    componentDidMount = () => {
        api.getUser(this.props.match.params.user_id)
          .then((res) => {
            this.setState({
              user: res.data,
              loading: false
            }) 
        })
    }
    render() {
        if (this.state.loading) return <div><LoadingSpinner/></div>
        return <Profile user={this.state.user}/>
    }
}

function Profile ({user}) {
    return (
        <div className='user-profile-box'>
            <img 
                className='profile-image' 
                src={user.avatar_url} 
                alt='avatar-url'>
            </img>
            <div className='user-name-info'>
                <p>Name: {user.name}</p>
                <p>Username: {user.username}</p>
            </div>
        </div>
    )
}

export default User