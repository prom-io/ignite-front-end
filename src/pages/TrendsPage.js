import React from "react";
import { Grid } from "@material-ui/core";
import { inject, observer } from "mobx-react";

import { localized } from "../localization/components";
import { AppBar } from "../AppBar/components";
import {
    PrometeusDescription,
    ExploreOurFeaturesDescription
} from "../PrometeusDescription";
import { Layout } from "../Layout";
import { LoginForm } from "../Authorization/components";
import { makeStyles } from '@material-ui/core/styles';
import { IgniteTrendPage } from '../icons/IgniteTrendPage';

const useStyles = makeStyles(theme => ({
    trendError: {
        border: '1px solid #F1EBE8',
        borderBottom: 'none',
        height: '100%',
        padding: '0 30px',
    },
    trendErrorInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '65px',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#A2A2A2',
        '& h1': {
            fontFamily: 'Museo Sans Cyrl Bold',
            fontSize: '20px',
            margin: '24px 0 4px 0',
            color: '#1C1C1C',
        },
    },
}));

const _TrendsPage = ({ currentUser, l }) => {
    const classes = useStyles();
    return (
    <Grid container>
        <AppBar currentActiveRoute="trends" />
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
                                <div className={classes.trendError}>
                                    <div className={classes.trendErrorInfo}>
                                        <IgniteTrendPage color={'#A2A2A2'}/>
                                        <h1>{l("appbar.trends")}</h1>
                                    </div>
                                    <div>
                                        <p>{l("trends.first-paragraph")}</p>
                                        <p>{l("trends.second-paragraph")}</p>
                                        <p>{l("trends.third-paragraph")}</p>
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
)};

const mapMobxToProps = ({ authorization }) => ({
    currentUser: authorization.currentUser
});

export const TrendsPage = localized(inject(mapMobxToProps)(observer(_TrendsPage)));
