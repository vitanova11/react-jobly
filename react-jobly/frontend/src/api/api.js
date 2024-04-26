import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 * 
 * Centralizes AJAX calls for React Components.
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //** Get current user information. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Signup for site */
  static async signup(signupData) {
    let res = await this.request(`auth/register`, signupData, "post");
    return res.token;
  }

/** Login to site */ 
static async login(data) {
  let res = await this.request(`auth/token`, data, "post");
  return res.token;
}

/** Update User Profile. */
static async saveProfile(username, profileData) {
  let res = await this.request(`users/${username}`, profileData, "patch");
  return res.user;
}

  /** Get a list of all companies. */
  static async getCompanies(name) {
    let res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of all jobs. */
  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** User apply to a job. */
  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }
}
    export default JoblyApi;