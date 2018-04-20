import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'

function Header ({loggedInUser}) {
    return (
        <div>
            <div className='login-details'>
                <img 
                    className='mini-avatar-image' 
                    src={loggedInUser.avatar_url} 
                    alt='user'>
                </img>
                <div className='logged-in-info'>
                    <span>You are logged in as: {loggedInUser.name}</span>
                    <p 
                        className='profile-links'>
                        <Link to={`/users/${loggedInUser.username}`}
                        >Profile</Link>
                            <span> - </span>
                        <Link to={`/`}
                        >Log out</Link>
                    </p>
                </div>
            </div>
            <p className='main-header'>
                <span className = 'redTags'>
                    {'<'}
                </span>Northcoders News<span className = 'redTags'>
                    {' />'}
                </span>
            </p>  
        </div>
    )
}

export default Header 