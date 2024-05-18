import './index.css'

const Profile = props => {
  const {data} = props
  const {name, profileImageUrl, shortBio} = data
  return (
    <div className="profile-back">
      <img src={profileImageUrl} alt={name} className="profile-img" />
      <h1 className="profile-name">{name}</h1>
      <p className="profile-para">{shortBio}</p>
    </div>
  )
}

export default Profile
