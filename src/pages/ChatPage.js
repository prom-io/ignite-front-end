import React from "react";
import {Grid} from "@material-ui/core";
import {AppBar} from "../AppBar/components";
import {StaticPageFooter} from '../components/StaticPageFooter';
import {localized} from "../localization/components";

const _ChatPage = ({l}) => {

  return(
  
  <div className="static-page">
    <Grid item xs={12}>
        <AppBar currentActiveRoute="chat" />
    </Grid >
    <div className="static-page-container">
      <div>
        <div className="static-page-logo-container">
          <img src="/page_img/Ignite_chat_page.svg" />
          <h1>PrompTalk Chat</h1>
        </div>
        <div>
          <p>
            {l("chat.description.first-paragraph")}
          </p>
          <p>
            {l("chat.description.second-paragraph")}
          </p>
        </div>
      </div>
    </div>
    <StaticPageFooter />
  </div>
)}

export const ChatPage = localized(_ChatPage);
