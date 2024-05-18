import './index.css'

const Skills = props => {
  const {skill} = props
  const newSkill = {
    imageUrl: skill.image_url,
    name: skill.name,
  }
  const {imageUrl, name} = newSkill

  return (
    <li className="skill-list">
      <img src={imageUrl} alt={name} className="skill-img" />
      <p>{name}</p>
    </li>
  )
}

export default Skills
