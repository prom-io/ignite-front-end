import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, makeStyles } from '@material-ui/core';

import { localized } from '../localization/components';
import bannerBinanceSmartChain from "../images/banner-binance-smart-chain.png";
import { SearchIcon } from '../icons/SearchIcon';
import { FriendsIcon } from '../icons/FriendsIcon';
import { CommentIcon } from '../icons/CommentIcon';

const useStyles = makeStyles(theme => ({
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
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: '4px',
        '& h3': {
            paddingLeft: 16,
            fontFamily: 'Museo Sans Cyrl Bold',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '20px',
            lineHeight: '24px',
            color: theme.palette.text.main,
            margin: '0 0 16px 0',
        },
    },
    exploreCardBody: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    exploreCardBodyBox: {
        display: 'flex',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
        borderTop: `1px solid ${theme.palette.border.main}`,
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
            color: theme.palette.text.main,
        },
    },
    exploreCardImgBox: {
        width: '32px !important',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '& img': {
            width: '20px',
            marginRight: 12,
        },
    },
}));
const _ExploreOurFeaturesDescription = ({ routerStore, l, locale, currentUser }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className={`description-container-right ${classes.exploreCardBody}`}>

            <Grid className="user_profile_container">
                <div className={classes.exploreCard}>
                    <h3>{l('user.card.eplore-our-features')}</h3>
                    <div className={classes.exploreCardBody}>

                        <div className={classes.exploreCardBodyBox}>
                            <div className={classes.exploreCardImgBox}>
                              <SearchIcon />
                            </div>
                            <p>
                                {l('user.card.follow-your-interests')}
                            </p>
                        </div>

                        <div className={classes.exploreCardBodyBox}>
                            <div className={classes.exploreCardImgBox}>
                                <FriendsIcon/>
                            </div>
                            <p>
                                {l('user.card.hear-what-people-talking-about')}
                            </p>
                        </div>

                        <div className={classes.exploreCardBodyBox}>
                            <div className={classes.exploreCardImgBox}>
                                <CommentIcon commented={true} />
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
                    <img src={bannerBinanceSmartChain} />
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
