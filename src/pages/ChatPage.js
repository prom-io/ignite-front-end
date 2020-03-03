import React from "react";
import {Grid} from "@material-ui/core";
import {AppBar} from "../AppBar/components";
import {StaticPageFooter} from '../components/StaticPageFooter';



export const ChatPage = () => {
  
  const Prometeus = '{Prometeus}'

  return(
  
  <div className="static-page">
    <Grid item xs={12}>
        <AppBar currentActiveRoute="chat" />
    </Grid >
    <div className="static-page-container">
      <div className="static-page-logo-container">
        <img src="/page_img/Ignite_chat_page.png" />
        <h1>Ignite Chat</h1>
      </div>
      <div>
        <div>
          <p>
            Prometeus Team plans to create and develop the encrypted peer to peer chat messaging service as part of the functionality of Ignite service. All the messages will be encrypted on the user's device and cannot be read by <span>{Prometeus}</span>. All the messages will be deleted after 30 days.
          </p>
          <p>
            Our general purpose is to build distributed tools to support global Freedom Of Speech. We support free speech, individual liberty and the free flow of information online. We believe that the future of online publishing is decentralized and open.
            We believe that users of social networks should be able to control their social media experience on their own terms, rather than the terms set down by Big Tech.
          </p>
        </div>
      </div>
    </div>
    <StaticPageFooter />
  </div>
)}
