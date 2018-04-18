import React from 'react'
import './Topics.css'
import PT from 'prop-types'

function Topics ({topics, changeTopic}) {
    return (
        <div>
            <ul>{topics.map(topic => {
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
    return <li onClick={() => changeTopic(topic)} className='topic-button' >{topic.title}</li>
}

export default Topics