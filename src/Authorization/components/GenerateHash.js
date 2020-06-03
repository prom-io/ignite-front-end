import React, { useState } from 'react';
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
    button: {
        width: '187px',
        marginTop: 40,
        alignSelf: 'center',
    },
    checkbox: {
        marginTop: '30px',
    },
}));

export const GenerateHash = () => {
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

    return (
        <DialogContent classes={{
            root: classes.dialogContentRoot,
        }}
        >
            <InputPasswordGroup
                formValues={passwordForm}
                onValueChange={setFormValue}
                showPassword={showPassword}
                onShowPasswordChange={setShowPassword}
                title="Please create a password for your new account"
                formErrors={formErrors}
            />
            <KeyCopyBlock
                title="A hashcode for this password"
                disabled={!generatedHash}
            >
                {generatedHash || 'Hashcode not generated'}
            </KeyCopyBlock>
            <_Checkbox
                className={classes.checkbox}
                checked={hashCodeSaved}
                onChange={() => setHashCodeSaved(!hashCodeSaved)}
            >
                I have saved the hashcode to publish it later in a record in Ethereum blockchain
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
                Continue
            </Button>
        </DialogContent>
    );
};
