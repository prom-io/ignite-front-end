import React from "react";
import {Grid} from "@material-ui/core";
import {AppBar} from "../AppBar/components";
import {StaticPageFooter} from '../components/StaticPageFooter';
import {localized} from "../localization/components";

const _TrendsPage = ({l}) => {

  return(
    <div className='static-page'>
      <Grid container style={{
        "flex-direction": "column"
      }} >
        <Grid item xs={12}>
            <AppBar currentActiveRoute="trends" />
        </Grid>
        <div className="static-page-container">
            <div>
              <div className="static-page-logo-container">
                <img src="/page_img/trends_page.svg" />
                <h1>{l("appbar.trends")}</h1>
              </div>
              <div>
                <p>
                    {l("trends.first-paragraph")}
                </p>
                <p>
                    {l("trends.second-paragraph")}
                </p>
                <p>
                    {l("trends.third-paragraph")}
                </p>
              </div>
            </div>
          </div>
        <StaticPageFooter />
      </Grid>
    </div>
    
  )
}

export const TrendsPage = localized(_TrendsPage);
