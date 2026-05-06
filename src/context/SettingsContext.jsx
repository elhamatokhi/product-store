import { createContext, useReducer, useContext } from "react";

// Create context
const SettingsContext = createContext()

// Initial state
const initialState = {
    theme: "light",
    view: 'grid',
    category: 'all',
    language: "en", 
}

// reducer function - handles all state updates
function settingsReducer(state, action){
    switch(action.type){
        // Toggle dark/light mode
        case 'TOGGLE_THEME':
            return{
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            }
         // Change grid/list view
        case 'SET_VIEW':
            return {...state, view: action.payload}
        // Change selected category
        case 'SET_CATEGORY':
            return {...state, category: action.payload}
        // Set language
        case "SET_LANGUAGE":
        return {
            ...state,
            language: action.payload,
        };
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
