import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { InputPasswordGroup } from '../InputPasswordGroup';
import { KeyCopyBlock } from '../KeyCopyBlock';
import { _Checkbox } from '../_Checkbox';
import { useStore, useLocalization } from '../../../store/hooks';
import { HashVerificationMode } from '../../stores';

const useStyles = makeStyles(() => ({
    dialogContentRoot: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        width: '187px',
        marginTop: 40,
        alignSelf: 'center',
    },
    checkbox: {
        marginTop: '30px',
    },
    descriptionBold: {
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '15px',
    },
}));

export const ChangePasswordWithHash = observer(() => {
    const classes = useStyles();
    const [hashCodeSaved, setHashCodeSaved] = useState(false);
    const { l } = useLocalization();
    const { hashGeneration, hashVerification, genericAuthorizationDialog } = useStore();
    const {
        passwordForm,
        formErrors,
        showPassword,
        setFormValue,
        setShowPassword,
        generatedHash,
    } = hashGeneration;
    const { setHashVerificationMode } = hashVerification;
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;

    return (
        <DialogContent classes={{
            root: classes.dialogContentRoot,
        }}
        >
            <span className={classes.descriptionBold}>{l('authorization.set-new-password')}</span>
            <InputPasswordGroup
                formValues={passwordForm}
                formErrors={formErrors}
                onValueChange={setFormValue}
                showPassword={showPassword}
                onShowPasswordChange={setShowPassword}
                title={l('sign-up.password')}
            />
            <KeyCopyBlock
                title={l('sign-up.hash-code')}
                disabled={!generatedHash}
            >
                {generatedHash || l('sign-up.hashcode.not-generated')}
            </KeyCopyBlock>
            <_Checkbox
                className={classes.checkbox}
                checked={hashCodeSaved}
                onChange={() => setHashCodeSaved(!hashCodeSaved)}
            >
                {l('sign-up.hash-code.saved')}
            </_Checkbox>
            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button,
                }}
                disabled={!hashCodeSaved}
                onClick={() => {
                    setHashVerificationMode(HashVerificationMode.RESET_PASSWORD);
                    setGenericAuthorizationDialogType('verifyHash');
                }}
            >
                {l('sign-up.continue')}
            </Button>
        </DialogContent>
    );
});
