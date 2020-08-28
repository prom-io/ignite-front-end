import React from "react";
import { observer } from "mobx-react";
import { Link } from "mobx-router";
import { Button, makeStyles } from "@material-ui/core";

import { Routes } from "../../routes";
import { useLocalization, useRouter } from "../../store";

const useStyles = makeStyles(() => ({
    balanceButtonWrapper: {
        textDecoration: "none",
        maxWidth: "204px",
        height: "40px",
        width: "100%",

        "& button": {
            width: "100%",
            height: "40px",
            borderRadius: "30px",
            fontWeight: 600,
            fontSize: "12px",
            lineHeight: "18px",
            color: "#1c1c1c",
            border: "none",
            background: "rgba(255, 92, 1, 0.2)",

            "&:hover": {
                background: "rgba(255, 92, 1, 0.2)"
            }
        }
    }
}));

export const UserBalanceButton = observer(({ userBalance, withMargin }) => {
    const classes = useStyles();
    const { l } = useLocalization();
    const routerStore = useRouter();

    return (
        <Link
            className={classes.balanceButtonWrapper}
            store={routerStore}
            view={Routes.transactions}
            style={{ marginBottom: withMargin ? "16px" : 0 }}
        >
            <Button color="primary" variant="text">
                {l("user.profile.your-balance")}: {Number(userBalance).toFixed(2)}{" "}
                PROM
            </Button>
        </Link>
    );
});
