import { createContext, useReducer, useContext } from "react";

// Create context
const SettingsContext = createContext()

// Initial state
const initialState = {
    theme: "light",
    view: 'grid',
    category: 'all'
}

// reducer function
function settingsReducer(state, action){
    switch(action.type){
        case 'TOGGLE_THEME':
            return{
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            }
        case 'SET_VIEW':
            return {...state, view: action.payload}
        case 'SET_CATEGORY':
            return {...state, category: action.payload}
        
        default:
            return state
    }
}

// provider
export function SettingsProvider ({children}){
    const [state, dispatch] = useReducer(settingsReducer, initialState)

    return (
        <SettingsContext.Provider value={{state, dispatch}} >
            {children}
        </SettingsContext.Provider>
    )
}

// custome hook
export function useSettings(){
    return useContext(SettingsContext)
}