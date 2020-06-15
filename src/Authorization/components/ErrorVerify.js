import React from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { useStore } from '../../store/hooks';

const useStyles = makeStyles(() => ({
    contentDescription: {
        paddingBottom: '16px',
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#1C1C1C',
        borderBottom: '1px solid #F1EBE8',
        '& a': {
            textDecoration: 'underline',
            cursor: 'pointer',
            fontFamily: 'Museo Sans Cyrl Bold',
        },
    },
    contentBlock: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '16px',
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
    button: {
        width: '187px',
    },
    content: {
        margin: '24px 0 40px 0',
    },
}));

export const ErrorVerify = observer(() => {
    const classes = useStyles();
    const { hashVerification, genericAuthorizationDialog } = useStore();
    const { transactionId, error } = hashVerification;
    const { setGenericAuthorizationDialogOpen } = genericAuthorizationDialog;

    return (
        <DialogContent>
            <div className={classes.contentDescription}>
                Error occurred when tried to extract wallet address and/or password hash from transaction. Please contact us on
                <a onClick={() => window.open('http://ignite.so/')}>Ignite.so</a>
                {' '}
                or
                <a onClick={() => window.open('http://prometeus.so/')}>Prometeus.io</a>
                .
            </div>

            <div className={classes.content}>
                <div className={classes.contentBlock}>
                    <p>Your Tx Id is</p>
                    <span>{transactionId}</span>
                </div>
                {error && error.wallet_address && (
                    <div className={classes.contentBlock}>
                        <p>Your Wallet Address is</p>
                        <span>{error.wallet_address}</span>
                    </div>
                )}
                {error && error.hash && (
                    <div className={classes.contentBlock}>
                        <p>Your Hashcode is</p>
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
                Enjoy
            </Button>
        </DialogContent>
    );
});
