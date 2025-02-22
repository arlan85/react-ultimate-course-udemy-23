function Options({question}) {
  const {
    options,
    correctOption,
    points,
    id,
  } = question;
  return (
    <div className="options">
    {options.map((option, index) => (
      <button className="btn btn-option" key={option}>
        {option}
      </button>
    ))}
  </div>
  )
}

export default Options
