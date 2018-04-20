import React, { Component } from 'react'
import Topics from './components/Topics'
import ArticleList from './components/ArticleList'
import User from './components/User'
import Header from './components/Header'
import './App.css';
import axios from 'axios'
import {Route} from 'react-router-dom'
//import api from '../src/'


class App extends Component {
  state = {
    topics: [],
    loggedInUser: {}
  }
  componentDidMount = () => {
    axios.get(`https://kris-ncnews.herokuapp.com/api/topics`)
      .then((res) => {
        this.setState({
          topics: res.data
        }) 
      })
    axios.get(`https://kris-ncnews.herokuapp.com/api/users/northcoder`)
      .then((res) => {
        this.setState({
          loggedInUser: res.data
        }) 
      })
  }

  render() {
    const {topics, loggedInUser} = this.state
    return (
      <div className="App">
        <Header loggedInUser={loggedInUser}/>
        <Topics topics={topics}/>
        <Route exact path='/topics/:topic_id' render={(props) => (
        <ArticleList {...props} loggedInUser={loggedInUser} />)}/>
        <Route exact path='/users/:user_id' component={User} />
        <Route exact path='/articles/:article_id' render={(props) => (
        <ArticleList {...props} loggedInUser={loggedInUser} />)}/>

        {/* <Route exact path='/users' component={Users}/> */}
      </div>
    )
  }
}

export default App;
