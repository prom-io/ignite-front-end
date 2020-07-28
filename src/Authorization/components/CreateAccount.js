import React from 'react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { HashVerificationMode } from '../stores';
import { useLocalization, useStore } from '../../store/hooks';

const useStyles = makeStyles(theme => ({
    contentDescription: {
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '20px',
        lineHeight: '24px',
        color: '#1C1C1C',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
    },
    contentBlock: {
        margin: '16px 0 24px 0',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            marginTop: '12px 0 24px 0',
        },
    },
    notes: {
        marginTop: '12px',
        color: '#A2A2A2',
        fontSize: '15px',
        fontFamily: 'Museo Sans Cyrl Regular',
        lineHeight: '26px',
        '& a': {
            color: '#FF5C01',
            cursor: 'pointer',
            fontFamily: 'Museo Sans Cyrl Bold',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
    },
    button: {
        width: '187px',
    },
    link: {
        marginTop: '30px',
        color: '#FF5C01',
        textDecoration: 'underline',
        cursor: 'pointer',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '18px',
    },
}));

export const CreateAccount = () => {
    const classes = useStyles();
    const { genericAuthorizationDialog, hashVerification } = useStore();
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;
    const { setHashVerificationMode } = hashVerification;
    const { l } = useLocalization();

    return (
        <DialogContent>
            <span className={classes.contentDescription}>
                {l('sign-up.use-existing-wallet')}
            </span>
            <div className={classes.contentBlock}>
                {l('sign-up.use-existing-wallet.explained')}
            </div>
            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button,
                }}
                onClick={() => setGenericAuthorizationDialogType('generateHash')}
            >
                {l('sign-up.generate-hash-code')}
            </Button>
            <div
                className={classes.link}
                onClick={() => {
                    setHashVerificationMode(HashVerificationMode.SIGN_UP);
                    setGenericAuthorizationDialogType('verifyHash');
                }}
            >
                {l('password-recovery.own-hash-code')}
            </div>
            <div className={classes.notes}>
                <a>
                    {l('sign-up.note')}
                    :
                </a>
                {' '}
                {l('password-recovery.hash-code.description')}
            </div>
        </DialogContent>
    );
};
