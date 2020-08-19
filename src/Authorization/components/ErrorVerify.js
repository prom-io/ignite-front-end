import React from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent } from '@material-ui/core';
import { useStore, useLocalization } from '../../store/hooks';
import {authorizationDialogsStyles} from '../../styles/material/authorizationDialogsStyles'

const errorTranslations = {
    en: (classes) => (
        <div className={classes.contentDescription}>
            Error occurred when tried to extract wallet address and/or password hash from transaction. Please contact us on
            {' '}
            <a onClick={() => window.open('http://ignite.so/')}>Ignite.so</a>
            {' '}
            or
            {' '}
            <a onClick={() => window.open('http://prometeus.so/')}>Prometeus.io</a>
            .
        </div>
    ),
    kr: (classes) => (
        <div className={classes.contentDescription}>
            Error occurred when tried to extract wallet address and/or password hash from transaction. Please contact us on
            <a onClick={() => window.open('http://ignite.so/')}>Ignite.so</a>
            {' '}
            or
            {' '}
            <a onClick={() => window.open('http://prometeus.so/')}>Prometeus.io</a>
            .
        </div>
    ),
};

export const ErrorVerify = observer(() => {
    const classes = authorizationDialogsStyles();
    const { hashVerification, genericAuthorizationDialog } = useStore();
    const { l, locale } = useLocalization();
    const { transactionId, error } = hashVerification;
    const { setGenericAuthorizationDialogOpen } = genericAuthorizationDialog;

    return (
        <DialogContent>
            {errorTranslations[locale](classes)}
            <div className={classes.content}>
                <div className={classes.contentBlock}>
                    <p>{l('your-transaction-id')}</p>
                    <span>{transactionId}</span>
                </div>
                {error && error.wallet_address && (
                    <div className={classes.contentBlock}>
                        <p>{l('your-wallet-address')}</p>
                        <span>{error.wallet_address}</span>
                    </div>
                )}
                {error && error.hash && (
                    <div className={classes.contentBlock}>
                        <p>{l('your-hash-code')}</p>
                        <span>{error.hash}</span>
                    </div>
                )}
            </div>
            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button,
                }}
                onClick={() => setGenericAuthorizationDialogOpen(false)}
            >
                {l('sign-up.ok')}
            </Button>
        </DialogContent>
    );
});
