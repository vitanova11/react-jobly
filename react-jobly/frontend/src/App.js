import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import NavBar from "./navigation/NavBar";
import JoblyApi from "./api/api";
import Paths from "./navigation/Paths";
import useLocalStorage from "./hooks/useLocalStorage";
import { jwtDecode } from "jwt-decode";
import UserContext from "./auth/UserContext";
import LoadingPage from "./common/LoadingPage";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook..
 *
 * App -> Routes
 */

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  console.debug("App", "infoLoaded=", infoLoaded, "currentUser=", currentUser, "token=", token);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          // put the token on the API class to be used when you call the API
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username); 
          setCurrentUser(currentUser);
          //setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

/** Handles signup for app.
 * Automatic login, when signup form is submitted.
 */
async function signup(signupData) {
  try {
    let token = await JoblyApi.signup(signupData); // must add this to JoblyApi!!!!
    setToken(token);
    return { success: true };
  } catch (errs) {
    console.error("signup failed", errs);
    return { success: false, errs };
  }
}

/** Handles login. */
async function login(data) {
  try {
    let token = await JoblyApi.login(data);
    setToken(token);
    return { success: true };
  } catch (errs) {
    console.error("login failed", errs);
    return {success: false, errs}
  }
}

/** Handles sitewide logout.*/
function logout() {
  setCurrentUser(null);
  setToken(null);
}

/** checks to see if a job has been applied to */
function hasAppliedToJob(id) {
  return applicationIds.has(id);
}

/** API Call to apply for a job, also updates set of application ids. */
function applyToJob(id) {
  if (hasAppliedToJob(id)) return;
  JoblyApi.applyToJob(currentUser.username, id);
  setApplicationIds(new Set([...applicationIds, id]));
}

if (!infoLoaded) return <LoadingPage />

  return (
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
          <div className="App">
            <NavBar logout={logout}/>
            <Paths login={login} signup={signup} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
