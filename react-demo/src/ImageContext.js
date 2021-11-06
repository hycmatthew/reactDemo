import React, { useReducer } from "react";
import { PageWindow } from "./PageWindow";

export default Context = React.createContext();

export function Context(){
    const [state, dispatch] = useReducer(dataReducer, initialState);
}

export const backgroundTypeEnum = Object.freeze({"single":1, "gradient":2, "imgae":3})
export const deviceInitPosition = {
    xPos: 1500,
    yPos: 250,
    size: 500,
}

const initialState = {
    imageFiles: {},
    containImage: false,
    deviceXPos: deviceInitPosition.xPos,
    deviceYPos: deviceInitPosition.yPos,
    deviceSize: 2,
    fontFamily: 'Arial',
    fontSize: 80,
    fontColor: '#ffffff',
    fontAlign: 'center',
    inputText: '',
    backgroundType: backgroundTypeEnum.single,
    backgroundDirection: 0,
    backgroundColor: [{ id: 0, color: '#f9d39a', colorPos: 0}, { id: 1, color: '#f9d39a', colorPos: 0}],
};

function dataReducer(state, action) {
    console.log(action);
    switch (action.type) {
        case 'updateDeviceXPosition':
            return { ...state, 'deviceXPos': action.deviceXPos};
        case 'updateDeviceYPosition':
            return { ...state, 'deviceYPos': action.deviceYPos};
        case 'updateBackgroundDirection':
            return { ...state, 'backgroundDirection': action.backgroundDirection};
        case 'updateDeviceSize':
            return { ...state, 'deviceSize': action.deviceSize};
        case 'updateTextStr':
            return { ...state, 'inputText': action.inputText};
        case 'updateTextAlignment':
            return { ...state, 'fontAlign': action.fontAlignment};
        case 'updateTextFontFamily':
            return { ...state, 'fontFamily': action.fontFamily};
        case 'updateTextFontSize':
            return { ...state, 'fontSize': action.fontSize};
        case 'updateTextFontColor':
            return { ...state, 'fontColor': action.fontColor};
        case 'updateInputImage':
            return { ...state, 'imageFiles': action.imageFiles, 'containImage': action.containImage};
        case 'updateBackgroundColor':
            return { ...state, 'backgroundType': action.backgroundType, 'backgroundColor': action.backgroundColor};
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