import React from "react";
import {Grid} from "@material-ui/core";
import {AppBar} from "../AppBar/components";
import {inject} from "mobx-react";
import {StaticPageFooter} from '../components/StaticPageFooter';
import {PrometeusDescription} from "../PrometeusDescription";


const pageHeight = document.documentElement.clientHeight
console.log(pageHeight)


export const DescriptionPage = () => {

  const Prometeus = '{Prometeus}'


  return(
    <div className="static-page" style={{ minHeight: pageHeight}}>
      <Grid item md={3} className="left-container">
          <PrometeusDescription/>
      </Grid>
    </div>
  )
}

