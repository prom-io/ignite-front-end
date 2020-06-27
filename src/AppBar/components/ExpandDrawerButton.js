import React from 'react';
import { inject, observer } from 'mobx-react';
import { IconButton, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    iconButtonRoot: {
        [theme.breakpoints.down('sm')]: {
            padding: '0',
        },
    },
    avatarRoot: {
        [theme.breakpoints.down('sm')]: {
            width: '34px',
            height: '34px',
        },
    },
}));

const _ExpandDrawerButton = ({ setDrawerExpanded, currentUser }) => {
    const classes = useStyles();
    return (
        <IconButton onClick={() => setDrawerExpanded(true)} classes={{ root: classes.iconButtonRoot }} className="expand_drawer_button">
            <Avatar src={currentUser.avatar} classes={{ root: classes.avatarRoot }} />
        </IconButton>
    );
};

const mapMobxToProps = ({ drawer, authorization }) => ({
    setDrawerExpanded: drawer.setDrawerExpanded,
    currentUser: authorization.currentUser,
});

export const ExpandDrawerButton = inject(mapMobxToProps)(observer(_ExpandDrawerButton));
