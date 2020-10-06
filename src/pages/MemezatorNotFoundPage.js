import React from "react";
import { Container, Button, Typography, makeStyles } from "@material-ui/core";

import { AppBar } from "../AppBar/components";
import { localized } from "../localization/components";
import { Routes } from "../routes";
import { routerStore } from "../store";
import { IgniteIcon } from "../icons/IgniteIcon";
import memezatorLeftSide from "../images/memezator-left.png";
import memezatorRightSide from "../images/memezator-right.png";

const useStyles = makeStyles(theme => ({
    notFound: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    notFoundMemezatorImages: {
        "& img": {
            "&:first-child": {
                position: "absolute",
                left: "-290px",
                top: "0"
            },
            "&:last-child": {
                position: "absolute",
                right: "-290px",
                top: "0"
            }
        }
    },
    notFoundLogoWrapper: {
        "& svg": {
            paddingTop: "38px",
            height: "120px",
            width: "72px",
            [theme.breakpoints.down("sm")]: {
                paddingTop: "0px"
            },
            [theme.breakpoints.down("xs")]: {
                height: "50px",
                width: "30px"
            }
        }
    },
    notFoundMainText: {
        fontFamily: "Museo Sans Cyrl Bold",
        fontSize: "48px",
        maxWidth: "900px",
        margin: "40px 0",
        padding: "0 15px",
        [theme.breakpoints.down("md")]: {
            margin: "32px 0"
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "20px",
            margin: "32px 0"
        }
    },
    notFoundSecondaryText: {
        fontSize: "22px",
        maxWidth: "950px",
        margin: "0 auto 40px",
        padding: "0 15px",
        [theme.breakpoints.down("md")]: {
            fontSize: "20px"
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "14px"
        }
    },
    notFoundButton: {
        maxWidth: "187px",
        width: "100%",
        height: "40px",
        fontWeight: "bold",
        [theme.breakpoints.down("xs")]: {
            maxWidth: "115px"
        }
    }
}));

export const _MemezatorNotFoundPage = () => {
    const classes = useStyles();

    return (
        <>
            <AppBar currentActiveRoute="memezator" />
            <Container maxWidth="lg" className={classes.notFound}>
                <div className={classes.notFoundMemezatorImages}>
                    <img src={memezatorLeftSide} alt="" />
                    <img src={memezatorRightSide} alt="" />
                </div>
                <div className={classes.notFoundLogoWrapper}>
                    <IgniteIcon />
                </div>
                <Typography
                    className={classes.notFoundMainText}
                    variant="h1"
                    color="textPrimary"
                >
                    Memezator is going on planned maintenance before Memezator 2.0
                    release
                </Typography>
                <Typography
                    className={classes.notFoundSecondaryText}
                    color="textPrimary"
                >
                    It will be unavailable until 8th of October.
                    <br />
                    We will publish a detailed article on Memezator 2.0 and FAQ later
                    today.
                    <br />
                    Thank you for your patience and support!
                </Typography>
                <Button
                    classes={{ root: classes.notFoundButton }}
                    onClick={() => routerStore.router.goTo(Routes.home)}
                    variant="contained"
                    color="primary"
                >
                    Got it!
                </Button>
            </Container>
        </>
    );
};

export const MemezatorNotFoundPage = localized(_MemezatorNotFoundPage);
