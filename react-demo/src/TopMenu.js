import React, { useState }  from "react";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export function TopMenu() {

  return (
    <Box className="top-menu" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <MenuIcon />
                <Link to="/"><Button>Main</Button></Link>
                <Link to="/preview"><Button>Image</Button></Link>
            </Toolbar>
        </AppBar>
    </Box>
  );
}