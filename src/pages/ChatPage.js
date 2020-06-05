import React from 'react';
import { Grid } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import { localized } from '../localization/components';
import { AppBar } from '../AppBar/components';
import {
    PrometeusDescription,
    ExploreOurFeaturesDescription,
} from '../PrometeusDescription';
import { Layout } from '../Layout';
import { LoginForm } from '../Authorization/components';
import { IgniteChatPage } from '../icons/IgniteChatPage';

const _ChatPage = ({ currentUser, l }) => (
    <Grid container>
        <Grid item xs={12}>
            <AppBar currentActiveRoute="chat" />
        </Grid>
        <Grid item xs={12}>
            <Layout>
                <Grid container className="content-container">
                    <Grid item md={3} className="left-banners-container">
                        <PrometeusDescription />
                    </Grid>
                    <Grid
                        item
                        spacing={28}
                        lg={9}
                        className="right-content-container"
                    >
                        {!currentUser && (
                            <Grid item className="login-form-container">
                                <LoginForm />
                            </Grid>
                        )}
                        <div className="static-page">
                            <div className="static-page-container">
                                <div className={classes.chatError}>
                                    <div className={classes.chatErrorInfo}>
                                        <IgniteChatPage color="#A2A2A2" />
                                        <h1>PrompTalk Chat</h1>
                                    </div>
                                    <div>
                                        <p>{l('chat.description.first-paragraph')}</p>
                                        <p>{l('chat.description.second-paragraph')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={3} className="right-banners-container">
                        <ExploreOurFeaturesDescription />
                    </Grid>
                </Grid>
            </Layout>
        </Grid>
    </Grid>
);

const mapMobxToProps = ({ authorization }) => ({
    currentUser: authorization.currentUser,
});

export const ChatPage = localized(inject(mapMobxToProps)(observer(_ChatPage)));
