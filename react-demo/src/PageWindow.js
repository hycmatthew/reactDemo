import React, { useState }  from "react";
import paperImage from './paper.png';

export function PageWindow() {
    const [img, setImg] = useState('banana');

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
                var avatar = document.getElementById('avatar');
                avatar.setAttribute('src' , imgData);
            }
        };
    }

    return (
        <div>
          <h1>圖片預覽與檔案上傳</h1>
          <input type="file" onChange={uploadImage} />
          <div className="preview-block">
            <img src={img} />
            <canvas id="canvas" className="hidden"><img id="avatar" src={paperImage} /></canvas>
          </div>
          <button onClick={submit}>上傳</button>
        </div>
    );
}
