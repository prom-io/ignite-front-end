import React from "react";
import {Grid} from "@material-ui/core";
import {AppBar} from "../AppBar/components";
import {inject} from "mobx-react";
import {StaticPageFooter} from '../components/StaticPageFooter';

const pageHeight = document.documentElement.clientHeight
console.log(pageHeight)


export const NotificationsPage = () => {

  const Prometeus = '{Prometeus}'


  return(
    <div className="static-page" style={{ minHeight: pageHeight}}>
      <Grid item xs={12}>
          <AppBar currentActiveRoute="notifications" />
      </Grid>
        <div className="static-page-container">
          <div className="static-page-logo-container">
            <img src="/page_img/notifications_page.png" />
            <h1>Notifications</h1>
          </div>
          <div>
            <div>
              <p>
                Prometeus Team plans to create and develop Notifications timeline to offer our users a simple way to see how others on Ignite are interacting with them. 
              </p>
              <p>
                From the Notifications timeline, you’ll be able to see which of your posts have been liked, plus the latest reposts, posts directed to you (replies and mentions) and your new followers. You could view your notifications in two ways: 'All' shows you notifications for account activity like new followers, reposts, mentions, and likes. 'Mentions' will show you notifications only for posts that mention your username.   
              </p>
              <p>
                Later we are going to implement the 'Quality filter' that will filter lower-quality content from your notifications, for example, duplicate posts or content that appears to be automated, but it will never filter notifications from people you follow
                or accounts you’ve recently interacted with. You will have the option to turn this
                on or off in your notifications settings. 
              </p>
            </div>
          </div>
        </div>
      <StaticPageFooter />
    </div>
  )
}

