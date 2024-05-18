import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoMdSearch} from 'react-icons/io'
import Header from '../Header'
import JobsList from '../JobsList'
import Profile from '../Profile'
import Employment from '../Employment'
import Salary from '../Salary'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatus = {
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileData: {},
    jobsList: [],
    searchValue: '',
    employment: [],
    salary: 0,
    status: apiStatus.initial,
  }

  componentDidMount = () => {
    this.getJobsList()
    this.getProfileDetails()
  }

  getJobsList = async () => {
    this.setState({status: apiStatus.inProgress})
    const token = Cookies.get('jwtToken')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const {jobs, total} = fetchedData
      const formatedData = jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({jobsList: formatedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({status: apiStatus.inProgress})
    const token = Cookies.get('jwtToken')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const {profile_details} = fetchedData
      const formatedProfileData = {
        name: profile_details.name,
        profileImageUrl: profile_details.profile_image_url,
        shortBio: profile_details.short_bio,
      }
      this.setState({
        profileData: formatedProfileData,
        status: apiStatus.success,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  checkBoxChecked = value => {
    const {employment} = this.state
    if (employment.includes(value) !== true) {
      this.setState(prevState => ({
        employment: [...prevState.employment, value],
      }))
    } else {
      const newList = employment.filter(eachItem => eachItem !== value)
      this.setState({employment: newList})
    }
  }

  selectSalary = val => {
    const valu = parseInt(val.slice(0, 2))
    this.setState({salary: valu})
  }

  onClickRetry = () => {
    window.location.reload()
  }

  render() {
    const {jobsList, profileData, searchValue, employment, salary, status} =
      this.state
    let updatedJobsList = jobsList.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchValue.toLocaleLowerCase()),
    )
    let updatedJobsList2
    if (employment.length !== 0) {
      updatedJobsList2 = updatedJobsList.filter(eachItem =>
        employment.includes(eachItem.employmentType),
      )
    } else {
      updatedJobsList2 = [...updatedJobsList]
    }

    const updatedJobsList3 = updatedJobsList2.filter(
      eachItem => parseInt(eachItem.packagePerAnnum.slice(0, 2)) >= salary,
    )

    let code
    let profileCode
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
        profileCode = (
          <button className="retry" onClick={this.onClickRetry} type="button">
            Retry
          </button>
        )
        break
      case apiStatus.success:
        code = (
          <ul>
            {updatedJobsList3.map(eachItem => (
              <JobsList item={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )
        profileCode = <Profile data={profileData} />
        break
      case apiStatus.inProgress:
        profileCode = (
          <div data-testid="loader" className="loader">
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
          </div>
        )
        code = (
          <div data-testid="loader" className="loader">
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
          </div>
        )
        break
      default:
        code = null
        profileCode = null
    }

    return (
      <div className="jobs-back">
        <Header />
        <div className="jobs-containers">
          <div className="jobs-left-container">
            {profileCode}
            <hr />
            <ul className="employment-list">
              {employmentTypesList.map(eachItem => (
                <Employment
                  employmentList={eachItem}
                  key={eachItem.employmentTypeId}
                  checkBoxChecked={this.checkBoxChecked}
                />
              ))}
            </ul>
            <hr />
            <ul className="salary-list">
              {salaryRangesList.map(eachItem => (
                <Salary
                  salaryList={eachItem}
                  key={eachItem.salaryRangeId}
                  selectSalary={this.selectSalary}
                />
              ))}
            </ul>
          </div>
          <div className="jobs-right-container">
            <div className="search-input-container">
              <input
                type="search"
                onChange={this.onChangeSearchInput}
                className="search-input"
                placeholder="Search"
              />
              <IoMdSearch className="search-icon" />
            </div>
            {code}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
