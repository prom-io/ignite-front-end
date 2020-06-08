import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { InputPasswordGroup } from './InputPasswordGroup';
import { KeyCopyBlock } from './KeyCopyBlock';
import { _Checkbox } from './_Checkbox';
import { useLocalization, useStore } from '../../store/hooks';

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
}));

export const GenerateHash = observer(() => {
    const classes = useStyles();
    const [hashCodeSaved, setHashCodeSaved] = useState(false);
    const { hashGeneration, genericAuthorizationDialog } = useStore();
    const {
        setFormValue,
        passwordForm,
        formErrors,
        generatedHash,
        showPassword,
        setShowPassword,
    } = hashGeneration;
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;
    const { l } = useLocalization();

    return (
        <DialogContent classes={{
            root: classes.dialogContentRoot,
        }}
        >
            <InputPasswordGroup
                formValues={passwordForm}
                onValueChange={setFormValue}
                formErrors={formErrors}
                showPassword={showPassword}
                onShowPasswordChange={setShowPassword}
                title={l('sign-up.create-password')}
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
                onClick={() => setGenericAuthorizationDialogType('verifyHash')}
            >
                {l('sign-up.continue')}
            </Button>
        </DialogContent>
    );
});
