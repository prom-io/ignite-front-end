import React from "react";
import { observer } from "mobx-react";
import { Button, Typography, makeStyles } from "@material-ui/core";

import { useLocalization, useStore } from "../../store/hooks";

const useStyles = makeStyles(theme => ({
    updateUserPassword: {
        background: "#fff",
        padding: "34px 90px 40px 34px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        "& h5": {
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "24px"
        },
        [theme.breakpoints.down("md")]: {
            padding: "24px 24px 45px 24px"
        },
        [theme.breakpoints.down("sm")]: {
            marginBottom: "50px",
            padding: "24px 24px 45px 24px"
        }
    },
    updateUserPasswordOpen: {
        boxSizing: "border-box",
        padding: "11px 23px",
        height: "40px",
        borderRadius: "30px",
        fontWeight: 600,
        fontSize: "15px",
        lineHeight: "18px"
    }
}));

export const UpdateUserPassword = observer(() => {
    const classes = useStyles();
    const { genericAuthorizationDialog } = useStore();
    const { l } = useLocalization();
    const {
        setGenericAuthorizationDialogOpen,
        setGenericAuthorizationDialogType
    } = genericAuthorizationDialog;

    return (
        <div className={classes.updateUserPassword}>
            <Typography variant="h5">{l("authorization.login.password")}</Typography>
            <Button
                color="primary"
                variant="outlined"
                className={classes.updateUserPasswordOpen}
                onClick={() => {
                    setGenericAuthorizationDialogOpen(true);
                    setGenericAuthorizationDialogType("forgotPassword");
                }}
            >
                {l("user.change")}
            </Button>
        </div>
    );
});
