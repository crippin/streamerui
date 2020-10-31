import React from 'react'
import { ApiClient } from 'twitch'
import { StaticAuthProvider, RefreshableAuthProvider } from 'twitch-auth'

const clientId = 'clientId'
const clientSecret = 'clientSecret'
let accessToken = "accessToken"
let refreshToken = "INITIAL_REFRESH_TOKEN"
let expiryTimestamp = 0
const authProvider = new StaticAuthProvider(clientId, accessToken)


const config = {
  authProvider
}
const TClient = new ApiClient(config)

const initialState = {
  client: TClient.helix,
  user: null,
  isLoading: false,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT_USER': {
      return { ...state, user: action.payload }
    }
    default:
      return state;
  }
}

function initUser(store, dispatch) {
  store.client.users.getMe()
    .then(u => {
      console.log(u)
      dispatch({ type: 'INIT_USER', payload: u })
    })
    .catch(e => console.error(e))
}

export const useTwitchApi = () => {
  const [store, dispatch] = React.useReducer(reducer, initialState)
  console.log('###useTwitchApi###')
  console.log(store)
  React.useEffect(() => {
    console.log('USEEFECT INIT')
    initUser(store, dispatch)
    console.log(store)

    return () => { }
  }, [])
  React.useEffect(() => {
    console.log('USEEFECT')

    return () => { }
  })

  return [store, dispatch]
}