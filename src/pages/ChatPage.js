import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, makeStyles } from '@material-ui/core';

import { localized } from '../localization/components';
import { AppBar } from '../AppBar/components';
import {
    PrometeusDescription,
    ExploreOurFeaturesDescription,
} from '../PrometeusDescription';
import { Layout } from '../Layout';
import { LoginForm } from '../Authorization/components';

const useStyles = makeStyles(theme => ({
    chatError: {
        border: `1px solid ${theme.palette.border.main}`,
        height: '100%',
        padding: '30px',
        textAlign: 'center',
        '& h1': {
            fontFamily: 'Museo Sans Cyrl Bold',
            fontSize: '20px',
            margin: '24px 0 4px 0',
            color: theme.palette.text.main,
        },
        '& p': {
            color: theme.palette.text.secondary,
            fontSize: '15px',
            lineHeight: '26px',
        },
    },
    chatErrorTitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#A2A2A2',
    },
    chatErrorInfo: {
        textAlign: 'justify',
    },
}));

const _ChatPage = ({ currentUser, l }) => {
    const classes = useStyles();
    return (
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
                            lg={9}
                            className="right-content-container"
                        >
                            {!currentUser && (
                                <Grid item className="login-form-container">
                                    <LoginForm
                                        hideSignUpButton={
                                            process.env
                                                .REACT_APP_HIDE_SIGN_UP_BUTTON
                                            === 'true'
                                        }
                                    />
                                </Grid>
                            )}
                            <div className={classes.chatError}>
                                <div className={classes.chatErrorTitle}>
                                    <div className="ignite-chat-page" />
                                    <h1>PrompTalk Chat</h1>
                                </div>
                                <div className={classes.chatErrorInfo}>
                                    <p>{l('chat.description.first-paragraph')}</p>
                                    <p>{l('chat.description.second-paragraph')}</p>
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
};

const mapMobxToProps = ({ authorization }) => ({
    currentUser: authorization.currentUser,
});

export const ChatPage = localized(inject(mapMobxToProps)(observer(_ChatPage)));
