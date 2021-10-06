import React, { useState, useEffect, useReducer }  from "react";
import { TopMenu } from './TopMenu.js'; 
import { SideMenu } from "./SideMenu.js";
import paperImage from './paper.png';
import iPhone13Image from './iPhone 13 - Moonlight.png';
import { useLocation } from "react-router";

export function PageWindow() {
    
    const emp = useLocation();
    const [img, setImg] = useState('');
    const deviceSize = [2532,1170];

    useEffect(() => {
        let canvas = document.getElementById("canvas");
        canvas.width = deviceSize[0];
        canvas.height = deviceSize[1];
        let ctx = canvas.getContext("2d");
        let grd = ctx.createLinearGradient(0, 0, deviceSize[0], deviceSize[1]);
        grd.addColorStop(0, '#314755');
        grd.addColorStop(1, '#26a0da');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, deviceSize[0], deviceSize[1]);

        let imageObj1 = new Image();
        imageObj1.src = iPhone13Image;
        imageObj1.onload = function() {
            const setDeviceWidth = deviceSize[1]/2;
            const setDeviceHeight = deviceSize[0]/2;
            ctx.drawImage(imageObj1, 1500, 250, setDeviceWidth, setDeviceHeight);
            let imgData = canvas.toDataURL("image/png");
            let canvasImage = document.getElementById('canvas-img');
            canvasImage.setAttribute('src' , imgData);
        }
        console.log()
    }, []);

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
                <h1>圖片預覽與檔案上傳</h1>
                <input type="file" onChange={uploadImage} />
                <div className="preview-block">
                    <canvas id="canvas"><img id="canvas-img" /></canvas>
                </div>
                <button onClick={submit}>上傳</button>
            </div>
        </div>
    );
}
