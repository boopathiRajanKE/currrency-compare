import * as React from "react"
import { AppContext } from "./context"

function BaseCurrency() {
  const [inputValue, setInputValue] = React.useState("")
  const inputRef = React.useRef(null)
  const { dispatch = () => {} } = React.useContext(AppContext)

  const onInputChange = () => {
    setInputValue(inputRef.current.value)
  }

  const onNextBtnClick = () => {
    dispatch({
      type: "baseCurrency",
      baseCurrency: inputValue.toUpperCase(),
    })
  }

  return (
    <div className="cur-border-element column">
      <div className="cur-base-currency-wrapper">
        <div className="cur-base-currency-input-label">
          select your base currency
        </div>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={onInputChange}
          type="text"
          maxLength="3"
          placeholder="Currency code (INR, USD, EUR, ...)"
          className="cur-base-currency-input-element"
        />
      </div>
      <button
        onClick={onNextBtnClick}
        className={`cur-base-currency-button ${
          inputValue.length === 3 ? "enable" : "disable"
        }`}
      >
        Next
      </button>
    </div>
  )
}

export default BaseCurrency
export { BaseCurrency }
