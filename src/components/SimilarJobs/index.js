import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {job} = props
  const updatedJob = {
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
    title: job.title,
  }
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = updatedJob
  return (
    <div className="similar-job-back">
      <div className="similar-job-logo-section">
        <img src={companyLogoUrl} alt="" className="similar-job-company-logo" />
        <div>
          <h1 className="similar-job-jobs-list-title">{title}</h1>
          <div className="rating-section">
            <IoMdStar className="similar-job-icon" />
            <p className="similar-job-jobs-list-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="similar-jobs-Description">Description</h1>
        <p className="similar-jobs-Description-para">{jobDescription}</p>
      </div>
      <div className="details-section">
        <div className="list-para-section">
          <MdLocationOn />
          <p className="similar-jobs-para-detail-section">{location}</p>
        </div>
        <div className="list-para-section">
          <BsFillBriefcaseFill />
          <p className="similar-jobs-para-detail-section">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}
export default SimilarJobs
