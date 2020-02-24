import React from "react";
import {Grid} from "@material-ui/core";
import {AppBar} from "../AppBar/components";

export const ChatPage = () => (
  <Grid container >
    <Grid item xs={12}>
        <AppBar currentActiveRoute="chat" />
    </Grid>
    <p style={{ 
      fontFamily: "Museo Sans Cyrl",
      fontStyle: "normal",
      fontWeight: "300",
      fontSize: "20px",
      lineHeight: "24px",
      color: "#1C1C1C"
    }}>This page is development</p> 
  </Grid>
)