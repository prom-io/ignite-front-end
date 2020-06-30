import React from 'react';
import { inject, observer } from 'mobx-react';
import { IconButton, Typography, makeStyles } from '@material-ui/core';
import { CommentIcon } from '../../icons/CommentIcon';

const useStyles = makeStyles({
    styledIconButton: {
        margin: 0,
        padding: 0,
        borderRadius: 30,
        width: 34,
        height: 34,
        '&:hover': {
            background: 'rgba(255, 92, 1, 0.2)',
            borderRadius: 30,
        },
    },
    styledComponentContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 45,
        height: 20,
    },
});

const _CommentsButton = ({ status, setCreateStatusDialogOpen, setReferredStatus, setStatusReferenceType, currentUser, setGenericAuthorizationDialogOpen, setGenericAuthorizationDialogType }) => {
    const classes = useStyles();

    const handleClick = () => {
        if (!currentUser) {
            setGenericAuthorizationDialogOpen(true);
            setGenericAuthorizationDialogType('login');
            return;
        }

        setReferredStatus(status);
        setStatusReferenceType('COMMENT');
        setCreateStatusDialogOpen(true);
    };


    return (
        <div className={classes.styledComponentContainer}>
            <IconButton onClick={handleClick} className={classes.styledIconButton}>
                <CommentIcon />
            </IconButton>
            <Typography>
                {status.comments_count}
            </Typography>
        </div>
    );
};

const mapMobxToProps = ({ createStatus, authorization, genericAuthorizationDialog }) => ({
    currentUser: authorization.currentUser,
    setReferredStatus: createStatus.setReferredStatus,
    setStatusReferenceType: createStatus.setStatusReferenceType,
    setCreateStatusDialogOpen: createStatus.setCreateStatusDialogOpen,
    setGenericAuthorizationDialogOpen: genericAuthorizationDialog.setGenericAuthorizationDialogOpen,
    setGenericAuthorizationDialogType: genericAuthorizationDialog.setGenericAuthorizationDialogType,
});

export const CommentsButton = inject(mapMobxToProps)(observer(_CommentsButton));
