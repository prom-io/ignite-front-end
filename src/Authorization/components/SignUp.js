import React from 'react';
import { observer } from 'mobx-react';
import { FadeLoader } from 'react-spinners';
import { Button, DialogContent, useTheme } from '@material-ui/core';

import { useLocalization, useStore } from '../../store/hooks';
import {authorizationDialogsStyles} from '../../styles/material/authorizationDialogsStyles'

const igniteDescriptionTranslations = {
    en: (classes) => (
        <span className={classes.content}>
            <a>Ignite </a>
            {' '}
            is a decentralized social network, based on blockchain technology.
            You have to use a special ID named
            {' '}
            <a>blockchain wallet address</a>
            {' '}
            to sign up.
        </span>
    ),
    kr: (classes) => (
        <span className={classes.content}>
            <a>Ignite </a>
            는 블록체인 기술을 기반으로 한 분산형 소셜 네트워크다. 가입하려면
            <a>블록체인 지갑주소 라는</a>
            {' '}
            특수 아이디를 사용해야 합니다
        </span>
    ),
};

const useExistingWalletTranslations = {
    en: () => (
        <span>
            Use an existing wallet
            <br />
            (for advanced users only)
        </span>
    ),
    kr: () => (
        <span>
            기존 지갑 사용
            <br />
            (고급 사용자 전용)
        </span>
    ),
};

export const SignUp = observer(() => {
    const classes = authorizationDialogsStyles();
    const theme = useTheme();
    const { walletGeneration, genericAuthorizationDialog } = useStore();
    const { generateWallet, pending } = walletGeneration;
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;
    const { l, locale } = useLocalization();

    return (
        <DialogContent>
            {igniteDescriptionTranslations[locale](classes)}
            <div className={classes.contentBlock}>
                <div>
                    <p>{l('sign-up.options.recommended-option')}</p>
                    <span>{l('sign-up.options.new-wallet')}</span>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    classes={{
                        root: classes.button,
                    }}
                    onClick={generateWallet}
                    disabled={pending}
                >
                    {pending && <FadeLoader color={theme.palette.primary.main} css="position: absolute; transform: scale(0.5); top: -2px; left: 74px" />}
                    {l('sign-up.create-wallet')}
                </Button>
            </div>
            <div className={classes.contentBlock}>
                <div>
                    {useExistingWalletTranslations[locale]()}
                </div>
                <Button
                    variant="outlined"
                    color="primary"
                    classes={{
                        root: classes.button,
                    }}
                    onClick={() => setGenericAuthorizationDialogType('createAccount')}
                >
                    {l('sign-up.use-own-wallet')}
                </Button>
            </div>
            <div className={classes.notes}>
                <a>
                    {l('sign-up.note')}
                    :
                </a>
                {' '}
                {l('sign-up.options.use-existing-wallet.note')}
            </div>
        </DialogContent>
    );
});
