import React from "react";
import {Grid} from "@material-ui/core";
import {AppBar} from "../AppBar/components";
import {StaticPageFooter} from '../components/StaticPageFooter';

export const TrendsPage = () => {

  const Prometeus = '{Prometeus}'

  return(
    <Grid container >
      <Grid item xs={12}>
          <AppBar currentActiveRoute="trends" />
      </Grid>
      <div className="static-page-container">
          <div className="static-page-logo-container">
            <img src="/page_img/trends_page.png" />
            <h1>Trends</h1>
          </div>
          <div>
            <div>
              <p>
                Prometeus Team plans to create and develop Trends service to offer our users
                a realtime pulse on what the internet is discussing right now. Trends in Promp Talk will be the people-powered newsroom. Our Trends will decentralize news discovery away from gatekeepers and create a level playing field for mainstream, alternative, and citizen journalists to share their story with the world.
              </p>
              <p>
                You may notice that some trends in other social networks have # sign before the word or phrase. This is called a hashtag and will be included specifically in posts
                to mark them as relating to a topic, so that people can follow the conversation
                in search.
              </p>
              <p>
                Trends will be tailored for you based on who you follow and your interests, and your location (if mentioned). You will be able to choose to see trends that are not tailored for you by selecting specific trends in your trends settings.
              </p>
            </div>
          </div>
        </div>
      <StaticPageFooter />
    </Grid>
  )
}