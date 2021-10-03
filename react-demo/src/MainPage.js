import React, { useEffect } from "react";
import { TopMenu } from './TopMenu.js'; 

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import paperImage from './paper.png';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export function MainPage() {

    let cardList = [1,2,3,4,5,6,7];

    function createCard(id){
        return (
            <Card key={id} className="image-card" sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="cannot download the image"
                    height="140"
                    image={paperImage}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">Lizard</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Link to="/preview"><Button size="small">Learn More</Button></Link>
                </CardActions>
            </Card>
        );
    }

    return (
        <div className="web-page">
            <TopMenu />
            <div className="main-page">
                { cardList.map((list) => createCard(list) )}
            </div>
        </div>
    );
}
