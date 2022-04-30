import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import CourseDetails from './components/CourseDetails'
import './App.css'
import NotFound from './components/NotFound'

// Replace your code here

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/courses/:id" component={CourseDetails} />
        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App
