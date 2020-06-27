import React from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useStore, useLocalization } from '../../../store/hooks';

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
        },
    },
    contentBlock: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '24px',
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
    descriptionBold: {
        margin: '16px 0',
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '15px',
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
    },
    button: {
        width: '187px',
        marginTop: '20px',
    },
}));

const errorTranslations = {
    en: (classes) => (
        <div className={classes.contentDescription}>
            Something seems to go wrong…  Please contact us on
            {' '}
            <a onClick={() => window.open('http://ignite.so/')}>Ignite.so</a>
            {' '}
            or
            {' '}
            <a onClick={() => window.open('http://prometeus.so/')}>Prometeus.io</a>
            . We’ll do our best to fix the problem.
        </div>
    ),
    ko: (classes) => (
        <div className={classes.contentDescription}>
            뭔가 잘못 된 것 같아요… 연락주세요
            {' '}
            <a onClick={() => window.open('http://ignite.so/')}>Ignite.so</a>
            {' '}
            아니면
            {' '}
            <a onClick={() => window.open('http://prometeus.so/')}>Prometeus.io</a>
            . 우리는 최선을 다해 문제를 해결하겠습니다
        </div>
    ),
};

export const PasswordUpdatedError = observer(() => {
    const classes = useStyles();
    const { passwordChange, genericAuthorizationDialog } = useStore();
    const { locale, l } = useLocalization();
    const { passwordChangeForm } = passwordChange;
    const { setGenericAuthorizationDialogOpen } = genericAuthorizationDialog;

    return (
        <DialogContent>
            {errorTranslations[locale](classes)}
            <div className={classes.contentBlock}>
                <p>{l('sign-up.your-login-is')}</p>
                <span>{passwordChangeForm.walletAddress}</span>
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
            <div className={classes.notes}>
                <a>{l('sign-up.note')}</a>
                {' '}
                {l('sign-up.keep-your-login')}
            </div>
            <div className={classes.descriptionBold}>
                {l('sign-up.sorry')}
            </div>
        </DialogContent>
    );
});
