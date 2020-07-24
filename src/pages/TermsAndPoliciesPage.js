import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { localized } from '../localization/components';
import { AppBar } from '../AppBar/components';
import {
    PrometeusDescription,
    ExploreOurFeaturesDescription,
} from '../PrometeusDescription';
import { Layout } from '../Layout';
import { LoginForm } from '../Authorization/components';

const useStyles = makeStyles(theme => ({
    termsAndPolicies: {
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
    termsAndPoliciesTitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#A2A2A2',
    },
    termsAndPoliciesInfo: {
        textAlign: 'justify',
        marginBottom: '50px',
        '&:last-child': {
            marginBottom: 0,
        },
    },
}));

const _TermsAndPolicesPage = ({ currentUser, l }) => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <AppBar currentActiveRoute="terms" />
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
                                    <LoginForm
                                        hideSignUpButton={
                                            process.env
                                                .REACT_APP_HIDE_SIGN_UP_BUTTON
                                            === 'true'
                                        }
                                    />
                                </Grid>
                            )}
                            <div className={classes.termsAndPolicies}>
                                <div className={classes.termsAndPoliciesTitle}>
                                    <img src="/page_img/terms_of_service_page.svg" />
                                    <h1>{l('terms-of-service')}</h1>
                                </div>
                                <div className={classes.termsAndPoliciesInfo}>
                                    <p>{l('terms-of-service.paragraph-1')}</p>
                                    <p>{l('terms-of-service.paragraph-2')}</p>
                                    <p>{l('terms-of-service.paragraph-3')}</p>
                                    <p>{l('terms-of-service.paragraph-4')}</p>
                                </div>
                                <div className={classes.termsAndPoliciesTitle}>
                                    <img src="/page_img/privacy_policies_page.svg" />
                                    <h1>{l('privacy-policies')}</h1>
                                </div>
                                <div className={classes.termsAndPoliciesInfo}>
                                    <p>{l('privacy-policies.paragraph-1')}</p>
                                    <p>{l('privacy-policies.paragraph-2')}</p>
                                    <p>{l('privacy-policies.paragraph-3')}</p>
                                    <p>{l('privacy-policies.paragraph-4')}</p>
                                    <p>{l('privacy-policies.paragraph-5')}</p>
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

export const TermsAndPoliciesPage = localized(
    inject(mapMobxToProps)(observer(_TermsAndPolicesPage)),
);
