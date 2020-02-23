import React from "react";
import {Grid, makeStyles, Typography} from "@material-ui/core";
import BinanceBanner from "../images/binance-banner.jpg";
import UserCard from '../components/UserCard'

const useStyles = makeStyles(theme => ({
    prometeusLink: {
        color: theme.palette.primary.main
    }
}));

const PrometeusNetwork = "{Prometeus Network}";

export const PrometeusDescription = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className="description-container">
            <Grid  className="user_profile_container">
                <UserCard isLogin={true} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">
                    Try <a className={classes.prometeusLink} href="https://prometeus.io" target="_blank noopener noreferrrer">{PrometeusNetwork}</a>, which allows to buy and sell any imaginable digital data: contract templates, music, 3D models, source codes, stats or your master's thesis – anything you can think of, saved in a file.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    <a href="https://binance.com" target="_blank">
                        <img src={BinanceBanner}/>
                    </a>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </Typography>
            </Grid>
        </Grid>
    )
};
