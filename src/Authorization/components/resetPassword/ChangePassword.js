import React from 'react';
import { observer } from 'mobx-react';
import { Button, CircularProgress, DialogContent, makeStyles } from '@material-ui/core';
import { InputPasswordGroup } from '../InputPasswordGroup';
import { useStore } from '../../../store/hooks';

const useStyles = makeStyles(() => ({
    dialogRoot: {
        margin: '24px 62px 40px 62px',
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        width: '187px',
        alignSelf: 'center',
        marginTop: '40px',
    },
    titleBold: {
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '15px',
        lineHeight: '26px',
    },
}));

export const ChangePassword = observer(() => {
    const classes = useStyles();
    const { passwordChange } = useStore();
    const {
        passwordChangeForm,
        formErrors,
        setFormValue,
        showPassword,
        setShowPassword,
        pending,
        changePassword,
    } = passwordChange;

    return (
        <DialogContent classes={{ root: classes.dialogRoot }}>
            <span className={classes.titleBold}>Set a new password for your Ignite account</span>
            <InputPasswordGroup
                title="Password"
                formValues={passwordChangeForm}
                onValueChange={setFormValue}
                formErrors={formErrors}
                showPassword={showPassword}
                onShowPasswordChange={setShowPassword}
            />
            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button,
                }}
                disabled={pending}
                onClick={changePassword}
            >
                {pending && <CircularProgress size={25} color="primary" />}
                Continue
            </Button>
        </DialogContent>
    );
});
