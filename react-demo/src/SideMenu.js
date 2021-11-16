import React, { useState, useEffect, useReducer, useContext }  from "react";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemButton from '@material-ui/core/ListItemButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import MuiInput from '@material-ui/core/Input';

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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles,styled } from "@material-ui/styles";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { backgroundTypeEnum, deviceInitPosition, Context } from "./ImageContext.js";

const useStyles = makeStyles(theme => ({
    colorField: {
        width: 120,
    }
}));

export function SideMenu(props) {
    const classes = useStyles();
    const Input = styled(MuiInput)`width: 42px;`;

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
        inputFontColor: '#ffffff',
        inputLineHeight: 90
    }

    const initColorLogicLogic = [{ id: 0, color: '#24C6DC', colorPos: 0 },{ id: 1, color: '#514A9D', colorPos: 100}];
    let typingTimer = null;

    const [openSizeSetting, setOpenSizeSetting] = React.useState(true);
    const [openScreenshot, setOpenScreenshot] = React.useState(true);
    const [openBackground, setOpenBackground] = React.useState(true);
    const [openText, setOpenText] = React.useState(true);
    const {state, dispatch } = useContext(Context);
    const [backgroundType, setBackgroundType] = React.useState(backgroundTypeEnum.single);

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
        let setNum = parseInt(num)
        setBackgroundDirection(setNum);
        dispatch({ type: 'updateBackgroundDirection', backgroundDirection: setNum});
    };

    const addBackgroundColorNum = () => {
        let setNum = colorList.length;
        let newList = [...colorList, { id: setNum, color: '#f9d39a', colorPos: 0 }];
        setColorList(newList);
    }

    const deleteBackgroundColorNum = (num) => {
        let newList = [...colorList];
        newList.splice(num,1);
        setColorList(newList);
    }

    const updateBackgroundType = (type) => {
        let setType = parseInt(type);
        setBackgroundType(setType);
        dispatch({ type: 'updateBackgroundColor', backgroundType: type, backgroundColor: colorList});
    };

    const updateInputText = (str) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            dispatch({ type: 'updateTextStr', inputText: str});
        }, 500);
    }

    const updateDeviceSize = (e, size) => {
        setDeviceSetting(prevState => ({ ...prevState, deviceSize: size }))
        dispatch({ type: 'updateDeviceSize', deviceSize: size});
    }

    const updateDeviceXPosition = (pos) => {
        const re = /^[0-9\b]{1,4}$/;
        if (pos === '' || re.test(pos)) {
            setDeviceSetting(prevState => ({ ...prevState, deviceXPos: pos }))
            dispatch({ type: 'updateDeviceXPosition', deviceXPos: pos});
        }
    }

    const updateDeviceYPosition = (pos) => {
        const re = /^[0-9\b]{1,3}$/;
        if (pos === '' || re.test(pos)) {
            setDeviceSetting(prevState => ({ ...prevState, deviceYPos: pos }))
            dispatch({ type: 'updateDeviceYPosition', deviceYPos: pos});
        }
    }

    const handleAlignment = (newAlignment) => {
        console.log(newAlignment);
        setTextSetting(prevState => ({ ...prevState, inputAlignment: newAlignment }))
        dispatch({ type: 'updateTextAlignment', fontAlignment: newAlignment});
    };

    const updateTextFontFamily = (fontFamily) => {
        setTextSetting(prevState => ({ ...prevState, inputFontFamily: fontFamily }))
        dispatch({ type: 'updateTextFontFamily', fontFamily: fontFamily});
    }

    const updateLineHeight = (lineHeight) => {
        const re = /^[0-9\b]{1,3}$/;
        if (lineHeight === '' || re.test(lineHeight)) {
            setTextSetting(prevState => ({ ...prevState, inputLineHeight: lineHeight }))
            dispatch({ type: 'updateTextLineHeight', lineHeight: lineHeight});
        }
    }

    const updateTextFontSize = (fontSize) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            setTextSetting(prevState => ({ ...prevState, inputFontSize: fontSize }))
            dispatch({ type: 'updateTextFontSize', fontSize: fontSize});
        }, 8);
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
        if(backgroundType === backgroundTypeEnum.single){
            return (
                <ListItem>
                    <div>
                        <div className="background-color-block">
                            <div className="background-color-btn" style={{background: colorList[0].color}} />
                        </div>
                        <TextField size="small" label="Color" defaultValue={colorList[0].color} onChange={e => backgroundColorBlockChange(1, e.target.value)}/>
                    </div>
                </ListItem>
            );
        }else{
            let blockPickerList = [];
            if(colorList.length > 5){
                blockPickerList.push(
                    <ListItem>
                        <ToggleButtonGroup color="primary" value={backgroundDirection} onChange={e => updateBackgroundDirection(e.target.value)} exclusive>
                            <ToggleButton value={0}>vertical</ToggleButton>
                            <ToggleButton value={1}>horizontal</ToggleButton>
                        </ToggleButtonGroup>
                        <IconButton aria-label="delete" disabled color="primary">
                            <AddCircleIcon />
                        </IconButton>
                    </ListItem>
                )
            }else{
                blockPickerList.push(
                    <ListItem>
                        <ToggleButtonGroup color="primary" value={backgroundDirection} onChange={e => updateBackgroundDirection(e.target.value)} exclusive>
                            <ToggleButton value={0}>vertical</ToggleButton>
                            <ToggleButton value={1}>horizontal</ToggleButton>
                        </ToggleButtonGroup>
                        <IconButton aria-label="delete" onClick={e => addBackgroundColorNum() } color="primary">
                            <AddCircleIcon />
                        </IconButton>
                    </ListItem>
                )
            }
            for(let i=0; i<colorList.length; i++){
                if(colorList.length < 3){
                    blockPickerList.push(
                        <ListItem key={colorList[i].id}>
                            <div className="background-color-block">
                                <div className="background-color-btn" style={{background: colorList[i].color}} />
                            </div>
                            <TextField width="100px" size="small" label="Color" defaultValue={colorList[i].color} onChange={e => backgroundColorBlockChange(i, e.target.value)}/>
                            <TextField width="100px" size="small" label="Position" defaultValue={colorList[i].colorPos} onChange={e => backgroundColorPositionChange(i, e.target.value)}/>
                            <IconButton aria-label="delete" disabled color="primary">
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    )
                }else{
                    blockPickerList.push(
                        <ListItem key={colorList[i].id}>
                            <div className="background-color-block">
                                <div className="background-color-btn" style={{background: colorList[i].color}} />
                            </div>
                            <TextField width="100px" size="small" label="Color" defaultValue={colorList[i].color} onChange={e => backgroundColorBlockChange(i, e.target.value)}/>
                            <TextField width="100px" size="small" label="Position" defaultValue={colorList[i].colorPos} onChange={e => backgroundColorPositionChange(i, e.target.value)}/>
                            
                            <IconButton aria-label="delete" onClick={e => deleteBackgroundColorNum(i) } color="primary">
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    )
                }
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
                        <ToggleButtonGroup value={deviceSetting.deviceSize} exclusive onChange={ updateDeviceSize } aria-label="text alignment">
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
                        <TextField size="small" label="Position X" value={deviceSetting.deviceXPos} onChange={e => updateDeviceXPosition(e.target.value)}/>
                        <TextField size="small" label="Position Y" value={deviceSetting.deviceYPos} onChange={e => updateDeviceYPosition(e.target.value)}/>
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
                            <ToggleButton value={backgroundTypeEnum.single}>Single Color</ToggleButton>
                            <ToggleButton value={backgroundTypeEnum.gradient}>Gradient</ToggleButton>
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
                        <ToggleButtonGroup value={textSetting.inputAlignment} exclusive onChange={ (e, value) => handleAlignment(value)} aria-label="text alignment">
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
                    </ListItemButton>
                    <ListItemButton>
                        <Box sx={{ width: 250 }}>
                            <Typography id="input-slider" gutterBottom>
                                Volume
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                    <Slider value={textSetting.inputFontSize}  aria-labelledby="input-slider" onChange={ e => updateTextFontSize(e.target.value) } />
                                </Grid>
                                <Grid item>
                                    <Input value={textSetting.inputFontSize} size="small" onChange={ e => updateTextFontSize(e.target.value) } inputProps={{ step: 10,  min: 0, max: 100, type: 'number', 'aria-labelledby': 'input-slider', }} />
                                </Grid>
                            </Grid>
                        </Box>
                    </ListItemButton>
                    <ListItemButton>
                        <TextField size="small" label="Line-Height" value={textSetting.inputLineHeight} onChange={e => updateLineHeight(e.target.value)}/>
                    </ListItemButton>
                    <ListItemButton>
                        <div>
                            <div className="background-color-block">
                                <div className="background-color-btn" style={{background: textSetting.inputFontColor}} />
                            </div>
                            <TextField size="small" defaultValue={textSetting.inputFontColor} onChange={e => updateFontColor(e.target.value)}/>
                        </div>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <TextField size="small" fullWidth id="outlined-basic" label="Text" variant="outlined" onChange={e => updateInputText(e.target.value)} multiline rows={4} />
                    </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </ThemeProvider>
    );

}