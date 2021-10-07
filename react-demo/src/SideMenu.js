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
import { Context } from "./ImageContext.js";

export function SideMenu() {
    const [openScreenshot, setOpenScreenshot] = React.useState(true);
    const [openText, setOpenText] = React.useState(true);
    const { state, dispatch } = useContext(Context);

    const updateScreenshotList = () => {
        setOpenScreenshot(!openScreenshot);
    }
    const updateOpenText = () => {
        setOpenText(!openText);
    }

    const updateInputText = (str) => {
        dispatch({ type: 'updateTextStr', inputText: str});
    }

    return (
        <List subheader={<ListSubheader component="div" id="nested-list-subheader">Setup</ListSubheader>}>
            <ListItemButton onClick={updateScreenshotList}>
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
                    <ListItemText primary="Upload" />
                </ListItemButton>
                </List>
            </Collapse>
            <ListItemButton>
                <ListItemIcon>
                <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Background" />
            </ListItemButton>
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