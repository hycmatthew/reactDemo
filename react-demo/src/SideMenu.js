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
import CropPortraitIcon from '@material-ui/icons/CropPortrait';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';

import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/styles";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { backgroundTypeEnum, deviceInitPosition, Context } from "./ImageContext.js";


const useStyles = makeStyles(theme => ({
    colorField: {
        width: 120,
    }
}));

export function SideMenu(props) {
    const classes = useStyles();

    const safeFontFamilyList = ["Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman",
     "Georgia", "Garamond", "Courier New", "Brush Script MT"];
     
    const initDeviceSetting = {
        deviceXPos: deviceInitPosition.xPos,
        deviceYPos: deviceInitPosition.yPos,
        size: deviceInitPosition.size,
    }

    const initTextSetting = {
        inputText: "",
        inputAlignment: "center",
        inputFontFamily: "Arial",
        inputFontSize: 80,
        inputFontColor: '#ffffff'
    }

    const initColorLogicLogic = [
        { id: 0, color: '#f9d39a', colorPos: 0 },
        { id: 1, color: '#f9d39a', colorPos: 0 },
        { id: 2, color: '#f9d39a', colorPos: 0 },
        { id: 3, color: '#f9d39a', colorPos: 0 },
        { id: 4, color: '#f9d39a', colorPos: 0 },
        { id: 5, color: '#f9d39a', colorPos: 0 }];

    const [openSizeSetting, setOpenSizeSetting] = React.useState(true);
    const [openScreenshot, setOpenScreenshot] = React.useState(true);
    const [openBackground, setOpenBackground] = React.useState(true);
    const [openText, setOpenText] = React.useState(true);
    const {state, dispatch } = useContext(Context);
    const [backgroundType, setBackgroundType] = React.useState("single");

    const [deviceSetting, setDeviceSetting] = React.useState(initDeviceSetting);
    const [textSetting, setTextSetting] = React.useState(initTextSetting);
    const [colorList, setColorList] = React.useState(initColorLogicLogic);
    const [backgroundDirection, setBackgroundDirection] = React.useState(0);


    const theme = createTheme({
        typography: {
            fontSize: 12,
        },
    });

    const rgbToHex = (r, g, b) => {
        var rgb = (r << 16) | (g << 8) | b
        return '#' + rgb.toString(16).padStart(6, 0)  
    }

    const updateSizeSettingList = () => {
        setOpenSizeSetting(!openSizeSetting);
    }

    const updateScreenshotList = () => {
        setOpenScreenshot(!openScreenshot);
    }

    const updateBackgroundList = () => {
        setOpenBackground(!openBackground);
    }

    const updateOpenText = () => {
        setOpenText(!openText);
    }

    const updateBackgroundDirection = (num) => {
        setBackgroundDirection(num);
        dispatch({ type: 'updateBackgroundDirection', backgroundDirection: num});
    };

    const updateBackgroundType = (type) => {
        setBackgroundType(type);
    };

    const updateInputText = (str) => {
        dispatch({ type: 'updateTextStr', inputText: str});
    }

    const updateDeviceSize = (size) => {
        setDeviceSetting(prevState => ({ ...prevState, deviceSize: size }))
        dispatch({ type: 'updateDeviceSize', deviceSize: size});
    }

    const updateDeviceXPosition = (pos) => {
        setDeviceSetting(prevState => ({ ...prevState, deviceXPos: pos }))
        dispatch({ type: 'updateDeviceXPosition', deviceXPos: pos});
    }

    const updateDeviceYPosition = (pos) => {
        setDeviceSetting(prevState => ({ ...prevState, deviceYPos: pos }))
        dispatch({ type: 'updateDeviceYPosition', deviceYPos: pos});
    }

    const handleAlignment = (newAlignment) => {
        setTextSetting(prevState => ({ ...prevState, inputAlignment: newAlignment }))
        dispatch({ type: 'updateTextAlignment', fontAlignment: newAlignment});
    };

    const updateTextFontFamily = (fontFamily) => {
        setTextSetting(prevState => ({ ...prevState, inputFontFamily: fontFamily }))
        dispatch({ type: 'updateTextFontFamily', fontFamily: fontFamily});
    }

    const updateTextFontSize = (fontSize) => {
        setTextSetting(prevState => ({ ...prevState, inputFontSize: fontSize }))
        dispatch({ type: 'updateTextFontSize', fontSize: fontSize});
    }

    const updateBackgroundColor = (type, newList) => {
        dispatch({ type: 'updateBackgroundColor', backgroundType: type, backgroundColor: newList});
    }

    const uploadImage = (e) =>{
        dispatch({ type: 'updateInputImage', imageFiles: e.target.files[0], containImage: true});
    }

    const backgroundColorBlockChange = (setId, colorHex) => {
        if(hexColorValidation(colorHex)){
            let newList = colorList.map(item => {
                if(item.id === setId){
                    item.color = colorHex
                }
                return item
            });
            updateBackgroundColor(backgroundType, newList);
            setColorList(newList);
        }
    }

    const backgroundColorPositionChange = (setId, pos) => {
        let newList = colorList.map(item => {
            if(item.id === setId){
                item.colorPos = pos
            }
            return item
        });
        updateBackgroundColor(backgroundType, newList);
        setColorList(newList);
    }

    const hexColorValidation = (color) =>{
        let rs = /^#([0-9A-F]{3}){1,2}$/i;
        if(color.match(rs)){
            return true
        }
        return false
    }

    const updateFontColor = (color) => {
        if(hexColorValidation(color)){
            setTextSetting(prevState => ({...prevState, inputFontColor: color}));
            dispatch({ type: 'updateTextFontColor', fontColor: color});
        }
    }

    const setFontFamilyBlock = () =>{
        let tempFontFamilyList = [];
        for(let i=0; i<=safeFontFamilyList.length-1; i++){
            tempFontFamilyList.push(
                <MenuItem key={safeFontFamilyList[i]} value={ safeFontFamilyList[i] }>{ safeFontFamilyList[i] }</MenuItem>
            );
        }
        return tempFontFamilyList
    }

    const setBackgroundBlock = () =>{
        if(backgroundType === "single"){
            return (
                <ListItem>
                    <div>
                        <div className="background-color-block">
                            <div className="background-color-btn" style={{background: textSetting.inputFontColor}} />
                        </div>
                        <TextField label="Color" defaultValue={colorList[0].color} onChange={e => backgroundColorBlockChange(1, e.target.value)}/>
                    </div>
                </ListItem>
            );
        }else{
            let blockPickerList = [];
            blockPickerList.push(
                <ListItem>
                    <TextField label="Direction" defaultValue={backgroundDirection} onChange={e => updateBackgroundDirection(e.target.value)}/>
                </ListItem>
            )
            for(let i=0; i<=colorList.length-1; i++){
                blockPickerList.push(
                    <ListItem key={colorList[i].id}>
                        <div className="background-color-block">
                            <div className="background-color-btn" style={{background: textSetting.inputFontColor}} />
                        </div>
                        <TextField width="100px" size="small" label="Color" defaultValue={colorList[i].color} onChange={e => backgroundColorBlockChange(i, e.target.value)}/>
                        <TextField width="100px" size="small" label="Position" defaultValue={colorList[i].colorPos} onChange={e => backgroundColorPositionChange(i, e.target.value)}/>
                    </ListItem>
                )
            }
            return blockPickerList;
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <List className="side-main-list" subheader={<ListSubheader component="div" id="nested-list-subheader">Setup</ListSubheader>}>
                <ListItemButton className="upload-image-submenu" onClick={updateSizeSettingList}>
                    <ListItemIcon>
                    <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Size" />
                    {openSizeSetting ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSizeSetting} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItemButton>
                        <ToggleButtonGroup value={deviceSetting.deviceSize} exclusive onChange={ (event, newSize) => updateDeviceSize(newSize)} aria-label="text alignment">
                            <ToggleButton value={1} aria-label="left aligned">
                                <CropPortraitIcon fontSize="small" />
                            </ToggleButton>
                            <ToggleButton value={2} aria-label="centered">
                                <CropPortraitIcon fontSize="medium" />
                            </ToggleButton>
                            <ToggleButton value={3} aria-label="right aligned">
                                <CropPortraitIcon fontSize="large" />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </ListItemButton>
                    <ListItemButton>
                        <TextField size="small" label="Position X" defaultValue={deviceSetting.deviceXPos} onChange={e => updateDeviceXPosition(e.target.value)}/>
                        <TextField size="small" label="Position Y" defaultValue={deviceSetting.deviceYPos} onChange={e => updateDeviceYPosition(e.target.value)}/>
                    </ListItemButton>
                    </List>
                </Collapse>
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
                        { setBackgroundBlock() }
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
                        <ToggleButtonGroup value={textSetting.inputAlignment} exclusive onChange={ (event, newAlignment) => handleAlignment(newAlignment)} aria-label="text alignment">
                            <ToggleButton value="left" aria-label="left aligned">
                                <FormatAlignLeftIcon />
                            </ToggleButton>
                            <ToggleButton value="center" aria-label="centered">
                                <FormatAlignCenterIcon />
                            </ToggleButton>
                            <ToggleButton value="right" aria-label="right aligned">
                                <FormatAlignRightIcon />
                            </ToggleButton>
                            <ToggleButton value="justify" aria-label="justified">
                                <FormatAlignJustifyIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </ListItemButton>
                    <ListItemButton>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Font Family</InputLabel>
                                <Select value={textSetting.inputFontFamily} label="Font-Family" onChange={ e => updateTextFontFamily(e.target.value) }>
                                { setFontFamilyBlock() }
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField defaultValue={textSetting.inputFontSize}  id="outlined-basic" label="Font Size" variant="outlined" onChange={ e => updateTextFontSize(e.target.value) }/>
                    </ListItemButton>
                    <ListItemButton>
                        <TextField label="Line-Height" defaultValue={textSetting.inputFontColor} onChange={e => updateFontColor(e.target.value)}/>
                    </ListItemButton>
                    <ListItemButton>
                        <div>
                            <div className="background-color-block">
                                <div className="background-color-btn" style={{background: textSetting.inputFontColor}} />
                            </div>
                            <TextField defaultValue={textSetting.inputFontColor} onChange={e => updateFontColor(e.target.value)}/>
                        </div>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <TextField fullWidth id="outlined-basic" label="Text" variant="outlined" onChange={e => updateInputText(e.target.value)} multiline rows={3} />
                    </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </ThemeProvider>
    );

}