import React from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles, TextField } from '@material-ui/core';
import { useLocalization, useStore } from '../../../store/hooks';

const useStyles = makeStyles(() => ({
    dialogRoot: {
        margin: '24px 62px 40px 62px',
    },
    contentDescription: {
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#1C1C1C',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        width: '187px',
        marginTop: '40px',
        alignSelf: 'center',
    },
}));

export const ResetPassword = observer(() => {
    const classes = useStyles();
    const { l } = useLocalization();
    const { passwordChange, genericAuthorizationDialog } = useStore();
    const { setFormValue, formErrors, passwordChangeForm } = passwordChange;
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;
    const continueButtonDisabled = !(passwordChangeForm.walletAddress
        && passwordChangeForm.privateKey
        && !formErrors.walletAddress
        && !formErrors.privateKey
    );

    return (
        <DialogContent classes={{ root: classes.dialogRoot }}>
            <span className={classes.contentDescription}>
                To continue the password reset procedure, enter the Wallet address and the Password recovery key (Private key)
            </span>
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    label="Wallet Address"
                    value={passwordChangeForm.walletAddress}
                    onChange={event => setFormValue('walletAddress', event.target.value)}
                    error={Boolean(formErrors.walletAddress)}
                    helperText={formErrors.walletAddress && l(formErrors.walletAddress)}
                />
                <TextField
                    label="Private Key"
                    value={passwordChangeForm.privateKey}
                    onChange={event => setFormValue('privateKey', event.target.value)}
                    error={Boolean(formErrors.privateKey)}
                    helperText={formErrors.privateKey && l(formErrors.privateKey)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    classes={{
                        root: classes.button,
                    }}
                    disabled={continueButtonDisabled}
                    onClick={() => setGenericAuthorizationDialogType('changePassword')}
                >
                    Continue
                </Button>
            </form>
        </DialogContent>
    );
});
