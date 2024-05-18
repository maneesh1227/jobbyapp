import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', error: false}

  onSuccess = jwt_token => {
    const {history} = this.props
    Cookies.set('jwtToken', jwt_token, {expires: 7, path: '/'})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.setState({error: true})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const token = Cookies.get('jwtToken')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, error} = this.state
    return (
      <div className="back">
        <form className="form-section" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <div>
            <label htmlFor="username" className="label-ele">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Username"
              className="input-ele"
              onChange={this.onChangeUsername}
            />
          </div>
          <div>
            <label htmlFor="password" className="label-ele">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              className="input-ele"
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
          {error && (
            <p className="error">*Username and Password didn't match</p>
          )}
        </form>
      </div>
    )
  }
}

export default LoginForm
