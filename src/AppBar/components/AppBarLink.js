import React from 'react';
import { Link } from 'mobx-router';
import { makeStyles, Typography, SvgIcon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    appBarLink: {
        textDecoration: 'none',
        display: 'flex',
        color: theme.palette.text.primary,
        marginRight: '20px',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '25%',
            marginRight: '0',
        },
    },
    appBarLinkActive: {
        textDecoration: 'none',
        display: 'flex',
        color: theme.palette.primary.main,
        marginRight: '20px',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '25%',
            marginRight: '0',
        },
    },
    appBarLinkTextContainer: {
        display: 'flex',
        alignItems: 'center',
        '& span': {
            fontFamily: 'Museo Sans Cyrl Regular',
            fontStyle: 'normal',
            fontWeight: '300',
            fontSize: '15px',
            lineHeight: '18px',
        },
        '& svg': {
            width: '16px',
            height: '16px',
        },
    },
    hidden: {
        display: 'none',
    },
    barLink: {
        paddingLeft: '8px',
        [theme.breakpoints.down("sm")]: {
            display: 'none',
        }
    }
}));

export const AppBarLink = ({ routerStore, targetView, viewParameters, active, icon, text, id, hidden }) => {
    const classes = useStyles();

    return (
        <Link
            className={hidden ? classes.hidden : active ? classes.appBarLinkActive : classes.appBarLink}
            store={routerStore}
            view={targetView}
            params={viewParameters}
        >
            <div
                color="inherit"
                className={classes.appBarLinkTextContainer}
                id={id}
            >
                {icon}
                <Typography variant="body1" classes={{root: classes.barLink}}>
                    <span>{text}</span>
                </Typography>
            </div>
        </Link>
    );
};
