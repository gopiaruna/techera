import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

// Replace your code here
class CourseDetails extends Component {
  state = {status: 'loading', coursesArray: {}}

  componentDidMount() {
    this.getTechData()
  }

  getTechData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      console.log(data)

      const formattedData = {
        description: data.course_details.description,
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }

      this.setState({
        status: 'success',
        coursesArray: formattedData,
      })
    } else {
      console.log(data.error_msg)
      this.setState({
        status: 'failure',
      })
    }
  }

  onRetryBtn = () => {
    this.getTechData()
  }

  getLoader = () => (
    <div data-testid="loader" className="load">
      <Loader type="ThreeDots" color="blue" />
    </div>
  )

  getSuccessData = () => {
    const {coursesArray} = this.state
    return (
      <div className="card-details-cont">
        <div className="card-cont">
          <img
            src={coursesArray.imageUrl}
            alt={coursesArray.name}
            className="card-image"
          />
          <div className="data-content-cont">
            <h1>{coursesArray.name}</h1>
            <p className="desc-card">{coursesArray.description}</p>
          </div>
        </div>
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

      <button type="button" className="retry-btn" onClick={this.onRetryBtn}>
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

export default CourseDetails
