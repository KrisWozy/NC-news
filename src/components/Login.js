import React, {Component} from 'react'
import './Login.css'

class Login extends Component {
    state = {
        username: ''
    }

    handleChange = event => {
        const newUser = event.target.value
        this.setState({
            username: newUser
        })
    }

    render () {
    const {newLogin} = this.props
    return (
        <div className='login-page'>
            <p><span className = 'redTags'>{'<'}</span>Login<span className = 'redTags'>{' />'}</span></p>
            <label>Username: </label>
            <input 
                className ='login-input' 
                onChange={this.handleChange}>
            </input>
            <button 
                className='login-button' 
                onClick={() => newLogin(this.state.username)}
            >Log in</button>
        </div>)
    }
}

export default Login