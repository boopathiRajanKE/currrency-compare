import * as React from "react"
import { AppContext } from "./context"

function AdditionalCurrency() {
  const inputRef = React.useRef(null)
  const [inputValue, setInputValue] = React.useState([])
  const [curs, setCurs] = React.useState([])
  const { state, dispatch = () => {} } = React.useContext(AppContext)

  const onInputChange = () => {
    setInputValue(inputRef.current.value)
  }

  const onAddBtnClick = () => {
    if (inputValue.length > 2) {
      setCurs([...curs, inputRef.current.value.toUpperCase()])
    }
  }

  const onNextBtnClick = () => {
    if (curs.length > 0) {
      dispatch({
        type: "additionalCurrency",
        currencies: curs,
      })
    }
  }

  React.useEffect(() => {
    setInputValue("")
  }, [curs])

  return (
    <div className="cur-border-element column">
      <div className="cur-add-cur-wrapper">
        <div className="cur-base-cur-text">
          Base currency: {state.baseCurrency}
        </div>
        <hr></hr>
        <div className="cur-add-curr-label">select currencies to compare</div>
        <div className="cur-add-cur-input-wrapper">
          <input
            ref={inputRef}
            value={inputValue}
            onChange={onInputChange}
            type="text"
            maxLength="3"
            placeholder="Currency code (INR, USD, EUR, ...)"
            className="add-cur-input"
          />
          <button onClick={onAddBtnClick} className="add-cur-btn">
            +add
          </button>
        </div>
        {curs.length > 0 && (
          <div className="cur-list">{JSON.stringify(curs)}</div>
        )}
      </div>
      <button onClick={onNextBtnClick} className="cur-base-currency-button">
        Next
      </button>
    </div>
  )
}

export default AdditionalCurrency
export { AdditionalCurrency }
