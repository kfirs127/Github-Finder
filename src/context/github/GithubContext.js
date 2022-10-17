import {createContext, useReducer} from "react"
import { createRenderer } from "react-dom/test-utils"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()
const github_url = process.env.REACT_APP_GITHUB_URL

export const GitHubProvider = ({children}) => {

  const initialState = {
    users: [],
    user: {},
    repos: [],
    laoding: false,
  }
  const [state, dispatch] = useReducer(githubReducer, initialState)

  const searchUsers = async (text) => {
    setLoading()
    const params = new URLSearchParams({q: text})
    const response = await fetch(`${github_url}/search/users?${params}`)
    const {items} = await response.json()
    dispatch({
      type: "GET_USERS",
      payload: items,
    })
  }

  const getUser = async (login) => {
    setLoading()
    const response = await fetch(`${github_url}/users/${login}`)
    if(response.status === 404){
      window.location = "/notFound"
    }else{
      const data = await response.json()
      dispatch({
        type: "GET_USER",
        payload: data,
      })
    }
  }

  const getUserRepos = async (login) => {
    setLoading()
    const params = new URLSearchParams({sort: "created", per_page:10})
    const response = await fetch(`${github_url}/users/${login}/repos?${params}`)
    const data = await response.json()
    dispatch({
      type: "GET_REPOS",
      payload: data,
    })
  }


  const setLoading = () =>{
    dispatch({type: "SET_LOADING"})
  }

  const clearUsers = () => {
    dispatch({type: "CLEAR_USERS"})
  }

  return <GithubContext.Provider value={{users: state.users, 
                                        laoding: state.loading,
                                        user: state.user,
                                        repos: state.repos,
                                        searchUsers,
                                        clearUsers,
                                        getUser,
                                        getUserRepos,}}>
          {children}
        </GithubContext.Provider>
}

export default GithubContext

