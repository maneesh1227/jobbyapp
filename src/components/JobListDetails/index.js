import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiOutlineExport} from 'react-icons/ai'
import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatus = {
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobListDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    skills: [],
    lac: {},
    status: apiStatus.initial,
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({status: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const tokens = Cookies.get('jwtToken')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${tokens}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {job_details, similar_jobs} = data
      const updatedJobDetailsData = {
        companyLogoUrl: job_details.company_logo_url,
        companyWebsiteUrl: job_details.company_website_url,
        employmentType: job_details.employment_type,
        id: job_details.id,
        jobDescription: job_details.job_description,
        lifeAtCompany: job_details.life_at_company,
        location: job_details.location,
        packagePerAnnum: job_details.package_per_annum,
        rating: job_details.rating,
        skills: job_details.skills,
        title: job_details.title,
      }
      this.setState({
        jobDetails: updatedJobDetailsData,
        similarJobs: similar_jobs,
        skills: updatedJobDetailsData.skills,
        lac: updatedJobDetailsData.lifeAtCompany,
        status: apiStatus.success,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  onClickRetry = () => {
    window.location.reload()
  }

  render() {
    const {jobDetails, similarJobs, skills, lac, status} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    const {description, image_url} = lac
    let code
    switch (status) {
      case apiStatus.failure:
        code = (
          <div className="failure-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>!Oops Something Went Wrong</h1>
            <p>We can not seem to find page your looking</p>
            <button className="retry" onClick={this.onClickRetry} type="button">
              Retry
            </button>
          </div>
        )
        break
      case apiStatus.success:
        code = (
          <div className="details-back">
            <Header />
            <div className="job-list-details-back">
              <div className="logo-section">
                <img src={companyLogoUrl} alt="" className="company-logo" />
                <div>
                  <h1 className="jobs-list-title">{title}</h1>
                  <div className="rating-section">
                    <IoMdStar className="icon" />
                    <p className="jobs-list-rating">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="details-section">
                <div className="list-para-section">
                  <MdLocationOn className="icon" />
                  <p className="para-detail-section">{location}</p>
                </div>
                <div className="list-para-section">
                  <BsFillBriefcaseFill className="icon" />
                  <p className="para-detail-section">{employmentType}</p>
                </div>
                <p className="package-para">{packagePerAnnum}</p>
              </div>
              <hr />
              <div className="job-details-description-section">
                <div className="link-section">
                  <h1 className="jbd-description">Description</h1>
                  <a href={companyWebsiteUrl} className="visit">
                    <p className="visit-para">Visit</p>
                    <AiOutlineExport />
                  </a>
                </div>
                <p className="jobDescription-section">{jobDescription}</p>
              </div>
              <div className="skills-section-container">
                <h1 className="skills-head">Skills</h1>
                <ul className="skills-section">
                  {skills.map(eachItem => (
                    <Skills skill={eachItem} key={eachItem.name} />
                  ))}
                </ul>
              </div>
              <div className="life-at-company">
                <div className="life-at-company-para">
                  <h1 className="skills-head">Life at Compoany</h1>
                  <p>{description}</p>
                </div>
                <img
                  src={image_url}
                  alt="life at company"
                  className="life-at-company-image"
                />
              </div>
            </div>
            <div>
              <h1>Similar Jobs</h1>
              <ul className="similar-jobs-container">
                {similarJobs.map(eachItem => (
                  <SimilarJobs job={eachItem} key={eachItem.id} />
                ))}
              </ul>
            </div>
          </div>
        )
        break
      case apiStatus.inProgress:
        code = (
          <div data-testid="loader" className="loader">
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
          </div>
        )
        break
      default:
        code = null
    }

    return <div className="classback">{code}</div>
  }
}

export default JobListDetails
