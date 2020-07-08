import React from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { useStore, useLocalization } from '../../store/hooks';

const useStyles = makeStyles(theme => ({
    contentDescription: {
        paddingBottom: '16px',
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#1C1C1C',
        borderBottom: '1px solid #F1EBE8',
        '& a': {
            textDecoration: 'underline',
          
            fontFamily: 'Museo Sans Cyrl Bold',
        },
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
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
      [theme.breakpoints.down('sm')]: {
        '& span': {
          fontSize: '14px',
          wordBreak: 'break-all',
        },
        marginTop: '12px',
      },
    },
    button: {
        width: '187px',
    },
    content: {
        margin: '24px 0 40px 0',
    },
}));

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
    const classes = useStyles();
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
