import './index.css'
const Salary = props => {
  const {salaryList, selectSalary} = props
  const {salaryRangeId, label} = salaryList
  const onChangeSalary = () => {
    selectSalary(label)
  }

  return (
    <li className="s-list">
      <input
        type="radio"
        name="salary"
        id={salaryRangeId}
        value={salaryRangeId}
        onChange={onChangeSalary}
      />
      <label className="salary-label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default Salary
