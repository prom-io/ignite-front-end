import React, {Fragment} from "react";
import {inject, observer} from "mobx-react";
import {TextField, Button, Typography, CircularProgress, Card, CardContent, makeStyles} from "@material-ui/core";
import {SignUpDialog} from "../../SignUp/components";

const useStyles = makeStyles(() => ({
    loginCard: {
        backgroundColor: "#FBF7F6",
    },
    loginButton: {
        maxWidth: 374,
        marginTop: 20,
        borderRadius: 30,
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    },
    signUpButton: {
        maxWidth: 374,
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    }
}));

const Talk = "{Talk}";

const _LoginForm = ({
    loginForm,
    submissionError,
    pending,
    setFormValue,
    doLogin,
    setSignUpDialogOpen
}) => {
    const classes = useStyles();

    return (
       <Fragment>
           <Card className={classes.loginCard}>
               <CardContent>
                   <TextField label="Wallet address"
                              value={loginForm.username}
                              onChange={event => setFormValue("username", event.target.value)}
                              fullWidth
                              margin="dense"
                   />
                   <TextField label="Wallet private key"
                              value={loginForm.password}
                              onChange={event => setFormValue("password", event.target.value)}
                              fullWidth
                              margin="dense"
                              type="password"
                   />
                   <Button className={classes.loginButton}
                           color="primary"
                           variant="contained"
                           onClick={doLogin}
                           disabled={pending}
                           fullWidth
                   >
                       {pending && <CircularProgress size={14} color="primary"/>}
                       Login
                   </Button>
                   <Button variant="text"
                           color="primary"
                           fullWidth
                           className={classes.signUpButton}
                           onClick={() => setSignUpDialogOpen(true)}
                           disabled={pending}
                   >
                       Sign up for Prometeus {Talk}
                   </Button>
               </CardContent>
           </Card>
           <SignUpDialog/>
       </Fragment>
    )
};

const mapMobxToProps = ({login, signUp}) => ({
    loginForm: login.loginForm,
    pending: login.pending,
    submissionError: login.submissionError,
    setFormValue: login.setFormValue,
    doLogin: login.doLogin,
    setSignUpDialogOpen: signUp.setSignUpDialogOpen
});

export const LoginForm = inject(mapMobxToProps)(observer(_LoginForm));
