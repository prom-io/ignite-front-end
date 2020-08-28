import React from "react";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles } from "@material-ui/core";

import { TransactionsNotFound } from "./TransactionsNotFound";
import { TransactionItem } from "./TransactionItem";
import Loader from "../../components/Loader";
import { localized } from "../../localization/components";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
        display: "table"
    }
}));

const _TransactionsList = ({
    transactions,
    hasMore,
    pending,
    fetchTransactions
}) => {
    const classes = useStyles();

    return (
        <>
            {pending && transactions.length === 0 && (
                <div className={classes.centered}>
                    <Loader size="lg" />
                </div>
            )}
            {!pending && transactions.length === 0 && <TransactionsNotFound />}
            <div className="paddingBottomRoot">
                {transactions.length !== 0 && (
                    <InfiniteScroll
                        next={fetchTransactions}
                        hasMore={hasMore}
                        loader={
                            <div className={classes.centered}>
                                <Loader size="lg" />
                            </div>
                        }
                        dataLength={transactions.length}
                        style={{ overflowY: "hidden" }}
                    >
                        {transactions.map(transaction => (
                            <TransactionItem transaction={transaction} />
                        ))}
                    </InfiniteScroll>
                )}
            </div>
        </>
    );
};

const mapMobxToProps = ({ transactions }) => ({
    transactions: transactions.transactions,
    hasMore: transactions.hasMore,
    pending: transactions.pending,
    fetchTransactions: transactions.fetchTransactions
});

export const TransactionsList = localized(
    inject(mapMobxToProps)(observer(_TransactionsList))
);
