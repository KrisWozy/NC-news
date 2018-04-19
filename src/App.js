import React, { Component } from 'react'
import Topics from './components/Topics'
import ArticleList from './components/ArticleList'
import User from './components/User'
import './App.css';
import axios from 'axios'
import {Route} from 'react-router-dom'
//import api from '../src/'


class App extends Component {
  state = {
    topics: []
  }
  componentDidMount = () => {
    
    axios.get(`https://kris-ncnews.herokuapp.com/api/topics`)
      .then((res) => {
        this.setState({
          topics: res.data
        }) 
      })
  }

  render() {
    const {topics} = this.state
    return (
      <div className="App">
        <h1>NC NEWS</h1>
        <Topics topics={topics}/>
        <Route exact path='/topics/:topic_id' component={ArticleList} />
        <Route exact path='/users/:user_id' component={User} />
        {/* <Route exact path='/users' component={Users}/> */}
      </div>
    )
  }
}

export default App;
