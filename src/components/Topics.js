import React from 'react'
import './Topics.css'
import PT from 'prop-types'
import {Link} from 'react-router-dom'

function Topics (props) {
    const topics = props.topics
    return (
        <div className='nav-bar'>
            <ul className='nav-bar'>{topics.map(topic => {
                return <Topic topic={topic} key={topic._id}/>
                })}
            </ul>
        </div>
    )
}

Topics.propTypes = {
    topics : PT.array.isRequired,
}

function Topic ({topic}) {
    return (
        <li className={`topic-button ${topic.title.toLowerCase()}`} >
            <Link to={`/topics/${topic.slug}`} className='topic-link'>{topic.title}</Link>
        </li>
        )
}

Topic.propTypes = {
    topic : PT.object.isRequired,
}

export default Topics