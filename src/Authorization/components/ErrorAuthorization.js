import React from "react";
import { Button, DialogContent } from "@material-ui/core";

import { useLocalization, useStore } from "../../store";
import { authorizationDialogsStyles } from "../../styles/material/authorizationDialogsStyles";

export const ErrorAuthorization = () => {
    const classes = authorizationDialogsStyles();
    const { l } = useLocalization();
    const { generatedWallet } = useStore().walletGeneration;
    const {
        setGenericAuthorizationDialogOpen
    } = useStore().genericAuthorizationDialog;

    return (
        <DialogContent>
            <span className={classes.contentDescription}>
                {l("sign-up.error-part-1")}
                <a href="http://ignite.so/" target="_blank">
                    Ignite.so
                </a>{" "}
                {l("sign-up.error-part-2")}{" "}
                <a href="http://prometeus.io/" target="_blank">
                    Prometeus.io
                </a>
                {l("sign-up.error-part-3")}
            </span>

            <div className={classes.contentBlock}>
                <p>{l("sign-up.your-login-is")}:</p>
                <span>{generatedWallet.address}</span>
            </div>

            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button
                }}
                onClick={() => setGenericAuthorizationDialogOpen(false)}
            >
                {l("sign-up.ok")}
            </Button>

            <div className={classes.notes}>
                <a>{l("sign-up.note")}:</a> {l("sign-up.no-bans")}
            </div>

            <span className={classes.contentDescription}>{l("sign-up.sorry")}</span>
        </DialogContent>
    );
};
