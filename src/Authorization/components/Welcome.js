import React from 'react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { useLocalization, useStore } from '../../store/hooks';

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
        fontSize: '15px',
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
    const { l } = useLocalization();
    const { genericAuthorizationDialog, walletGeneration, hashVerification } = useStore();
    const { setGenericAuthorizationDialogOpen } = genericAuthorizationDialog;
    const { generatedWallet } = walletGeneration;
    const { createdUser } = hashVerification;

    let walletAddress;

    if (generatedWallet) {
        walletAddress = generatedWallet.address;
    } else if (createdUser) {
        walletAddress = createdUser.id;
    }

    return (
        <DialogContent>
            <span className={classes.contentDescription}>
                {l('sign-up.success')}
            </span>
            <div className={classes.contentBlock}>
                <p>
                    {l('sign-up.your-login-is')}
                    :
                </p>
                {walletAddress && walletAddress}
            </div>
            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button,
                }}
                onClick={() => setGenericAuthorizationDialogOpen(false)}
            >
                {l('sign-up.enjoy')}
            </Button>

            <div className={classes.notes}>
                <a>
                    {l('sign-up.note')}
                    :
                </a>
                {' '}
                {l('sign-up.no-bans')}
            </div>
        </DialogContent>
    );
};
