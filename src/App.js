import React, { Component } from 'react'
import Topics from './components/Topics'
import ArticleList from './components/ArticleList'
import User from './components/User'
import Header from './components/Header'
import Login from './components/Login'
import Welcome from './components/Welcome'
import './App.css';
import {Route} from 'react-router-dom'
import api from './api'


class App extends Component {
  state = {
    topics: [],
    loggedInUser: {}
  }
  componentDidMount = () => {
    api.getTopics()
      .then((res) => {
        this.setState({
          topics: res.data
        }) 
      })
    api.getUser('northcoder')
      .then((res) => {
        this.setState({
          loggedInUser: res.data
        }) 
      })
  }

  newLogin = (newUser) => {
    api.getUser(newUser)
    .then((res) => {
      if (res.name) alert('Invalid user')
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
        <Route exact path='/' render={(props) => (
          <Welcome {...props} />)}/>
        <Route exact path='/topics/:topic_id' render={(props) => (
          <ArticleList {...props} loggedInUser={loggedInUser} />)}/>
        <Route exact path='/users/:user_id' component={User} />
        <Route exact path='/login' render={(props) => (
          <Login {...props} newLogin={this.newLogin}/>)} />
        <Route exact path='/articles/:article_id' render={(props) => (
          <ArticleList {...props} loggedInUser={loggedInUser} />)}/>
      </div>
    )
  }
}

export default App;
