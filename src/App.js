import React, { Component } from 'react'
import Topics from './components/Topics'
import ArticleList from './components/ArticleList'
import './App.css';
import axios from 'axios'


class App extends Component {
  state = {
    topics: [],
    articles: [],
    currentTopic: 'coding'
  }
  componentDidMount = () => {
    axios.get(`https://kris-ncnews.herokuapp.com/api/topics`)
      .then((res) => {
        this.setState({
          topics: res.data
        }) 
      })
    axios.get(`https://kris-ncnews.herokuapp.com/api/topics/${this.state.currentTopic}/articles`)
      .then((res) => {
        this.setState({
          articles: res.data
        }) 
      })
  }

  changeTopic = topicToChange => {
    const requestedTopic = topicToChange.title.toLowerCase()
    this.setState({currentTopic: requestedTopic}, () => {
      this.componentDidMount()
    })
  }

  render() {
    const {topics, articles} = this.state
    return (
      <div className="App">
        <h1>NC NEWS</h1>
        <Topics changeTopic={this.changeTopic} topics={topics}/>
        <ArticleList articles={articles}/>
      </div>
    )
  }
}

export default App;
