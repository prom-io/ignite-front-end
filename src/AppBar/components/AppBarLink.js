import React from 'react';
import { makeStyles, Typography, SvgIcon } from '@material-ui/core';
import { Link } from 'mobx-router';

const useStyles = makeStyles(theme => ({
    appBarLink: {
        textDecoration: 'none',
        display: 'flex',
        color: theme.palette.text.primary,
        marginRight: '20px',
    },
    appBarLinkActive: {
        textDecoration: 'none',
        display: 'flex',
        color: theme.palette.primary.main,
        marginRight: '20px',
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
                <Typography variant="body1" style={{ paddingLeft: '8px' }} className="nav-bar-link">
                    <span>{text}</span>
                </Typography>
            </div>
        </Link>
    );
};
