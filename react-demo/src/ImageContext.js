import React, { useReducer } from "react";
import { PageWindow } from "./PageWindow";

export default Context = React.createContext();

export function Context(){
    const [state, dispatch] = useReducer(dataReducer, initialState);
}

 const initialState = {
    inputText: '',
};

function dataReducer(state, action) {
    switch (action.type) {
        case 'updateTextStr':
            console.log({ ...state, 'inputText': action.inputText});
            return { ...state, 'inputText': action.inputText};
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