import React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "mobx-router";
import {Grid, makeStyles, Typography} from "@material-ui/core";
import BinanceBanner from "../images/binance-banner.jpg";
import JustBanner from "../images/just-banner.png";
import UserCard from '../components/UserCard';
import {DescriptionLinks} from '../components/DescriptionLinks';
import {BtfsIcon} from "../icons/BtfsIcon";
import {Routes} from "../routes";


const useStyles = makeStyles(theme => ({
    prometeusLink: {
        color: theme.palette.primary.main
    }
}));

const _PrometeusDescription = ({routerStore}) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className="description-container">
            <Grid  className="user_profile_container">
                <UserCard isLogin={true} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">
                    Try our <a className={classes.prometeusLink} href="https://prometeus.io" target="_blank noopener noreferrrer">Network</a>, which allows to buy and sell any imaginable digital data: contract templates, music, 3D models, source codes, stats or your master's thesis – anything you can think of, saved in a file.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" className="description-image-container">
                    <a href="https://www.binance.com/?ref=28821136" target="_blank" rel="noopener noreferrer">
                        <img src={BinanceBanner}/>
                    </a>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <div className="description-image-container">
                    <a href="https://just.network/#/" target="_blank" rel="noopener noreferrer">
                        <img src={JustBanner}/>
                    </a>
                </div>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">
                    <span>Ignite </span> is Ethereum Plasma based 'decentralized twitter' solution with immutable storage to make it censorship proof.
                </Typography>
            </Grid>
            <Grid item xs={12} style={{
                                borderTop: "1px solid #F1EBE8"
            }}>
                <Link store={routerStore}
                      view={Routes.btfs}
                      style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          alignItems: "center"
                      }}
                >
                    <BtfsIcon/>
                    <Typography style={{paddingLeft: "8px"}}>
                        Explore BTFS
                    </Typography>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <DescriptionLinks />
            </Grid>
        </Grid>
    )
};

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const PrometeusDescription = inject(mapMobxToProps)(observer(_PrometeusDescription));
