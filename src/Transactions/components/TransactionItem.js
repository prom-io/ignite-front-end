import React from "react";
import { format } from "date-fns";
import { Typography, Hidden, makeStyles } from "@material-ui/core";

import { ArrowGreenIcon } from "../../icons/ArrowGreenIcon";
import { ArrowRedIcon } from "../../icons/ArrowRedIcon";

const useStyles = makeStyles(theme => ({
    transactionItem: {
        border: `1px solid ${theme.palette.border.main}`,
        borderTop: "unset",
        overflow: "hidden",
        "&:first-child": {
            borderTop: `1px solid ${theme.palette.border.main}`,
            borderRadius: "4px 4px 0 0",
            [theme.breakpoints.down("sm")]: {
                borderTop: "none"
            }
        },
        "&:last-child": {
            borderRadius: "0 0 4px 4px"
        },
        [theme.breakpoints.down("sm")]: {
            borderLeft: "none",
            borderRight: "none"
        }
    },
    transactionItemHeader: {
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        padding: "23px 16px 18px 44px",
        background: theme.palette.background.light,
        [theme.breakpoints.down("xs")]: {
            display: "block"
        }
    },
    transactionItemFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 16px 18px 44px",
        [theme.breakpoints.down("xs")]: {
            alignItems: "unset",
            padding: "14px 16px 14px 44px"
        }
    },
    transactionArrow: {
        position: "absolute",
        left: "15px",
        top: "23px"
    },
    transactionHash: {
        fontSize: "15px",
        fontWeight: 600,
        lineHeight: "18px",
        maxWidth: "365px",
        overflowWrap: "break-word",
        [theme.breakpoints.down("xs")]: {
            maxWidth: "unset",
            marginBottom: "8px"
        }
    },
    transactionBalance: {
        fontSize: "15px",
        fontWeight: 600,
        lineHeight: "18px",
        marginBottom: "5px"
    },
    transactionGreen: {
        color: "#27AE60"
    },
    transactionRed: {
        color: "#FF0101"
    },
    transactionSmallText: {
        fontSize: "12px"
    }
}));

export const TransactionItem = ({ transaction }) => {
    const classes = useStyles();

    const transactionStatus =
        transaction.txn_status === "PERFORMED"
            ? "Approved"
            : transaction.txn_status === "NOT_STARTED"
            ? "Pending"
            : "Declined";

    const transactionSubject =
        transaction.txn_subject === "REWARD"
            ? "Memezator Price"
            : transaction.txn_subject === "TRANSFER"
            ? "P2P transaction"
            : "";

    const transactionSum = () => {
        switch (transaction.txn_subject) {
            case "REWARD":
                return (
                    <Typography
                        className={classes.transactionBalance}
                        classes={{ root: classes.transactionGreen }}
                    >
                        + {Number(transaction.txn_sum).toFixed(2)} PROM
                    </Typography>
                );
            case "TRANSFER":
                return (
                    <Typography
                        className={classes.transactionBalance}
                        classes={{ root: classes.transactionRed }}
                    >
                        - {Number(transaction.txn_sum).toFixed(2)} PROM
                    </Typography>
                );
            default:
                return null;
        }
    };

    return (
        <div className={classes.transactionItem}>
            <div className={classes.transactionItemHeader}>
                <div className={classes.transactionArrow}>
                    {transaction.txn_subject === "REWARD" ? (
                        <ArrowGreenIcon />
                    ) : (
                        transaction.txn_subject === "TRANSFER" && <ArrowRedIcon />
                    )}
                </div>
                <Typography
                    classes={{ root: classes.transactionHash }}
                    color="textPrimary"
                >
                    {transaction.txn_hash || "PENDING"}
                </Typography>
                <Hidden smUp>
                    <Typography
                        classes={{ root: classes.transactionSmallText }}
                        color="textSecondary"
                    >
                        {format(
                            new Date(transaction.created_at),
                            "dd.MM.yyyy HH:mm:ss"
                        )}
                    </Typography>
                </Hidden>
                <div>
                    <Hidden xsDown>
                        {transactionSum()}
                        <Typography
                            classes={{ root: classes.transactionSmallText }}
                            color="textSecondary"
                            align="right"
                        >
                            {transactionStatus}
                        </Typography>
                    </Hidden>
                </div>
            </div>
            <div className={classes.transactionItemFooter}>
                <div>
                    <Hidden xsDown>
                        <Typography
                            classes={{ root: classes.transactionSmallText }}
                            color="textSecondary"
                        >
                            {format(
                                new Date(transaction.created_at),
                                "dd.MM.yyyy HH:mm:ss"
                            )}
                        </Typography>
                    </Hidden>
                    <Hidden smUp>
                        {transactionSum()}
                        <Typography
                            classes={{ root: classes.transactionSmallText }}
                            color="textSecondary"
                            align="left"
                        >
                            {transactionStatus}
                        </Typography>
                    </Hidden>
                </div>
                <Typography
                    classes={{ root: classes.transactionSmallText }}
                    color="textPrimary"
                >
                    {transactionSubject}
                </Typography>
            </div>
        </div>
    );
};
