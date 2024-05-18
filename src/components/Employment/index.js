import './index.css'

const Employment = props => {
  const {employmentList, checkBoxChecked} = props
  const {label, employmentTypeId} = employmentList

  const onChangeCheckBox = () => {
    checkBoxChecked(label)
  }

  return (
    <li className="e-list">
      <input
        type="checkbox"
        name="employment"
        id={employmentTypeId}
        onChange={onChangeCheckBox}
      />
      <label htmlFor={employmentTypeId} className="e-label">
        {label}
      </label>
    </li>
  )
}

export default Employment
