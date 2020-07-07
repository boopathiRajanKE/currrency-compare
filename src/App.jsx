import * as React from "react"
import { AppContext } from "./context"
import { Login } from "./login"
import { BaseCurrency } from "./baseCurrency"
import { AdditionalCurrency } from "./additionalCurrency"
import { CompareCurrency } from "./compareCurrency"
import "./styles.scss"
import "./fonts.scss"

function App(props) {
  const initialState = {
    section: "login",
    profileDetails: {},
    baseCurrency: "",
    currencies: [],
  }

  const appReducer = (state, action) => {
    switch (action.type) {
      case "section":
        return {
          ...state,
          section: action.sectionName,
        }
      case "login":
        return {
          ...state,
          section: action.sectionName,
          profileDetails: action.profileDetails,
        }
      case "baseCurrency":
        return {
          ...state,
          section: "additionalCurrency",
          baseCurrency: action.baseCurrency,
        }
      case "additionalCurrency":
        return {
          ...state,
          section: "compareCurrency",
          currencies: [...state.currencies, action.currencies],
        }
      default:
        return { ...state }
    }
  }

  const [state, dispatch] = React.useReducer(appReducer, initialState)

  const contextProps = {
    state,
    dispatch,
  }

  const renderSection = () => {
    switch (state.section) {
      case "login":
        return <Login />
      case "baseCurrency":
        return <BaseCurrency />
      case "additionalCurrency":
        return <AdditionalCurrency />
      case "compareCurrency":
        return <CompareCurrency />
      default:
        return <Login />
    }
  }

  return (
    <div className="cur-global-wrapper">
      <div className="cur-global-block">
        <div className="cur-title-block">
          <h1 className="cur-title-element">CODINGMART</h1>
          <p className="cur-desc-element">
            React JS Interview - Currency Compare
          </p>
        </div>
        <AppContext.Provider value={contextProps}>
          {renderSection()}
        </AppContext.Provider>
      </div>
    </div>
  )
}
export default App
export { App }
