import React from "react";
import { inject, observer } from "mobx-react";
import {
    Dialog,
    DialogContent,
    Typography,
    makeStyles,
    withMobileDialog
} from "@material-ui/core";

import { CustomDialogTitle } from "../../Authorization/components";
import { localized } from "../../localization/components";
import { getTimeToCET } from "../../utils/date-utlis";
import { ArrowGreenIcon } from "../../icons/ArrowGreenIcon";
import { ArrowRedIcon } from "../../icons/ArrowRedIcon";

const useStyles = makeStyles(theme => ({
    dialogContent: {
        [theme.breakpoints.down("sm")]: {
            padding: "24px 12px"
        },
        [theme.breakpoints.down("xs")]: {
            padding: "12px"
        }
    },
    transactionDetailsItem: {
        padding: "20px 0",
        borderBottom: `1px solid ${theme.palette.border.main}`,
        "& p": {
            fontSize: "15px"
        },
        "&:last-child": {
            borderBottom: "none"
        }
    },
    transactionHashLink: {
        textDecoration: "none",
        color: theme.palette.text.primary,
        overflowWrap: "break-word",
        "&:hover": {
            textDecoration: "underline"
        }
    },
    transactionHash: {
        fontSize: "20px !important",
        fontWeight: 600,
        lineHeight: "24px",
        overflowWrap: "break-word"
    },
    transactionBalance: {
        marginLeft: "16px",
        fontWeight: 600,
        lineHeight: "18px"
    },
    detailsBalanceSum: {
        display: "flex",
        alignItems: "center"
    },
    transactionGreen: {
        color: "#27AE60"
    },
    transactionRed: {
        color: "#FF0101"
    },
    detailsBalance: {
        display: "flex",
        justifyContent: "space-between"
    },
    detailsFromTo: {
        display: "flex",
        "& > p:last-child": {
            wordBreak: "break-all"
        }
    },
    detailsFromToLabel: {
        minWidth: "55px",
        color: theme.palette.primary.main,
        fontWeight: 600
    }
}));

const _TransactionDetailsDialog = ({
    openDetails,
    currentTransaction,
    setOpenDetails,
    fullScreen,
    l
}) => {
    const classes = useStyles();

    const transactionStatus = () => {
        switch (currentTransaction.txn_status) {
            case "PERFORMED":
                return "Succeed";
            case "NOT_STARTED":
                return "Pending";
            case "PROBLEM":
                return "Pending";
            case "PERFORMING":
                return "Performing";
            case "FAILED":
                return "Failed";
            default:
                return "Pending";
        }
    };

    const transactionSubject =
        currentTransaction.txn_subject === "REWARD"
            ? "Memezator prize"
            : currentTransaction.txn_subject === "TRANSFER"
            ? "P2P transaction"
            : "";

    const transactionSum = () => {
        switch (currentTransaction.txn_subject) {
            case "REWARD":
                return (
                    <Typography
                        className={classes.transactionBalance}
                        classes={{ root: classes.transactionGreen }}
                    >
                        + {Number(currentTransaction.txn_sum).toFixed(2)} PROM
                    </Typography>
                );
            case "TRANSFER":
                return (
                    <Typography
                        className={classes.transactionBalance}
                        classes={{ root: classes.transactionRed }}
                    >
                        - {Number(currentTransaction.txn_sum).toFixed(2)} PROM
                    </Typography>
                );
            default:
                return null;
        }
    };

    const TableItem = ({ children, className }) => (
        <div className={[classes.transactionDetailsItem, className].join(" ")}>
            {children}
        </div>
    );

    return (
        <Dialog
            onClose={() => setOpenDetails(false)}
            open={openDetails}
            fullScreen={fullScreen}
        >
            <CustomDialogTitle
                title="Transaction Details"
                type="default"
                setDialogOpen={setOpenDetails}
            />
            <DialogContent classes={{ root: classes.dialogContent }}>
                <TableItem>
                    {currentTransaction.txn_hash ? (
                        <a
                            href={`https://explorer.binance.org/smart/tx/${currentTransaction.txn_hash}`}
                            className={classes.transactionHashLink}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <Typography
                                classes={{ root: classes.transactionHash }}
                                color="textPrimary"
                            >
                                {currentTransaction.txn_hash}
                            </Typography>
                        </a>
                    ) : (
                        <Typography
                            classes={{ root: classes.transactionHash }}
                            color="textPrimary"
                        >
                            Pending
                        </Typography>
                    )}
                </TableItem>
                <TableItem className={classes.detailsBalance}>
                    <div className={classes.detailsBalanceSum}>
                        {currentTransaction.txn_subject === "REWARD" ? (
                            <ArrowGreenIcon />
                        ) : (
                            currentTransaction.txn_subject === "TRANSFER" && (
                                <ArrowRedIcon />
                            )
                        )}
                        {transactionSum()}
                    </div>
                    <Typography color="textSecondary">
                        {transactionStatus()}
                    </Typography>
                </TableItem>
                <TableItem>
                    <Typography color="textSecondary">
                        {currentTransaction.created_at &&
                            getTimeToCET(
                                currentTransaction.created_at,
                                "dd MMM yyyy, HH:mm:ss, zzz"
                            )}{" "}
                        (CET)
                    </Typography>
                </TableItem>
                <TableItem>
                    <Typography color="textPrimary">{transactionSubject}</Typography>
                </TableItem>
                <TableItem className={classes.detailsFromTo}>
                    <Typography classes={{ root: classes.detailsFromToLabel }}>
                        {l("transactions.from")}
                    </Typography>{" "}
                    <Typography>{currentTransaction.txn_from}</Typography>
                </TableItem>
                <TableItem className={classes.detailsFromTo}>
                    <Typography classes={{ root: classes.detailsFromToLabel }}>
                        {l("transactions.to")}
                    </Typography>{" "}
                    <Typography>{currentTransaction.txn_to}</Typography>
                </TableItem>
            </DialogContent>
        </Dialog>
    );
};

const mapMobxToProps = ({ transactions }) => ({
    openDetails: transactions.openDetails,
    currentTransaction: transactions.currentTransaction,
    setOpenDetails: transactions.setOpenDetails
});

export const TransactionDetailsDialog = localized(
    withMobileDialog({ breakpoint: "xs" })(
        inject(mapMobxToProps)(observer(_TransactionDetailsDialog))
    )
);
