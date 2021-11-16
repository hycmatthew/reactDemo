import React, { useState, useEffect, useReducer, useContext }  from "react";
import paperImage from './paper.png';
import iPhone13Image from './iPhone 13 - Moonlight.png';
import { useLocation } from "react-router";
import { TopMenu } from './TopMenu.js'; 
import { SideMenu } from "./SideMenu.js";
import { Context, backgroundTypeEnum } from "./ImageContext.js";

export function PageWindow() {
    
    const { state, dispatch } = useContext(Context);

    const emp = useLocation();
    const [img, setImg] = useState('');
    const deviceSize = [1400,2700];
    const screenSize = [1170,2532];

    function screenImageLoad(){
        return new Promise(function(resolve, reject) {
            let screenImage = new Image();
            const reader = new FileReader();
            reader.onload=()=>{
                screenImage.src = reader.result;
            }
            reader.readAsDataURL(state.imageFiles);

            screenImage.onload = function() {
                resolve(screenImage);
            }
        });
    }

    function deviceImageLoad(){
        return new Promise(function(resolve, reject) {
            let deviceImage = new Image();
            deviceImage.src = iPhone13Image;

            deviceImage.onload = function() {
                resolve(deviceImage);
            }
        });
    }

    useEffect(() => {
        let setStartX = parseInt(state.deviceXPos);
        let setStartY = parseInt(state.deviceYPos);

        let canvas = document.getElementById("canvas");
        canvas.width = deviceSize[1];
        canvas.height = deviceSize[0];
        let ctx = canvas.getContext("2d");
        
        let setGradientX = deviceSize[1];
        let setGradientY = deviceSize[0];
        if(parseInt(state.backgroundDirection) === 0){
            setGradientX = 0;
        }else{
            setGradientY = 0;
        }

        let grd = ctx.createLinearGradient(0, 0, setGradientX,setGradientY);
        if(state.backgroundType == backgroundTypeEnum.single){
            grd.addColorStop(0, state.backgroundColor[0].color);
            grd.addColorStop(1, state.backgroundColor[0].color);
        }else{
            let haveFirstZero = false;
            for (let value of state.backgroundColor.values()){
                let setPos = parseInt(value.colorPos)/100;
                if(setPos !== null && setPos < 101){
                    if(setPos == 0){
                        if(haveFirstZero === false){
                            haveFirstZero = true
                            grd.addColorStop(setPos, value.color);
                        }
                    }else{
                        grd.addColorStop(setPos, value.color);
                    }
                }
            }
        }
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, deviceSize[1], deviceSize[0]);

        const setStyle = { fontSize:50, fontFamily:'Arial', color:'black', textAlign:'left', textBaseline:'top' };
        ctx.font = setStyle.fontSize + 'px ' + setStyle.fontFamily;
        ctx.textAlign = setStyle.textAlign;
        ctx.textBaseline = setStyle.textBaseline;
        ctx.fillStyle = state.fontColor;
        ctx.textAlign = state.fontAlign;
        ctx.font = (state.fontSize.toString()+"px "+state.fontFamily);

        let textArray = state.inputText.split(/\r?\n/);
        let y = 500;
        for (var i = 0; i < textArray.length; i++) {
            ctx.fillText(textArray[i], setStartX/2, y);
            y += parseInt(state.lineHeight);    
        }

        if(state.containImage){
            (async () => {
                const setScreenWidth = screenSize[0]/2;
                const setScreenHeight = screenSize[1]/2;
                const setDeviceWidth = deviceSize[0]/2;
                const setDeviceHeight = deviceSize[1]/2;

                const screenLoad = await screenImageLoad();
                ctx.drawImage(screenLoad, setStartX+57, setStartY+42, setScreenWidth, setScreenHeight);
                const deviceLoad = await deviceImageLoad();
                ctx.drawImage(deviceLoad, setStartX, setStartY, setDeviceWidth, setDeviceHeight);

                let imgData = canvas.toDataURL("image/png");
                let canvasImage = document.getElementById('canvas-img');
                canvasImage.setAttribute('src' , imgData);
            })();
        }else{
            let imageObj1 = new Image();
            imageObj1.src = iPhone13Image;

            imageObj1.onload = function() {
                const setDeviceWidth = deviceSize[0]/2;
                const setDeviceHeight = deviceSize[1]/2;
                ctx.drawImage(imageObj1, setStartX, setStartY, setDeviceWidth, setDeviceHeight);
                let imgData = canvas.toDataURL("image/png");
                let canvasImage = document.getElementById('canvas-img');
                canvasImage.setAttribute('src' , imgData);
            }
        }
    }, [state]);

    const fileLoad = e => {
        this.setState({
          img: e.target.result
        });
    };

    const submit = () => {
        console.log("submit");
    };

    const uploadImage = (e) =>{
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function(result){
            setImg(this.result);
            mergeImage(this.result);
        };
    }
    
    return (
        <div className="web-page">
            <TopMenu />
            <div className="preview-left-block">
                <SideMenu />
            </div>
            <div className="preview-right-block">
                <h1>{state.inputText}</h1>
                <div className="preview-block">
                    <canvas id="canvas"><img id="canvas-img" /></canvas>
                </div>
                <button onClick={submit}>上傳</button>
            </div>
        </div>
    );
}
