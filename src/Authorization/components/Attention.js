import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Checkbox, DialogContent, makeStyles } from '@material-ui/core';
import { CopyToClipboardButton } from '../../CopyToClipboardButton/components';
import { useLocalization, useStore } from '../../store/hooks';

const useStyles = makeStyles(theme => ({
    dialogContentRoot: {
        display: 'flex',
        flexDirection: 'column',
    },
    contentDescription: {
        margin: '0',
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '20px',
        lineHeight: '26px',
        color: '#1C1C1C',
        '& span': {
            color: '#FF5C01',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
    },
    infoCheckingBlock: {
        margin: '16px 0 24px 0',
        borderBottom: '1px solid #F1EBE8',
    },
    markList: {
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '24px',
        '& span': {
            color: '#FF5C01',
        },
        '& ul': {
            padding: '0 16px',
            margin: 0,
            '& li': {
                margin: '8px 0',
            },
            '& li::marker': {
                color: '#A2A2A2',
            },
        },
    },
    checkboxBlock: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderTop: '1px solid #F1EBE8',
        padding: '12px 0 16px 0',
    },
    checkboxBlockDescription: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 15,
        marginLeft: 24,
        width: '90%'
    },
    checkboxTitle: {
        display: 'flex',
        alignItems: 'flex-start',
        width: '90%',
    },
    title: {
        fontFamily: 'Museo Sans Cyrl Bold',
    },
    value: {
        maxWidth: '390px',
        marginTop: 8,
        overflowWrap: 'break-word',
        fontFamily: 'Museo Sans Cyrl Regular',
        [theme.breakpoints.down('sm')]: {
            width: '84%'
        },
    },
    button: {
        width: '187px',
        marginTop: 40,
        alignSelf: 'center',
    },
    checkbox: {
        padding: 0,
        height: 'fit-content',
    },
}));

const makeSureYouReallySavedTranslations = {
    en: (classes) => (
        <p className={classes.contentDescription}>
            Make sure you
            {' '}
            <span>really</span>
            {' '}
            saved this info:
        </p>
    ),
    ko: (classes) => (
        <p className={classes.contentDescription}>
            다음 정보를
            {' '}
            <span>저장</span>
            {' '}
            했는지 확인하십시오
        </p>
    ),
};

const makeOneHundredPercentSureTranslations = {
    en: () => (
        <>
            Make
            {' '}
            <span>100%</span>
            {' '}
            sure that you really saved all this info in a safe place
        </>
    ),
    ko: () => (
        <>
            이 모든 정보를 안전한 곳에 저장했는지
            <span> 100%</span>
            {' '}
            확인해주세요
        </>
    ),
};

const privateKeyLossTranslations = {
    en: () => (
        <>
            If you lose your Private Key, you will
            {' '}
            <span>never</span>
            {' '}
            recover the password
        </>
    ),
    ko: () => (
        <>
            개인 키를 잃어버리면
            {' '}
            <span>절대</span>
            {' '}
            비밀번호를 복구할 수 없다.
        </>
    ),
};

export const Attention = observer(() => {
    const classes = useStyles();
    const { walletGeneration, signUp, genericAuthorizationDialog } = useStore();
    const { l, locale } = useLocalization();
    const { generatedWallet } = walletGeneration;
    const { signUpForm, submissionError } = signUp;
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;

    const [addressCopied, setAddressCopied] = useState(false);
    const [privateKeyCopied, setPrivateKeyCopied] = useState(false);
    const [passwordCopied, setPasswordCopied] = useState(false);

    const handleOkClick = () => {
        if (submissionError) {
            setGenericAuthorizationDialogType('errorAuthorization');
        } else {
            setGenericAuthorizationDialogType('welcome');
        }
    };

    return (
        <DialogContent classes={{
            root: classes.dialogContentRoot,
        }}
        >
            {makeSureYouReallySavedTranslations[locale](classes)}
            <div className={classes.infoCheckingBlock}>
                <div className={classes.checkboxBlock}>
                    <div className={classes.checkboxTitle}>
                        <Checkbox
                            color="primary"
                            classes={{ root: classes.checkbox }}
                            checked={addressCopied}
                            onChange={() => setAddressCopied(!addressCopied)}
                        />
                        <div className={classes.checkboxBlockDescription}>
                            <span className={classes.title}>{l('sign-up.wallet-address')}</span>
                            <span className={classes.value}>{generatedWallet.address}</span>
                        </div>
                    </div>
                    <span>
                        <CopyToClipboardButton textToCopy={generatedWallet.address} />
                    </span>
                </div>
                <div className={classes.checkboxBlock}>
                    <div className={classes.checkboxTitle}>
                        <Checkbox
                            color="primary"
                            classes={{ root: classes.checkbox }}
                            checked={privateKeyCopied}
                            onChange={() => setPrivateKeyCopied(!privateKeyCopied)}
                        />
                        <div className={classes.checkboxBlockDescription}>
                            <span className={classes.title}>{l('sign-up.private-key')}</span>
                            <span className={classes.value}>{generatedWallet.privateKey}</span>
                        </div>
                    </div>
                    <span>
                        <CopyToClipboardButton textToCopy={generatedWallet.privateKey} />
                    </span>
                </div>
                <div className={classes.checkboxBlock}>
                    <div className={classes.checkboxTitle}>
                        <Checkbox
                            color="primary"
                            classes={{ root: classes.checkbox }}
                            checked={passwordCopied}
                            onChange={() => setPasswordCopied(!passwordCopied)}
                        />
                        <div className={classes.checkboxBlockDescription}>
                            <span className={classes.title}>Password</span>
                            <span className={classes.value}>{signUpForm.password}</span>
                        </div>
                    </div>
                    <span>
                        <CopyToClipboardButton textToCopy={signUpForm.password} />
                    </span>
                </div>
            </div>
            <div className={classes.markList}>
                <p className={classes.contentDescription}>
                    {l('sign-up.please-do-not-lose it')}
                </p>
                <ul>
                    <li>
                        {makeOneHundredPercentSureTranslations[locale]()}
                    </li>
                    <li>{l('sign-up.password-change')}</li>
                    <li>
                        {privateKeyLossTranslations[locale]()}
                    </li>
                </ul>
            </div>

            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button,
                }}
                disabled={!passwordCopied || !privateKeyCopied || !addressCopied}
                onClick={handleOkClick}
            >
                {l('sign-up.ok')}
            </Button>
        </DialogContent>
    );
});
