import React, { createContext, useContext } from 'react'
//import { useLocalStorage } from './useLocalStorage'


export default function makeStore(reducer, initialState, key) {
  const storeContext = createContext()
  const dispatchContext = createContext()

  const StoreProvider = ({ children }) => {
    //const [localStore] = useLocalStorage(key, initialState)
    const [store, dispatch] = React.useReducer(reducer, initialState /* localStore */)

    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={store}>
          {children}
        </storeContext.Provider>
      </dispatchContext.Provider>
    )
  }

  function useStore() {
    return useContext(storeContext)
  }

  function useDispatch() {
    return useContext(dispatchContext)
  }

  return [StoreProvider, useDispatch, useStore]
}