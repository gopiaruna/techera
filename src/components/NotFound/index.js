import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

// Replace your code here
class NotFound extends Component {
  render() {
    return (
      <div>
        <div className="nav-cont">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
        </div>
        <div className="not-found-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
            alt="not found"
            className="not-found-img"
          />
          <h1>Page Not Found</h1>
          <p>We are sorry, the page you requested could not be found.</p>
        </div>
      </div>
    )
  }
}

export default NotFound
