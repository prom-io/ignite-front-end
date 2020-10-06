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
import { TransactionPlusIcon } from "../../icons/TransactionPlusIcon";
import { TransactionCheckIcon } from "../../icons/TransactionCheckIcon";
import { TransactionCrossIcon } from "../../icons/TransactionCrossIcon";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        maxWidth: "650px",
        width: "100%"
    },
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

    const transactionIcon = () => {
        switch (currentTransaction.txn_status) {
            case "PERFORMED":
                return <TransactionCheckIcon />;
            case "FAILED":
                return <TransactionCrossIcon />;
            default:
                return <TransactionPlusIcon />;
        }
    };

    const transactionHash = () => {
        switch (currentTransaction.txn_status) {
            case "PERFORMED":
                return (
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
                );
            case "FAILED":
                return (
                    <Typography
                        classes={{ root: classes.transactionHash }}
                        color="textPrimary"
                    >
                        Transation failed
                    </Typography>
                );
            default:
                return (
                    <Typography
                        classes={{ root: classes.transactionHash }}
                        color="textPrimary"
                    >
                        Will be transferred
                    </Typography>
                );
        }
    };

    const transactionStatus = () => {
        switch (currentTransaction.txn_status) {
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
        switch (currentTransaction.txn_subject) {
            case "REWARD":
                return (
                    <Typography
                        className={classes.transactionBalance}
                        classes={{
                            root:
                                currentTransaction.txn_status !== "FAILED" &&
                                classes.transactionGreen
                        }}
                    >
                        + {Number(currentTransaction.txn_sum).toFixed(2)} PROM
                    </Typography>
                );
            case "TRANSFER":
                return (
                    <Typography
                        className={classes.transactionBalance}
                        classes={{
                            root:
                                currentTransaction.txn_status !== "FAILED" &&
                                classes.transactionRed
                        }}
                    >
                        - {Number(currentTransaction.txn_sum).toFixed(2)} PROM
                    </Typography>
                );
            default:
                return null;
        }
    };

    const transactionSubject = () => {
        switch (currentTransaction.txn_subject) {
            case "REWARD":
                return "Memezator prize";
            case "TRANSFER":
                return "P2P transaction";
            default:
                return "";
        }
    };

    const TableItem = ({ children, className }) => (
        <div className={[classes.transactionDetailsItem, className].join(" ")}>
            {children}
        </div>
    );

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
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
                <TableItem>{transactionHash()}</TableItem>
                <TableItem className={classes.detailsBalance}>
                    <div className={classes.detailsBalanceSum}>
                        {transactionIcon()}
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
                {currentTransaction.txn_status === "PERFORMED" && (
                    <>
                        <TableItem>
                            <Typography color="textPrimary">
                                {transactionSubject()}
                            </Typography>
                        </TableItem>
                        <TableItem className={classes.detailsFromTo}>
                            <Typography
                                classes={{ root: classes.detailsFromToLabel }}
                            >
                                {l("transactions.from")}
                            </Typography>{" "}
                            <Typography>{currentTransaction.txn_from}</Typography>
                        </TableItem>
                        <TableItem className={classes.detailsFromTo}>
                            <Typography
                                classes={{ root: classes.detailsFromToLabel }}
                            >
                                {l("transactions.to")}
                            </Typography>{" "}
                            <Typography>{currentTransaction.txn_to}</Typography>
                        </TableItem>
                    </>
                )}
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
