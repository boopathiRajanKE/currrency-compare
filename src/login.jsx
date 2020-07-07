import * as React from "react"
import { AppContext } from "./context"
import { useGoogleLogin } from "react-google-login"

function Login() {
  const { dispatch = () => {} } = React.useContext(AppContext)

  const onSuccess = (response) => {
    const { profileObj = {} } = response
    dispatch({
      type: "login",
      sectionName: "baseCurrency",
      profileDetails: profileObj,
    })
  }

  const onFailure = (response) => {
    dispatch({ type: "login", sectionName: "login", profileDetails: {} })
  }

  const { signIn, loaded } = useGoogleLogin({
    clientId:
      "283963016104-8vmlml8pbtgpb606tdcmhjr2on9dk1rl.apps.googleusercontent.com",
    onSuccess,
    onFailure,
    isSignedIn: true,
  })

  console.log({ loaded })

  return (
    <div className="cur-border-element">
      <div className="cur-login-wrapper">
        <div className="cur-login-text">Login using Gmail</div>
        <button
          className={`cur-login-button ${loaded ? "loaded" : "not-loaded"}`}
          onClick={signIn}
        >
          login using Gmail
        </button>
      </div>
    </div>
  )
}

export default Login
export { Login }
