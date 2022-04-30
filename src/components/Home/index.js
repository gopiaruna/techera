import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

// Replace your code here
class Home extends Component {
  state = {status: 'loading', coursesArray: []}

  componentDidMount() {
    this.getTechList()
  }

  getTechList = async () => {
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      console.log(data)

      const formattedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))

      this.setState({
        coursesArray: formattedData,
        status: 'success',
      })
    } else {
      console.log(data.error_msg)
      this.setState({
        status: 'failure',
      })
    }
  }

  onClickRetryBtn = () => {
    this.getTechList()
  }

  getLoader = () => (
    <div data-testid="loader" className="load">
      <Loader type="ThreeDots" color="blue" />
    </div>
  )

  getSuccessData = () => {
    const {coursesArray} = this.state
    return (
      <div>
        <h1 className="heading">Courses</h1>
        <ul className="courses-list-cont">
          {coursesArray.map(eachCourse => (
            <li key={eachCourse.id}>
              <Link to={`/courses/${eachCourse.id}`}>
                <div className="card-display-cont">
                  <img src={eachCourse.logoUrl} alt={eachCourse.name} />
                  <p className="name">{eachCourse.name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  getErrorMessage = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  getResponseFromStatus = () => {
    const {status} = this.state
    switch (status) {
      case 'loading':
        return this.getLoader()
      case 'success':
        return this.getSuccessData()
      case 'failure':
        return this.getErrorMessage()
      default:
        return null
    }
  }

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
        {this.getResponseFromStatus()}
      </div>
    )
  }
}

export default Home
