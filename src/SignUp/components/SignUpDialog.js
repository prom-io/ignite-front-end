import React from "react";
import {inject, observer} from "mobx-react";
import {
    Dialog,
    DialogContent,
    Button,
    withMobileDialog,
    makeStyles,
    TextField,
    CircularProgress,
    Typography
} from "@material-ui/core";
import {withSnackbar} from "notistack";

const useStyles = makeStyles(() => ({
    signUpFormContent: {
        padding: 10
    },
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table",
        fontFamily: "Museo Sans Cyrl",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "20px",
        lineHeight: "24px",
        textAlign: "center",
        color: "#1C1C1C",
    },
    signUpButton: {
        maxWidth: 374,
        marginTop: 20,
        borderRadius: 30,
        marginLeft: "auto",
        marginRight: "auto",
        display: "table",
        height: "40px",
        fontFamily: "Museo Sans Cyrl",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "15px",
    },
    loginButton: {
        maxWidth: 374,
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    }
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
}) => {
    const classes = useStyles();

    if (showSnackbar) {
        if (!submissionError) {
            enqueueSnackbar("Account has been created successfully");
            setSignUpDialogOpen(false);
        } else {
            enqueueSnackbar("Error occurred when tried to sign up");
        }

        setShowSnackbar(false);
    }

    const Talk = '{Talk}'

    return (
        <Dialog open={signUpDialogOpen}
                fullScreen={fullScreen}
                fullWidth
                maxWidth="sm"
                onClose={() => setSignUpDialogOpen(false)}
        >
            <DialogContent>
                <div className={classes.signUpFormFields}
                    style={{
                        "padding":"30px"
                    }
                    }
                >
                    <div className="sign-in-logo">
                        <img src="./logo.png" />
                    </div>
                    <Typography variant="h6"
                                className={classes.centered}
                    >
                        Create an account
                    </Typography>
                   <TextField label="Wallet address"
                              value={signUpForm.address}
                              onChange={event => setFormValue("address", event.target.value)}
                              error={Boolean(signUpFormErrors.address)}
                              helperText={signUpFormErrors.address && signUpFormErrors.address}
                              fullWidth
                              margin="dense"
                   />
                   <TextField label="Private key"
                              value={signUpForm.privateKey}
                              onChange={event => setFormValue("privateKey", event.target.value)}
                              error={Boolean(signUpFormErrors.privateKey)}
                              helperText={signUpFormErrors.privateKey && signUpFormErrors.privateKey}
                              fullWidth
                              margin="dense"
                              type="password"
                   />
                   <TextField label="Username"
                              value={signUpForm.username}
                              onChange={event => setFormValue("username", event.target.value)}
                              error={Boolean(signUpFormErrors.username)}
                              helperText={signUpFormErrors.userStatusesStore && signUpFormErrors.username}
                              fullWidth
                              margin="dense"
                   />
                   <Button onClick={signUp}
                           fullWidth
                           className={classes.signUpButton}
                           disableElevation
                           disabled={pending}
                           color="primary"
                           variant="contained"
                   >
                       {pending && <CircularProgress size={15} color="primary"/>}
                       Sign up for Prometeus {Talk}
                   </Button>
                    <Button disabled={pending}
                            onClick={() => setSignUpDialogOpen(false)}
                            className={classes.signUpButton}
                            color="primary"
                            variant="text"
                    >
                        Log in
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
};

const mapMobxToProps = ({signUp}) => ({
    signUpForm: signUp.signUpForm,
    signUpFormErrors: signUp.signUpFormErrors,
    pending: signUp.pending,
    signUpDialogOpen: signUp.signUpDialogOpen,
    submissionError: signUp.submissionError,
    showSnackbar: signUp.showSnackbar,
    signUp: signUp.signUp,
    setFormValue: signUp.setFormValue,
    setShowSnackbar: signUp.setShowSnackbar,
    setSignUpDialogOpen: signUp.setSignUpDialogOpen
});

export const SignUpDialog = withMobileDialog()(
    withSnackbar(
        inject(mapMobxToProps)(observer(_SignUpDialog))
    )
);
