import React from "react";
import { observer } from "mobx-react";
import { format } from "date-fns";
import { Typography, makeStyles } from "@material-ui/core";

import { useLocalization } from "../../store";
import { TransactionPlusIcon } from "../../icons/TransactionPlusIcon";
import { TransactionCheckIcon } from "../../icons/TransactionCheckIcon";
import { TransactionCrossIcon } from "../../icons/TransactionCrossIcon";

const useStyles = makeStyles(theme => ({
    transactionItem: {
        cursor: "pointer",
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
        "&:hover": {
            background: theme.palette.background.light
        },
        [theme.breakpoints.down("sm")]: {
            borderLeft: "none",
            borderRight: "none"
        }
    },
    transactionItemFailed: {
        border: `1px solid ${theme.palette.error.main}`
    },
    transactionItemHeader: {
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        padding: "23px 16px 18px 44px",
        background: theme.palette.background.light
    },
    transactionItemFooter: {
        display: "flex",
        justifyContent: "space-between",
        padding: "18px 16px 18px 44px",
        "& > div > div:first-child": {
            marginBottom: "8px"
        },
        [theme.breakpoints.down("xs")]: {
            padding: "14px 16px 14px 44px",
            display: "block"
        }
    },
    transactionItemFooterMobile: {
        [theme.breakpoints.down("xs")]: {
            marginBottom: "14px",
            paddingBottom: "14px",
            borderBottom: `1px solid ${theme.palette.border.main}`
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
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginBottom: "6px",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "90%"
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "14px"
        }
    },
    transactionBalance: {
        fontSize: "15px",
        fontWeight: 600,
        lineHeight: "18px",
        marginBottom: "5px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "14px"
        }
    },
    transactionGreen: {
        color: "#27AE60"
    },
    transactionRed: {
        color: "#FF0101"
    },
    transactionSmallText: {
        fontSize: "12px"
    },
    detailsFromTo: {
        display: "flex"
    },
    detailsFromToLabel: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: "12px"
    },
    detailsFromToContent: {
        fontSize: "12px",
        overflow: "hidden",
        textOverflow: "ellipsis"
    }
}));

export const TransactionItem = observer(
    ({ currentUserId, transaction, setOpenDetails }) => {
        const classes = useStyles();
        const { l } = useLocalization();

        const transactionIcon = () => {
            switch (transaction.txn_status) {
                case "PERFORMED":
                    return <TransactionCheckIcon />;
                case "FAILED":
                    return <TransactionCrossIcon />;
                default:
                    return <TransactionPlusIcon />;
            }
        };

        const transactionHash = () => {
            switch (transaction.txn_status) {
                case "PERFORMED":
                    return transaction.txn_hash;
                case "FAILED":
                    return "Transation failed";
                default:
                    return "Will be transferred";
            }
        };

        const transactionStatus = () => {
            switch (transaction.txn_status) {
                case "PERFORMED":
                    return "Succeed";
                case "PERFORMING":
                    return "Performing";
                case "FAILED":
                    return "Failed";
                default:
                    return "Pending";
            }
        };

        const transactionSum = () => {
            switch (transaction.txn_subject) {
                case "REWARD":
                    return (
                        <Typography
                            className={classes.transactionBalance}
                            classes={{
                                root:
                                    transaction.txn_status !== "FAILED" &&
                                    classes.transactionGreen
                            }}
                            align="right"
                        >
                            + {Number(transaction.txn_sum).toFixed(2)} PROM
                        </Typography>
                    );
                case "TRANSFER":
                    if (transaction.txn_from) {
                        if (
                            currentUserId.toLowerCase() ===
                            transaction.txn_from.toLowerCase()
                        ) {
                            return (
                                <Typography
                                    className={classes.transactionBalance}
                                    classes={{
                                        root:
                                            transaction.txn_status !== "FAILED" &&
                                            classes.transactionRed
                                    }}
                                    align="right"
                                >
                                    - {Number(transaction.txn_sum).toFixed(2)} PROM
                                </Typography>
                            );
                        } else {
                            return (
                                <Typography
                                    className={classes.transactionBalance}
                                    classes={{
                                        root:
                                            transaction.txn_status !== "FAILED" &&
                                            classes.transactionGreen
                                    }}
                                    align="right"
                                >
                                    + {Number(transaction.txn_sum).toFixed(2)} PROM
                                </Typography>
                            );
                        }
                    }

                    return null;
                default:
                    return null;
            }
        };

        const transactionSubject = () => {
            switch (transaction.txn_subject) {
                case "REWARD":
                    return "Memezator prize";
                case "TRANSFER":
                    return "P2P transaction";
                default:
                    return "";
            }
        };

        return (
            <div
                className={[
                    classes.transactionItem,
                    transaction.txn_status === "FAILED"
                        ? classes.transactionItemFailed
                        : ""
                ].join(" ")}
                onClick={() => setOpenDetails(true, transaction)}
            >
                <div className={classes.transactionItemHeader}>
                    <div className={classes.transactionArrow}>
                        {transactionIcon()}
                    </div>
                    <div style={{ width: "75%" }}>
                        <Typography
                            classes={{ root: classes.transactionHash }}
                            color="textPrimary"
                        >
                            {transactionHash()}
                        </Typography>
                        <Typography
                            classes={{ root: classes.transactionSmallText }}
                            color="textSecondary"
                        >
                            {format(
                                new Date(transaction.created_at),
                                "dd.MM.yyyy, HH:mm:ss"
                            )}
                        </Typography>
                    </div>
                    <div style={{ width: "25%" }}>
                        {transactionSum()}
                        <Typography
                            classes={{ root: classes.transactionSmallText }}
                            color="textSecondary"
                            align="right"
                        >
                            {transactionStatus()}
                        </Typography>
                    </div>
                </div>
                {transaction.txn_status === "PERFORMED" && (
                    <div className={classes.transactionItemFooter}>
                        <div className={classes.transactionItemFooterMobile}>
                            <div className={classes.detailsFromTo}>
                                <Typography
                                    classes={{ root: classes.detailsFromToLabel }}
                                >
                                    {l("transactions.from")}&nbsp;
                                </Typography>{" "}
                                <Typography
                                    classes={{ root: classes.detailsFromToContent }}
                                    color="textPrimary"
                                >
                                    {transaction.txn_from}
                                </Typography>
                            </div>
                            <div className={classes.detailsFromTo}>
                                <Typography
                                    classes={{ root: classes.detailsFromToLabel }}
                                >
                                    {l("transactions.to")}&nbsp;
                                </Typography>{" "}
                                <Typography
                                    classes={{ root: classes.detailsFromToContent }}
                                    color="textPrimary"
                                >
                                    {transaction.txn_to}
                                </Typography>
                            </div>
                        </div>
                        <Typography
                            classes={{ root: classes.transactionSmallText }}
                            color="textPrimary"
                        >
                            {transactionSubject()}
                        </Typography>
                    </div>
                )}
            </div>
        );
    }
);
