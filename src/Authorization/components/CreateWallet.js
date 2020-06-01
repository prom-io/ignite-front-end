import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { InputPasswordGroup } from './InputPasswordGroup';
import { KeyCopyBlock } from './KeyCopyBlock';
import { _Checkbox } from './_Checkbox';
import { useStore } from '../../store/hooks';

const useStyles = makeStyles(() => ({
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
        marginTop: 40,
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

export const CreateWallet = observer(() => {
    const [savedEverything, setSavedEverything] = useState(false);
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const classes = useStyles();
    const { signUp, walletGeneration } = useStore();
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

    const signUpButtonDisabled = (!agreedToPolicy || !savedEverything) || pending;

    return (
        <DialogContent classes={{
            root: classes.dialogContentRoot,
        }}
        >
            <span className={classes.contentDescription}>
                Your blockchain wallet and private key were successfully created.
                <br />
                <a>Please save</a>
                {' '}
                the wallet address and private key and keep them in a safe place.
            </span>
            <KeyCopyBlock
                title="Wallet Address (login)"
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
                title="Password"
            />
            <KeyCopyBlock
                title="Private Key (password recovery key)"
                textToCopy={generatedWallet.privateKey}
            >
                {generatedWallet.privateKey}
            </KeyCopyBlock>
            <p className={classes.content}>
                We believe that privacy is a personal right so do not ask for your email or any personal information.
                However, that makes us unable to recover the password if you lose your private key.
            </p>
            <_Checkbox
                checked={savedEverything}
                onChange={() => setSavedEverything(!savedEverything)}
            >
                I have saved my Wallet Address(login), password and Private Key (password recovery key).
            </_Checkbox>
            <_Checkbox
                checked={agreedToPolicy}
                onChange={() => setAgreedToPolicy(!agreedToPolicy)}
            >
                I am over 16 years old and have read and understood the Terms of Use and Privacy Policy.
            </_Checkbox>
            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button,
                }}
                disabled={signUpButtonDisabled}
                onClick={doSignUp}
            >
                Sign up
            </Button>
        </DialogContent>
    );
});
