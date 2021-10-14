import React, { useReducer } from "react";
import { PageWindow } from "./PageWindow";

export default Context = React.createContext();

export function Context(){
    const [state, dispatch] = useReducer(dataReducer, initialState);
}

 const initialState = {
    imageFiles: {},
    containImage: false,
    inputText: '',
    backgroundColor: '',
};

function dataReducer(state, action) {
    switch (action.type) {
        case 'updateTextStr':
            return { ...state, 'inputText': action.inputText};
        case 'updateInputImage':
            return { ...state, 'imageFiles': action.imageFiles, 'containImage': action.containImage};
        case 'updateBackgroundColor':
            return { ...state, 'backgroundColor': action.backgroundColor};    
        default: 
            return state
    }
};

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(dataReducer, initialState);
  
    return (
      <Context.Provider value={{ state, dispatch }}><PageWindow /></Context.Provider>
    );
};