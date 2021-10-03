import React, { useState, useEffect }  from "react";
import { TopMenu } from './TopMenu.js'; 
import paperImage from './paper.png';

export function PageWindow() {
    
    const [img, setImg] = useState('');

    useEffect(() => {
        let canvas = document.getElementById("canvas");
        canvas.width = 700;
        canvas.height = 700;
        let ctx = canvas.getContext("2d");
        let grd = ctx.createLinearGradient(0, 0, 700, 0);
        grd.addColorStop(0, '#314755');
        grd.addColorStop(1, '#26a0da');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 700, 700);
        var imgData = canvas.toDataURL("image/png");
        var canvasImage = document.getElementById('canvas-img');
        canvasImage.setAttribute('src' , imgData);
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
        var canvas = document.getElementById("canvas");
        canvas.width = 700;
        canvas.height = 700;
        var ctx = canvas.getContext("2d");
        var grd = ctx.createLinearGradient(0, 0, 700, 0);
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "white");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 700, 700);

        var imageObj1 = new Image();
        var imageObj2 = new Image();
        imageObj1.src = paperImage;
        imageObj2.src = image;
        imageObj1.onload = function() {
            ctx.drawImage(imageObj1, 0, 0, 400, 400);
            imageObj2.onload = function() {
                ctx.drawImage(imageObj2, 200, 200, 300, 300);
                var imgData = canvas.toDataURL("image/png");
                var canvasImage = document.getElementById('canvas-img');
                canvasImage.setAttribute('src' , imgData);
            }
        };
    }

    function setupImage(){
        const img = new Image();
        setImgElement(paperImage);
        /*
        const img = new Image();
        let canvas = document.getElementById("canvas");
        canvas.width = 700;
        canvas.height = 700;
        let ctx = canvas.getContext("2d");
        let grd = ctx.createLinearGradient(0, 0, 700, 0);
        grd.addColorStop(0, '#314755');
        grd.addColorStop(1, '#26a0da');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 700, 700);
        ctx.drawImage(img, left, top, width, height);
        setImgElement(img);*/
    }
    
    return (
        <div className="web-page">
            <TopMenu />
            <h1>圖片預覽與檔案上傳</h1>
            <input type="file" onChange={uploadImage} />
            <div className="preview-block">
                <canvas id="canvas"><img id="canvas-img" /></canvas>
            </div>
            <button onClick={submit}>上傳</button>
        </div>
    );
}
