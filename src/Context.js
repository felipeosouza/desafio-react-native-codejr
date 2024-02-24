import React, { createContext, useReducer} from 'react'

export const AppContext = createContext()
export const DispatchContext = createContext()

const initialState = {
    isLoggedIn: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'login': {
            return {
                isLoggedIn: action.isLoggedIn
            }
        }
        default:
            break;
    }
}

export function AppContextProvider({children}) {
    const [appContext, dispatch] = useReducer(reducer, initialState)
    return <AppContext.Provider value={appContext}>
        <DispatchContext.Provider value={dispatch}>
            {children}
        </DispatchContext.Provider>
    </AppContext.Provider>
} 