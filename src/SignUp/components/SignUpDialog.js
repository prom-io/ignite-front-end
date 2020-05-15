import React from 'react';
import { inject, observer } from 'mobx-react';
import {
    Dialog,
    DialogContent,
    Button,
    withMobileDialog,
    makeStyles,
    TextField,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import { withSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    signUpFormContent: {
        padding: 10,
    },
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
        fontFamily: 'Museo Sans Cyrl',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '20px',
        lineHeight: '24px',
        textAlign: 'center',
        color: '#1C1C1C',
    },
    signUpDialogButton: {
        maxWidth: 374,
        marginTop: 20,
        borderRadius: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
        height: '40px',
        fontFamily: 'Museo Sans Cyrl',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '15px',
    },
    loginButton: {
        maxWidth: 374,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
    privateBetaText: {
        marginTop: theme.spacing(1),
    },
}));

const _SignUpDialog = ({
    signUpForm,
    signUpFormErrors,
    pending,
    signUpDialogOpen,
    submissionError,
    fullScreen,
    showSnackbar,
    signUp,
    setFormValue,
    setShowSnackbar,
    setSignUpDialogOpen,
    enqueueSnackbar,
    onLoginButtonClick,
}) => {
    const classes = useStyles();

    const handleLoginButtonClick = () => {
        setSignUpDialogOpen(false);

        if (onLoginButtonClick) {
            onLoginButtonClick();
        }
    };

    if (showSnackbar) {
        if (!submissionError) {
            enqueueSnackbar('Your have successfully signed up for private beta testing');
            setSignUpDialogOpen(false);
        } else {
            enqueueSnackbar('Error occurred when tried to sign up for private beta testing', { variant: 'error' });
        }

        setShowSnackbar(false);
    }

    return (
        <Dialog
            open={signUpDialogOpen}
            fullScreen={fullScreen}
            fullWidth
            maxWidth="sm"
            onClose={() => setSignUpDialogOpen(false)}
        >
            <DialogContent>
                <div
                    className={classes.signUpFormFields}
                    style={{
                        padding: '30px',
                    }}
                >
                    <div className="sign-in-logo">
                        <img src="./logo.png" />
                    </div>
                    <Typography
                        variant="h6"
                        className={classes.centered}
                    >
                        Sign up for private beta testing
                    </Typography>
                    <TextField
                        label="Email"
                        value={signUpForm.email}
                        onChange={event => setFormValue('email', event.target.value)}
                        error={Boolean(signUpFormErrors.email)}
                        helperText={signUpFormErrors.email && signUpFormErrors.email}
                        fullWidth
                        margin="dense"
                    />
                    <Typography className={classes.privateBetaText}>
                        Private Beta testing in progress. Please provide your email address and we will send you further instructions
                    </Typography>
                    <Button
                        onClick={signUp}
                        fullWidth
                        className={classes.signUpDialogButton}
                        disableElevation
                        disabled={pending}
                        color="primary"
                        variant="contained"
                    >
                        {pending && <CircularProgress size={15} color="primary" />}
                        Sign up for private beta testing
                    </Button>
                    <Button
                        disabled={pending}
                        onClick={handleLoginButtonClick}
                        className={classes.signUpDialogButton}
                        color="primary"
                        variant="text"
                    >
                        Log in
                    </Button>
                    <Button
                        disabled={pending}
                        onClick={() => setSignUpDialogOpen(false)}
                        className={classes.signUpDialogButton}
                        color="primary"
                        variant="text"
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const mapMobxToProps = ({ signUp }) => ({
    signUpForm: signUp.signUpForm,
    signUpFormErrors: signUp.signUpFormErrors,
    pending: signUp.pending,
    signUpDialogOpen: signUp.signUpDialogOpen,
    submissionError: signUp.submissionError,
    showSnackbar: signUp.showSnackbar,
    signUp: signUp.signUp,
    setFormValue: signUp.setFormValue,
    setShowSnackbar: signUp.setShowSnackbar,
    setSignUpDialogOpen: signUp.setSignUpDialogOpen,
});

export const SignUpDialog = withMobileDialog()(
    withSnackbar(
        inject(mapMobxToProps)(observer(_SignUpDialog)),
    ),
);
