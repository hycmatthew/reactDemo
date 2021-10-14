import React, { useState, useEffect, useReducer, useContext }  from "react";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItemButton from '@material-ui/core/ListItemButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import TextField from '@material-ui/core/TextField';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { SketchPicker } from 'react-color';
import { Context } from "./ImageContext.js";

export function SideMenu() {
    const [openScreenshot, setOpenScreenshot] = React.useState(true);
    const [openBackground, setOpenBackground] = React.useState(true);
    const [openText, setOpenText] = React.useState(true);
    const { state, dispatch } = useContext(Context);

    const updateScreenshotList = () => {
        setOpenScreenshot(!openScreenshot);
    }

    const updateBackgroundList = () => {
        setOpenBackground(!openBackground);
    }

    const updateOpenText = () => {
        setOpenText(!openText);
    }

    function handleChange(color, event) {
        color = {
            hex: '#333',
            rgb: {
              r: 51,
              g: 51,
              b: 51,
              a: 1,
            }
         }
    }

    const updateInputText = (str) => {
        dispatch({ type: 'updateTextStr', inputText: str});
    }

    const updateBackgroundColor = (color) => {
        console.log(color);
        dispatch({ type: 'updateBackgroundColor', backgroundColor: color});
    }

    const uploadImage = (e) =>{
        dispatch({ type: 'updateInputImage', imageFiles: e.target.files[0], containImage: true});
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
                    <SketchPicker color={state.backgroundColor} onChangeComplete={color => {updateBackgroundColor(color.hex)}} />
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