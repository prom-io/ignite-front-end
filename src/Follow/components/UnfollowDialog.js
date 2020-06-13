import React from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
    makeStyles,
} from '@material-ui/core';

import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    unfollowDialog: {
        maxWidth: '291px',
        padding: '52px 32px',
    },
    unfollowDialogTitle: {
        marginBottom: '24px',
        padding: 0,

        '& h2': {
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '24px',
            color: theme.palette.text.main,
            marginBottom: 0,
        },
    },
    unfollowDialogContent: {
        marginBottom: '24px',
        padding: 0,

        '& p': {
            margin: 0,
            fontWeight: 300,
            fontSize: '15px',
            lineHeight: '26px',
            color: theme.palette.text.main,
        },
    },
    dialogActionsButton: {
        justifyContent: 'space-between',
        padding: 0,

        '& button': {
            height: '40px',
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: '18px',
            borderRadius: 30,
        },

        '& button:first-child': {
            width: '124px',
            background: 'transparent',
            border: `1px solid ${theme.palette.primary.main}`,
            color: theme.palette.primary.main,
            [theme.breakpoints.down('sm')]: {
                marginRight: '8px',
            },
        },

        '& button:last-child': {
            width: '146px',
            background: theme.palette.primary.main,
            border: 'none',
            color: '#fff',
            marginLeft: 0,
        },
    },
    dialogPaper: {
        margin: '15px',
    },
}));

const _UnfollowDialog = ({
    username,
    unfollowAction,
    unfollowDialogOpen,
    setUnfollowDialogOpen,
    l,
}) => {
    const classes = useStyles();

    return (
        <Dialog
            open={unfollowDialogOpen}
            onClose={() => setUnfollowDialogOpen(false)}
            classes={{
                paper: classes.dialogPaper,
            }}
        >
            <div className={classes.unfollowDialog}>
                <DialogTitle className={classes.unfollowDialogTitle}>
                    {l('user.profile.follow')}
                    {' '}
                    @
                    {username}
                    ?
                </DialogTitle>
                <DialogContent className={classes.unfollowDialogContent}>
                    <DialogContentText>
                        {l('unfollow.dialog.warning')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogActionsButton}>
                    <Button
                        variant="text"
                        className={classes.cancelButton}
                        onClick={() => {
                            setUnfollowDialogOpen(false);
                        }}
                        autoFocus
                    >
                        {l('user.profile.cancel')}
                    </Button>
                    <Button
                        variant="text"
                        className={classes.unfollowButton}
                        onClick={unfollowAction}
                    >
                        {l('user.profile.unfollow')}
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

export const UnfollowDialog = localized(_UnfollowDialog);
