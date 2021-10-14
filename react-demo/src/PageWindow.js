import React, { useState, useEffect, useReducer, useContext }  from "react";
import paperImage from './paper.png';
import iPhone13Image from './iPhone 13 - Moonlight.png';
import { useLocation } from "react-router";
import { TopMenu } from './TopMenu.js'; 
import { SideMenu } from "./SideMenu.js";
import { Context } from "./ImageContext.js";
import regeneratorRuntime from "regenerator-runtime";

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
                console.log("imageObj2.onload");
                resolve(screenImage);
            }
        });
    }

    function deviceImageLoad(){
        return new Promise(function(resolve, reject) {
            let deviceImage = new Image();
            deviceImage.src = iPhone13Image;

            deviceImage.onload = function() {
                console.log("deviceImage onload");
                resolve(deviceImage);
            }
        });
    }

    useEffect(() => {
        let canvas = document.getElementById("canvas");
        canvas.width = deviceSize[1];
        canvas.height = deviceSize[0];
        let ctx = canvas.getContext("2d");
        let grd = ctx.createLinearGradient(0, 0, deviceSize[1], deviceSize[0]);
        grd.addColorStop(0, '#314755');
        grd.addColorStop(1, '#26a0da');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, deviceSize[1], deviceSize[0]);

        const setStyle = { fontSize:50, fontFamily:'Arial', color:'black', textAlign:'left', textBaseline:'top' };
        ctx.font = setStyle.fontSize + 'px ' + setStyle.fontFamily;
        ctx.textAlign = setStyle.textAlign;
        ctx.textBaseline = setStyle.textBaseline;
        ctx.fillStyle = setStyle.color;
        ctx.fillText(state.inputText, 200, 500);

        if(state.containImage){
            (async () => {
                const setScreenWidth = screenSize[0]/2;
                const setScreenHeight = screenSize[1]/2;
                const setDeviceWidth = deviceSize[0]/2;
                const setDeviceHeight = deviceSize[1]/2;

                const screenLoad = await screenImageLoad();
                ctx.drawImage(screenLoad, 1500+57, 250+42, setScreenWidth, setScreenHeight);
                const deviceLoad = await deviceImageLoad();
                ctx.drawImage(deviceLoad, 1500, 250, setDeviceWidth, setDeviceHeight);

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
                ctx.drawImage(imageObj1, 1500, 250, setDeviceWidth, setDeviceHeight);
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

    const mergeImage = (image) => {
        let canvas = document.getElementById("canvas");
        canvas.width = deviceSize[0];
        canvas.height = deviceSize[1];
        let ctx = canvas.getContext("2d");
        let grd = ctx.createLinearGradient(0, 0, 700, 0);
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "white");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let imageObj1 = new Image();
        let imageObj2 = new Image();
        imageObj1.src = paperImage;
        imageObj2.src = image;
        imageObj1.onload = function() {
            ctx.drawImage(imageObj1, 0, 0, 400, 400);
            imageObj2.onload = function() {
                ctx.drawImage(imageObj2, 200, 200, 300, 300);
                let imgData = canvas.toDataURL("image/png");
                let canvasImage = document.getElementById('canvas-img');
                canvasImage.setAttribute('src' , imgData);
            }
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
