import React from 'react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { useStore } from '../../store/hooks';

const useStyles = makeStyles(() => ({
    contentDescription: {
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#1C1C1C',
        '& a': {
            color: '#FF5C01',
            cursor: 'pointer',
            fontFamily: 'Museo Sans Cyrl Bold',
        },
    },
    contentBlock: {
        display: 'flex',
        flexDirection: 'column',
        borderTop: '1px solid #F1EBE8',
        marginTop: '16px',
        paddingTop: '24px',
        fontFamily: 'Museo Sans Cyrl Regular',
        '& p': {
            margin: 0,
            fontFamily: 'Museo Sans Cyrl Bold',
            fontSize: '20px',
            lineHeight: '18px',
        },
        '& span': {
            marginTop: 8,
            fontSize: '15px',
        },
    },
    notes: {
        marginTop: '32px',
        color: '#A2A2A2',
        fontFamily: 'Museo Sans Cyrl Regular',
        lineHeight: '26px',
        '& a': {
            color: '#FF5C01',
            cursor: 'pointer',
            fontFamily: 'Museo Sans Cyrl Bold',
        },
    },
    button: {
        width: '187px',
        marginTop: 20,
    },
}));

export const Welcome = () => {
    const classes = useStyles();
    const { genericAuthorizationDialog, walletGeneration } = useStore();
    const { setGenericAuthorizationDialogOpen } = genericAuthorizationDialog;
    const { generatedWallet } = walletGeneration;

    return (
        <DialogContent>
            <span className={classes.contentDescription}>
                Wow! You have just signed up to Ignite: the most exciting decentralized social network in the world!
            </span>

            <div className={classes.contentBlock}>
                <p>Your login is:</p>
                <span>{generatedWallet.address}</span>
            </div>

            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button,
                }}
                onClick={() => setGenericAuthorizationDialogOpen(false)}
            >
                Enjoy
            </Button>

            <div className={classes.notes}>
                <a>Note:</a>
                {' '}
                We created this network because we believe that every word is worth to be heard. That means Ignite does not control or censor anything you can publish or see here.
                If you don't like something, you will have options to unfollow, block or mute that person. However, please do not expect that we will ban somebody whose opinion you hate. For this option please consider Hezbollah or Facebook. Our Report abuse option is intended for emergency situations.
            </div>
        </DialogContent>
    );
};
