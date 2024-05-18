import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwtToken')
    history.replace('/login')
  }

  return (
    <div className="header-back">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="logo"
      />
      <div className="links-sm">
        <Link to="/">
          <AiFillHome className="icons" />
        </Link>
        <Link to="/jobs">
          <BsFillBriefcaseFill className="icons" />
        </Link>
        <button type="button">
          <FiLogOut className="logouticon" />
        </button>
      </div>
      <div className="links-lg">
        <Link to="/">
          <p className="home-para">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="home-para">Jobs</p>
        </Link>
      </div>
      <button onClick={onClickLogout} className="logout-btn">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
