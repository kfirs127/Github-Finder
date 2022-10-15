import {createContext, useReducer} from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()
const github_url = process.env.REACT_APP_GITHUB_URL

export const GitHubProvider = ({children}) => {

  const initialState = {
    users: [],
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

  const setLoading = () =>{
    dispatch({type: "SET_LOADING"})
  }

  const clearUsers = () => {
    dispatch({type: "CLEAR_USERS"})
  }

  return <GithubContext.Provider value={{users: state.users, 
                                        laoding: state.loading,
                                        searchUsers,
                                        clearUsers,}}>
          {children}
        </GithubContext.Provider>
}

export default GithubContext

