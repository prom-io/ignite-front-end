import React from "react";
import { Button, DialogContent, makeStyles } from "@material-ui/core";
import { useLocalization, useStore } from "../../store/hooks";

const useStyles = makeStyles(theme => ({
    contentDescription: {
        fontFamily: "Museo Sans Cyrl Bold",
        fontSize: "15px",
        lineHeight: "26px",
        color: "#1C1C1C",
        "& a": {
            color: theme.palette.primary.main,
            textDecoration: "underline",
            fontFamily: "Museo Sans Cyrl Bold"
        }
    },
    contentBlock: {
        display: "flex",
        flexDirection: "column",
        borderTop: "1px solid #F1EBE8",
        marginTop: "16px",
        paddingTop: "24px",
        fontFamily: "Museo Sans Cyrl Regular",
        "& p": {
            margin: 0,
            fontFamily: "Museo Sans Cyrl Bold",
            fontSize: "20px",
            lineHeight: "18px"
        },
        "& span": {
            marginTop: 8,
            fontSize: "15px"
        }
    },
    notes: {
        marginTop: "32px",
        marginBottom: 16,
        color: "#A2A2A2",
        fontSize: "15px",
        fontFamily: "Museo Sans Cyrl Regular",
        lineHeight: "26px",
        "& a": {
            color: theme.palette.primary.main,
            fontFamily: "Museo Sans Cyrl Bold"
        }
    },
    button: {
        width: "187px",
        marginTop: 20
    }
}));

export const ErrorAuthorization = () => {
    const classes = useStyles();
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
