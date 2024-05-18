import './index.css'
import {Link} from 'react-router-dom'
import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobsList = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = item

  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobs-list-item">
        <div className="logo-section">
          <img src={companyLogoUrl} alt="" className="company-logo" />
          <div>
            <h1 className="jobs-list-title">{title}</h1>
            <div className="rating-section">
              <IoMdStar />
              <p className="jobs-list-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="details-section">
          <div className="list-para-section">
            <MdLocationOn />
            <p className="para-detail-section">{location}</p>
          </div>
          <div className="list-para-section">
            <BsFillBriefcaseFill />
            <p className="para-detail-section">{employmentType}</p>
          </div>
          <p className="package-para">{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="description-section">
          <h1 className="description">Description</h1>
          <p className="jobDescription-section">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobsList
