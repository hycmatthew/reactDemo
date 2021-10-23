import React, { useReducer } from "react";
import { PageWindow } from "./PageWindow";

export default Context = React.createContext();

export function Context(){
    const [state, dispatch] = useReducer(dataReducer, initialState);
}

export const backgroundTypeEnum = Object.freeze({"single":1, "gradient":2, "imgae":3})

const initialState = {
    imageFiles: {},
    containImage: false,
    inputText: '',
    backgroundType: backgroundTypeEnum.single,
    backgroundColor: ['#26a0da'],
    backgroundColorPos: [0]
};

function dataReducer(state, action) {
    switch (action.type) {
        case 'updateTextStr':
            return { ...state, 'inputText': action.inputText};
        case 'updateInputImage':
            return { ...state, 'imageFiles': action.imageFiles, 'containImage': action.containImage};
        case 'updateBackgroundColor':
            return { ...state, 'backgroundType': action.backgroundType, 'backgroundColor': action.backgroundColor, 'backgroundColorPos': action.backgroundColorPos};
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