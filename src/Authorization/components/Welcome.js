import React from 'react';
import { Button, DialogContent } from '@material-ui/core';
import { useLocalization, useStore } from '../../store/hooks';
import {authorizationDialogsStyles} from '../../styles/material/authorizationDialogsStyles'

export const Welcome = () => {
    const classes = authorizationDialogsStyles();
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
