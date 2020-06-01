import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'mobx-router';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import BinanceBanner from '../images/binance-banner.jpg';
import JustBanner from '../images/just-banner.png';
import { DescriptionLinks } from '../components/DescriptionLinks';
import { BtfsIcon } from '../icons/BtfsIcon';
import { Routes } from '../routes';
import { localized } from '../localization/components';
import { DescriptionUnauthBanner } from './DescriptionUnauthBanner';
import { DescriptionStoaBanner } from './DescriptionStoaBanner';

const useStyles = makeStyles(theme => ({
    prometeusLink: {
        color: theme.palette.primary.main,
    },
    marginDescription: {
        position: 'relative',
        top: 44,
        width: 240,
        '& img': {
            width: '240px',
            paddingLeft: '8px',
        },
    },
    exploreCard: {
        padding: '16px 0 0 0',
        border: '1px solid #F1EBE8',
        borderRadius: '4px',
        '& h3': {
            paddingLeft: 16,
            fontFamily: 'Museo Sans Cyrl Bold',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '20px',
            lineHeight: '24px',
            color: '#1C1C1C',
            margin: '0 0 16px 0',
        },
    },
    exploreCardBody: {

    },
    exploreCardBodyBox: {
        display: 'flex',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
        borderTop: '1px solid #F1EBE8',
        height: 84,
        padding: '0 16px',
        '& p': {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            fontFamily: 'Museo Sans Cyrl Regular',
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: '15px',
            lineHeight: '18px',
            color: '#1C1C1C',
        },
    },
    exploreCardImgBox: {
        width: '32px !important',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '& img': {
            width: '20px',
            marginRight: 12
        }
    },
}));
const _ExploreOurFeaturesDescription = ({ routerStore, l, locale, currentUser }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className="description-container-right">

            <Grid className="user_profile_container">
                <div className={classes.exploreCard}>
                    <h3>{l('user.card.eplore-our-features')}</h3>
                    <div className={classes.exploreCardBody}>

                        <div className={classes.exploreCardBodyBox}>
                            <div className={classes.exploreCardImgBox}>
                                <img src="/descriptions/search.svg" />
                            </div>
                            <p>
                                {l('user.card.follow-your-interests')}
                            </p>
                        </div>

                        <div className={classes.exploreCardBodyBox}>
                            <div className={classes.exploreCardImgBox}>
                                <img src="/descriptions/friends.svg" />
                            </div>
                            <p>
                                {l('user.card.hear-what-people-talking-about')}
                            </p>
                        </div>

                        <div className={classes.exploreCardBodyBox}>
                            <div className={classes.exploreCardImgBox}>
                                <img src="/descriptions/comment.svg" />
                            </div>
                            <p>
                                {l('user.card.join-the-conversation')}
                            </p>
                        </div>

                    </div>
                </div>
            </Grid>

            <Grid className={classes.marginDescription}>
                <a
                    href="https://github.com/binance-chain/whitepaper/blob/master/WHITEPAPER.md"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="/descriptions/banner-binance-smart-chain.png" />
                </a>
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const ExploreOurFeaturesDescription = localized(
    inject(mapMobxToProps)(observer(_ExploreOurFeaturesDescription)),
);
