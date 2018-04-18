import React from 'react'
import './Topics.css'
import PT from 'prop-types'

function Topics ({topics, changeTopic}) {
    return (
        <div>
            <ul className='nav-bar'>{topics.map(topic => {
                return <Topic topic={topic} key={topic._id} changeTopic={changeTopic}/>
            })}</ul>
        </div>
    )
}

Topics.propTypes = {
    topics : PT.array.isRequired,
    changeTopic : PT.func.isRequired
}

function Topic ({changeTopic, topic}) {
    return <li onClick={() => changeTopic(topic)} className={`topic-button ${topic.title.toLowerCase()}`} >{topic.title}</li>
}

Topic.propTypes = {
    topic : PT.object.isRequired,
    changeTopic : PT.func.isRequired
}

export default Topics