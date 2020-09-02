import React from "react";
import { Button, DialogContent } from "@material-ui/core";

import { HashVerificationMode } from "../stores";
import { useLocalization, useStore } from "../../store";
import { authorizationDialogsStyles } from "../../styles/material/authorizationDialogsStyles";

export const CreateAccount = () => {
    const classes = authorizationDialogsStyles();
    const { genericAuthorizationDialog, hashVerification } = useStore();
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;
    const { setHashVerificationMode } = hashVerification;
    const { l } = useLocalization();

    return (
        <DialogContent>
            <span className={classes.contentDescription}>
                {l("sign-up.use-existing-wallet")}
            </span>
            <div className={classes.content} style={{ margin: "16px 0 24px 0" }}>
                {l("sign-up.use-existing-wallet.explained")}
            </div>
            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button
                }}
                onClick={() => setGenericAuthorizationDialogType("generateHash")}
            >
                {l("sign-up.generate-hash-code")}
            </Button>
            <div
                className={classes.link}
                onClick={() => {
                    setHashVerificationMode(HashVerificationMode.SIGN_UP);
                    setGenericAuthorizationDialogType("verifyHash");
                }}
            >
                {l("password-recovery.own-hash-code")}
            </div>
            <div className={classes.notes}>
                <a>{l("sign-up.note")}:</a>{" "}
                {l("password-recovery.hash-code.description")}
            </div>
        </DialogContent>
    );
};
