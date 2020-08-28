import React from "react";
import { inject, observer } from "mobx-react";

import { TransactionItem } from "./TransactionItem";

const _TransactionsList = ({ transactions }) => {
    return (
        <div>
            {transactions.map(transaction => (
                <TransactionItem transaction={transaction} />
            ))}
        </div>
    );
};

const mapMobxToProps = ({ transactions }) => ({
    transactions: transactions.transactions,
    pending: transactions.pending
});

export const TransactionsList = inject(mapMobxToProps)(observer(_TransactionsList));
