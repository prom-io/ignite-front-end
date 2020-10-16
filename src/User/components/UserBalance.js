import React from "react";
import { observer } from "mobx-react";
import { Link } from "mobx-router";
import { Button, Typography, makeStyles } from "@material-ui/core";

import { Routes } from "../../routes";
import { useLocalization, useRouter } from "../../store";

const useStyles = makeStyles(theme => ({
    balanceWrapper: {
        width: "100%",
        borderTop: `1px solid ${theme.palette.border.main}`,
        borderBottom: `1px solid ${theme.palette.border.main}`,
        padding: "24px"
    },
    balanceInner: {
        maxWidth: "208px",
        width: "100%",
        margin: "0 auto"
    },
    balanceButtonWrapper: {
        textDecoration: "none",
        height: "40px",
        width: "100%",

        "& button": {
            fontFamily: "Museo Sans Cyrl Bold",
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
    },
    balanceText: {
        fontFamily: "Museo Sans Cyrl Bold",
        fontSize: "12px",
        margin: "8px 0 4px",

        "&:last-child": {
            marginBottom: 0
        }
    }
}));

export const UserBalance = observer(
    ({ overallBalance, blockchainBalance, pendingRewardsSum }) => {
        const classes = useStyles();
        const { l } = useLocalization();
        const routerStore = useRouter();

        return (
            <div className={classes.balanceWrapper}>
                <div className={classes.balanceInner}>
                    <Link
                        className={classes.balanceButtonWrapper}
                        store={routerStore}
                        view={Routes.transactions}
                    >
                        <Button color="primary" variant="text">
                            {l("user.profile.your-balance")}:{" "}
                            {Number(overallBalance).toFixed(2)} PROM
                        </Button>
                    </Link>
                    <Typography
                        color="textPrimary"
                        classes={{ root: classes.balanceText }}
                        align="center"
                    >
                        Blockchain: {Number(blockchainBalance).toFixed(2)} PROM
                    </Typography>
                    <Typography
                        classes={{ root: classes.balanceText }}
                        color="textPrimary"
                        align="center"
                    >
                        Rewards: {Number(pendingRewardsSum).toFixed(2)} PROM
                    </Typography>
                </div>
            </div>
        );
    }
);
