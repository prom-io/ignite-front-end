import React from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { HashVerificationMode } from '../../stores';
import { useStore, useLocalization } from '../../../store/hooks';

const useStyles = makeStyles(theme => ({
    contentBlock: {
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
    },
    notes: {
        margin: '12px 0',
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
        marginTop: '24px',
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

export const ResetWithoutKey = observer(() => {
    const classes = useStyles();
    const { genericAuthorizationDialog, hashVerification } = useStore();
    const { l } = useLocalization();
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;
    const { setHashVerificationMode } = hashVerification;

    return (
        <DialogContent>
            <div className={classes.contentBlock}>
                {l('password-recovery.without-key')}
            </div>
            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button,
                }}
                onClick={() => setGenericAuthorizationDialogType('changePasswordWithHash')}
            >
                {l('sign-up.generate-hash-code')}
            </Button>
            <div
                className={classes.link}
                onClick={() => {
                    setHashVerificationMode(HashVerificationMode.RESET_PASSWORD);
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
});
