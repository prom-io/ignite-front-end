import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, CircularProgress, DialogContent, makeStyles, useTheme } from '@material-ui/core';
import { FadeLoader } from 'react-spinners';
import { InputPasswordGroup } from './InputPasswordGroup';
import { KeyCopyBlock } from './KeyCopyBlock';
import { _Checkbox } from './_Checkbox';
import { useLocalization, useStore } from '../../store/hooks';

const useStyles = makeStyles(theme => ({
    dialogContentRoot: {
        display: 'flex',
        flexDirection: 'column',
    },
    contentDescription: {
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#1C1C1C',
        '& a': {
            color: '#FF5C01',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
    },
    loginInput: {
        display: 'flex',
        maxWidth: '375px',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    button: {
        width: '187px',
        marginTop: 25,
        alignSelf: 'center',
    },
    content: {
        margin: '30px 0 12px 0',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#1C1C1C',
    },
}));

const walletGenerationSuccessTranslations = {
    en: (classes) => (
        <span className={classes.contentDescription}>
            Your blockchain wallet and private key were successfully created.
            <br />
            <a>Please save</a>
            {' '}
            the wallet address and private key and keep them in a safe place.
        </span>
    ),
    kr: (classes) => (
        <span className={classes.contentDescription}>
            당신의 블록체인 지갑과 개인 키가 성공적으로 만들어졌다.
            <br />
            <a> 지갑 주소</a>
            와 개인 키를 저장하여 안전한 곳에 보관하십시오.
        </span>
    ),
};

const termsOfServiceAgreementTranslations = {
    en: () => (
        <span>
            I am over 16 years old and have read and understood the
            {' '}
            <a href="/terms-and-policy" target="_blank" rel="noreferrer noopener">Terms of Use</a>
            {' '}
            and
            {' '}
            <a href="/terms-and-policy">Privacy Policy</a>
            .
        </span>
    ),
    kr: () => (
        <>
            나는 16살이 넘었고
            <a href="/terms-and-policy" target="_blank" rel="noreferrer noopener">의 사용 약관</a>
            {' '}
            과
            <a href="/terms-and-policy">개인정보 보호정책</a>
            을 읽고 이해했다.
        </>
    ),
};

export const CreateWallet = observer(() => {
    const [savedEverything, setSavedEverything] = useState(false);
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const { l, locale } = useLocalization();
    const { signUp, walletGeneration, genericAuthorizationDialog } = useStore();
    const {
        signUpForm,
        formErrors,
        setFormValue,
        showPassword,
        setShowPassword,
        pending,
        doSignUp,
    } = signUp;
    const { generatedWallet } = walletGeneration;
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;

    const signUpButtonDisabled = (!agreedToPolicy || !savedEverything) || pending;

    return (
        <DialogContent classes={{
            root: classes.dialogContentRoot,
        }}
        >
            {walletGenerationSuccessTranslations[locale](classes)}
            <KeyCopyBlock
                title={l('sign-up.wallet-address')}
                textToCopy={generatedWallet.address}
            >
                {generatedWallet.address}
            </KeyCopyBlock>
            <InputPasswordGroup
                formValues={signUpForm}
                onValueChange={setFormValue}
                formErrors={formErrors}
                showPassword={showPassword}
                onShowPasswordChange={setShowPassword}
                title={l('sign-up.password')}
            />
            <KeyCopyBlock
                title={l('sign-up.private-key')}
                textToCopy={generatedWallet.privateKey}
            >
                {generatedWallet.privateKey}
            </KeyCopyBlock>
            <p className={classes.content}>
                {l('sign-up.we-believe')}
            </p>
            <_Checkbox
                checked={savedEverything}
                onChange={() => setSavedEverything(!savedEverything)}
            >
                {l('sign-up.confirmation.private-key-saved')}
            </_Checkbox>
            <_Checkbox
                checked={agreedToPolicy}
                onChange={() => setAgreedToPolicy(!agreedToPolicy)}
            >
                {termsOfServiceAgreementTranslations[locale]()}
            </_Checkbox>
            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button,
                }}
                disabled={signUpButtonDisabled}
                onClick={ () => {
                    setGenericAuthorizationDialogType('createWalletPreload');
                    doSignUp();
                }}
            >
                {pending && <FadeLoader color={theme.palette.primary.main} css="position: absolute; transform: scale(0.4); top: -4px; left: 74px" />}
                {l('sign-up')}
            </Button>
        </DialogContent>
    );
});
