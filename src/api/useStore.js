import makeStore from './makeStore'

const actions = {
  GET_USER: 'GET_USER',
  SET_USER: 'SET_USER',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
}

const initialState = () => {
  let state = {
    client: null,
    user: null,
    errors: null,
    isLoading: false
  }

  return state
}

const todosReducer = (state, action) => {
  switch (action.type) {
    case actions.GET_USER: {
      return state
    }
    case actions.LOADING: {
      // setting the old state will prevent re-rendering
      // fetching in the background
      state.isLoading = true
      break
    }
    case actions.ERROR: {
      return { ...state, isLoading: false, errors: action.payload }
    }
    case actions.SET_USER: {
      return { ...state, user: action.payload, isLoading: false }
    }
    default: {
      break
    }
  }
  return state
}

const [TwitchProvider, useTwitchDispatch, useTwitchStore] = makeStore(todosReducer, initialState(), 'todos')

export {
  TwitchProvider, useTwitchDispatch, useTwitchStore
}