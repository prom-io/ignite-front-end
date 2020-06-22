import React from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles, useTheme } from '@material-ui/core';
import { useLocalization, useStore } from '../../store/hooks';
import { FadeLoader } from 'react-spinners';

const useStyles = makeStyles(() => ({
    contentDescription: {
        fontFamily: 'Museo Sans Cyrl Regular',
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
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid #F1EBE8',
      marginTop: '32px',
      paddingTop: '32px',
      fontFamily: 'Museo Sans Cyrl Regular',
        '&>div': {
            width: '234px',
        },
        '& p': {
            margin: 0,
            fontSize: '20px',
        },
        '& span': {
            fontSize: '15px',
            fontFamily: 'Museo Sans Cyrl Bold',
        },
    },
    notes: {
        marginTop: '12px',
        color: '#A2A2A2',
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
    },
}));

const igniteDescriptionTranslations = {
    en: (classes) => (
        <span className={classes.contentDescription}>
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
    ko: (classes) => (
        <span className={classes.contentDescription}>
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
    ko: () => (
        <span>
            기존 지갑 사용
            <br />
            (고급 사용자 전용)
        </span>
    ),
};

export const SignUp = observer(() => {
    const classes = useStyles();
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
                    {l('sign-up.options.new-wallet')}
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
