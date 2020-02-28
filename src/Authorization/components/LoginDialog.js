import React from "react";
import {inject, observer} from "mobx-react";
import {Dialog, DialogContent, DialogTitle, Button, withMobileDialog, makeStyles} from "@material-ui/core";
import {LoginForm} from "./LoginForm";

const useStyles = makeStyles(theme => ({
    closeButton: {
        maxWidth: 374,
        marginLeft: "auto",
        marginRight: "auto",
        display: "table",
        fontFamily: "Museo Sans Cyrl",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "15px",
        lineHeight: "18px",
        textAlign: "center",
        color: theme.palette.primary.main,
        marginTop: "24px"
    }
}));

const _LoginDialog = ({loginDialogOpen, setLoginDialogOpen, fullScreen}) => {
    const classes = useStyles();

    return (
        <Dialog open={loginDialogOpen}
                onClose={() => setLoginDialogOpen(false)}
                fullScreen={fullScreen}
                fullWidth
                maxWidth="sm"
        >
            <DialogTitle>
                Log in
            </DialogTitle>
            <DialogContent>
                <LoginForm hideSignUpButton
                           disableCard
                />
                <Button variant="text"
                        className={classes.closeButton}
                        onClick={() => setLoginDialogOpen(false)}
                >
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    )
};

const mapMobxToProps = ({login}) => ({
    setLoginDialogOpen: login.setLoginDialogOpen,
    loginDialogOpen: login.loginDialogOpen
});

export const LoginDialog = withMobileDialog()(
    inject(mapMobxToProps)(observer(_LoginDialog))
);
