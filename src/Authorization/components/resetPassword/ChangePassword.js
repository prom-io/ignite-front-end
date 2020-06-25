import React from 'react';
import { observer } from 'mobx-react';
import { Button, CircularProgress, DialogContent, makeStyles } from '@material-ui/core';
import { InputPasswordGroup } from '../InputPasswordGroup';
import { useStore, useLocalization } from '../../../store/hooks';
import Loader from '../../../components/Loader';

const useStyles = makeStyles(() => ({
    dialogRoot: {
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
    const { l } = useLocalization();
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
            <span className={classes.titleBold}>{l('authorization.set-new-password')}</span>
            <InputPasswordGroup
                title={l('sign-up.password')}
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
                {pending && <Loader size="md" css="position: absolute; transform: scale(0.5); top: -2px; left: 74px" />}
                {l('sign-up.continue')}
            </Button>
        </DialogContent>
    );
});
