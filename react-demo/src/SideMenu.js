import React, { useState, useEffect, useReducer, useContext }  from "react";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemButton from '@material-ui/core/ListItemButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import TextField from '@material-ui/core/TextField';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { SketchPicker, ChromePicker , MaterialPicker } from 'react-color';
import { backgroundTypeEnum, Context } from "./ImageContext.js";

export function SideMenu() {
    const initColorLogic = [
        { id: 1, color: { r: '241',g: '112',b: '19', a: '1' }, colorPos: 0 },
        { id: 1, color: { r: '241',g: '112',b: '19', a: '1' }, colorPos: 0 },
        { id: 1, color: { r: '241',g: '112',b: '19', a: '1' }, colorPos: 0 }
    ];

    const [openScreenshot, setOpenScreenshot] = React.useState(true);
    const [openBackground, setOpenBackground] = React.useState(true);
    const [openText, setOpenText] = React.useState(true);
    const { state, dispatch } = useContext(Context);
    const [backgroundType, setBackgroundType] = React.useState("single");
    const [openColorPicker, setOpenColorPicker] = React.useState(false);

    const [colorList, setColorList] = React.useState(initColorLogic);

    const updateScreenshotList = () => {
        setOpenScreenshot(!openScreenshot);
    }

    const updateBackgroundList = () => {
        setOpenBackground(!openBackground);
    }

    const updateOpenText = () => {
        setOpenText(!openText);
    }

    const updateBackgroundType = (type) => {
        setBackgroundType(type);
    };

    const updateInputText = (str) => {
        dispatch({ type: 'updateTextStr', inputText: str});
    }

    const updateBackgroundColor = (type, color) => {
        dispatch({ type: 'updateBackgroundColor', backgroundType: type, backgroundColor: color, backgroundColorPos: 1});
    }

    const uploadImage = (e) =>{
        dispatch({ type: 'updateInputImage', imageFiles: e.target.files[0], containImage: true});
    }
    
    const handleClick = () => {
        console.log("handleClick");
        setOpenColorPicker(!openColorPicker);
    };
    
    const handleClose = () => {
        console.log("handleClose");
        setOpenColorPicker(false);
    };

    const handleChange = (value, color) => {
        let newList = colorList.map(item => {
            item.color = color
            return item
        });
        updateBackgroundColor(backgroundTypeEnum.single, color.hex);

        setColorList(newList);
    }

    const setBackgroundBlock = () =>{
        if(backgroundType === "single"){
            return (
                <ListItem>
                    <div>
                    <div className="background-color-block" onClick={ handleClick }>
                        <div className="background-color-btn" style={{background: colorList[0].color.hex}} />
                    </div>
                    <p>{ colorList.id }</p>
                    {openColorPicker?<div className="background-color-popup">
                        <div className="background-color-cover" onClick={ handleClose }></div>
                        <ChromePicker idNum={ colorList[0].id } color={ colorList[0].color } onChange={ color => {handleChange(1, color)} } />
                    </div>:null}
                    </div>
                </ListItem>
            );
        }else{
            let blockPickerList = [];
            for(let i=0; i<=colorList.length-1; i++){
                blockPickerList.push(
                <div key={ colorList[i].id } className="colorpicker-block">
                    <MaterialPicker triangle="hide" color={colorList[0].color} onChangeComplete={color => {updateBackgroundColor(color.hex)}} />
                    <TextField className="colorpicker-input" fullWidth id="outlined-basic" label="Text" variant="outlined" />
                </div>);
            }

            return (
                <ListItem>
                    {blockPickerList}
                </ListItem>
            );
        }
    }

    return (
        <List subheader={<ListSubheader component="div" id="nested-list-subheader">Setup</ListSubheader>}>
            <ListItemButton className="upload-image-submenu" onClick={updateScreenshotList}>
                <ListItemIcon>
                <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Screenshot" />
                {openScreenshot ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openScreenshot} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <input type="file" onChange={uploadImage} />
                </ListItemButton>
                </List>
            </Collapse>
            <ListItemButton className="set-background-submenu" onClick={updateBackgroundList}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Background" />
                {openBackground ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openBackground} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem>
                        <ToggleButtonGroup color="primary" value={backgroundType} exclusive onChange={e => updateBackgroundType(e.target.value)}>
                        <ToggleButton value="single">Single Color</ToggleButton>
                        <ToggleButton value="gradient">Gradient</ToggleButton>
                        </ToggleButtonGroup>
                    </ListItem>
                    {setBackgroundBlock()}
                </List>
            </Collapse>
            <ListItemButton onClick={updateOpenText}>
                <ListItemIcon>
                <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Text" />
                {openText ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openText} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <TextField fullWidth id="outlined-basic" label="Text" variant="outlined" onChange={e => updateInputText(e.target.value)} />
                </ListItemButton>
                </List>
            </Collapse>
        </List>
    );

}