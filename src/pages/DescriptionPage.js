import React from "react";
import {Grid, Typography, makeStyles} from "@material-ui/core";
import {DescriptionLinks} from "../components/DescriptionLinks";
import BinanceBanner from "../images/binance-banner.jpg";
import {AppBar} from "../AppBar/components";


const useStyles = makeStyles(theme => ({
  prometeusLink: {
      color: theme.palette.primary.main
  }
}));

const pageHeight = document.documentElement.clientHeight
console.log(pageHeight)


export const DescriptionPage = () => {
  const classes = useStyles();

  const Prometeus = '{Prometeus}';
  const PrometeusNetwork = "{Prometeus Network}";
  const Talk = "{Talk}";


  return(
    <div className="static-page" style={{ minHeight: pageHeight}}>
      <Grid item xs={12}>
          <AppBar currentActiveRoute="notifications" isDescriptionPage={true}/>
      </Grid>
      <Grid container spacing={2} className="description-container">
            <Grid item xs={12}>
                <Typography variant="body2">
                    Try <a className={classes.prometeusLink} href="https://prometeus.io" target="_blank noopener noreferrrer">{PrometeusNetwork}</a>, which allows to buy and sell any imaginable digital data: contract templates, music, 3D models, source codes, stats or your master's thesis – anything you can think of, saved in a file.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" className="description-image-container">
                    <a href="https://www.binance.com/?ref=28821136" target="_blank">
                        <img src={BinanceBanner}/>
                    </a>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">
                    <span>Prometeus {Talk} </span> is Ethereum Plasma based 'decentralized twitter' solution with immutable storage to make it censorship proof.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <DescriptionLinks />
            </Grid>
        </Grid>
    </div>
  )
}

