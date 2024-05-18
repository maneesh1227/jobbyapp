import Header from '../Header'
import './index.css'

const Home = props => {
  const {history} = props
  const onClickFindJobs = () => {
    history.replace('/jobs')
  }
  return (
    <div className="home-back">
      <Header />
      <div className="home-bottom-container">
        <h1 className="home-head-ele">Find The Job That Fits Your Life</h1>
        <p className="home-para-ele">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the I job that fits your abilities and potential.
        </p>
        <button onClick={onClickFindJobs} className="jobs-btn">
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
