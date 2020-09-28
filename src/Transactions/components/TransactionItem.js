import React from "react";
import { observer } from "mobx-react";
import { format } from "date-fns";
import { Typography, makeStyles } from "@material-ui/core";

import { useLocalization } from "../../store";
import { ArrowGreenIcon } from "../../icons/ArrowGreenIcon";
import { ArrowRedIcon } from "../../icons/ArrowRedIcon";
import { TransactionCheckIcon } from "../../icons/TransactionCheckIcon";
import { TransactionPlusIcon } from "../../icons/TransactionPlusIcon";

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

export const TransactionItem = observer(({ transaction, setOpenDetails }) => {
    const classes = useStyles();
    const { l } = useLocalization();

    const transactionStatus =
        transaction.txn_status === "PERFORMED"
            ? "Approved"
            : transaction.txn_status === "NOT_STARTED"
            ? "Pending"
            : "Declined";

    const transactionSubject =
        transaction.txn_subject === "REWARD"
            ? "Memezator prize"
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
                        align="right"
                    >
                        + {Number(transaction.txn_sum).toFixed(2)} PROM
                    </Typography>
                );
            case "TRANSFER":
                return (
                    <Typography
                        className={classes.transactionBalance}
                        classes={{ root: classes.transactionRed }}
                        align="right"
                    >
                        - {Number(transaction.txn_sum).toFixed(2)} PROM
                    </Typography>
                );
            default:
                return null;
        }
    };

    return (
        <div
            className={classes.transactionItem}
            onClick={() => setOpenDetails(true, transaction)}
        >
            <div className={classes.transactionItemHeader}>
                <div className={classes.transactionArrow}>
                    {transaction.txn_subject === "REWARD" ? (
                        <ArrowGreenIcon />
                    ) : (
                        transaction.txn_subject === "TRANSFER" && <ArrowRedIcon />
                    )}
                </div>
                <div style={{ width: "75%" }}>
                    <Typography
                        classes={{ root: classes.transactionHash }}
                        color="textPrimary"
                    >
                        {transaction.txn_hash || "Pending"}
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
                        {transactionStatus}
                    </Typography>
                </div>
            </div>
            <div className={classes.transactionItemFooter}>
                <div className={classes.transactionItemFooterMobile}>
                    <div className={classes.detailsFromTo}>
                        <Typography classes={{ root: classes.detailsFromToLabel }}>
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
                        <Typography classes={{ root: classes.detailsFromToLabel }}>
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
                    {transactionSubject}
                </Typography>
            </div>
        </div>
    );
});
