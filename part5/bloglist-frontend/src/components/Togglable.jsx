const { useState } = require("react")

const Toggleble = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      {!visible && (
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      )}
      {visible && (
        <div>
          {children}
          <button onClick={toggleVisibility}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default Toggleble