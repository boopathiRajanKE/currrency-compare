import * as React from "react"
import { useGoogleLogout } from "react-google-login"
import axios from "axios"
import { AppContext } from "./context"

function CompareCurrency() {
  const [apiResponse, setApiResponse] = React.useState({})

  const { state = {}, dispatch = () => {} } = React.useContext(AppContext)

  const makeApi = async () => {
    const response = await axios.get(
      `https://api.exchangeratesapi.io/latest?symbols=${state.currencies.join(
        ","
      )}&base=${state.baseCurrency}`
    )

    const { data: { rates = {} } = {} } = response
    setApiResponse(rates)
  }

  const onLogoutSuccess = (response) => {
    console.log({ response })
    dispatch({
      type: "section",
      sectionName: "login",
    })
  }

  const onFailure = (response) => {
    console.log(response)
  }

  const { signOut } = useGoogleLogout({
    clientId:
      "283963016104-8vmlml8pbtgpb606tdcmhjr2on9dk1rl.apps.googleusercontent.com",
    onLogoutSuccess,
    onFailure,
  })

  React.useEffect(() => {
    makeApi()
  }, [])

  const renderCurrencyList = (currency, index) => {
    return (
      <li key={`cur-${index}`}>
        <div className="cur-item">
          {currency} value : {+apiResponse[currency].toFixed(3)}
        </div>
      </li>
    )
  }

  return (
    <div className="cur-compare-wrapper">
      <div
        onClick={() => {
          makeApi()
        }}
        className="cur-refresh"
      >
        Refresh
      </div>
      <div className="cur-border-element">
        <div className="main-wrapper">
          <div className="top-wrapper">
            <div className="base-cur-text">
              {state.baseCurrency} value: 1 {state.baseCurrency}
            </div>
            <div
              onClick={() => {
                dispatch({ type: "section", sectionName: "baseCurrency" })
              }}
              className="edit-base-text"
            >
              Edit Base currency
            </div>
          </div>
          <hr></hr>
          <div className="body-wrapper">
            <div className="cur-list-section">
              <div className="cur-list-title">Today's value</div>
              <div className="cur-list-wrapper">
                <ul>{Object.keys(apiResponse).map(renderCurrencyList)}</ul>
              </div>
            </div>
            <div
              onClick={() => {
                dispatch({ type: "section", sectionName: "additionalCurrency" })
              }}
              className="add-more"
            >
              + add more currency
            </div>
          </div>
        </div>
      </div>
      <button onClick={signOut} className="logout">
        Logout
      </button>
    </div>
  )
}

export default CompareCurrency
export { CompareCurrency }
