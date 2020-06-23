import React from "react";
import { inject, observer } from "mobx-react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Card,
    CardContent,
    makeStyles,
    Typography
} from "@material-ui/core";

import { localized } from "../../localization/components";
import Loader from "../../components/Loader";
import { ExplorerSwitcher } from "./ExplorerSwitcher";

const useStyles = makeStyles(theme => ({
    tableCard: {
        width: "100%",
        marginTop: "50px",
        overflow: "auto"
    },
    centered: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%"
    },
    tableInput: {
        fontFamily: "Museo Sans Cyrl Regular",
        border: "none",
        background: theme.palette.background.paper,
        padding: "6px",
        width: "100%",
        fontSize: "0.875rem",
        color: "rgba(0, 0, 0, 0.87)",
        overflowX: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        "&:focus": {
            outline: `1px solid ${theme.palette.border.main}`
        },
        "&:after": {
            content: "'...'"
        },
        "&:not(:focus):after": {
            content: ""
        }
    }
}));

const getErrorLabel = error => {
    if (error.response) {
        return `Could not load BTFS hashes, server responded with ${error.reponse.status} status`;
    }
    return "Could not load BTFS hashes, server is unreachable";
};

const _BinanceSmartChainTable = ({
    binanceSmartChain,
    pending,
    error,
    l,
    currentActiveRoute
}) => {
    const classes = useStyles();

    return (
        <Card className={classes.tableCard}>
            <ExplorerSwitcher activeTab={currentActiveRoute} />
            <CardContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>{l("explorer.txnId")}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l("explorer.age")}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l("explorer.from")}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l("explorer.to")}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l("explorer.value")}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l("explorer.cid")}</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pending ? (
                            <TableCell colSpan={6}>
                                <div className={classes.centered}>
                                    <Loader size="md" />
                                </div>
                            </TableCell>
                        ) : error ? (
                            <TableCell colSpan={6}>
                                <Typography>{getErrorLabel(error)}</Typography>
                            </TableCell>
                        ) : binanceSmartChain.length === 0 ? (
                            <TableCell colSpan={6}>
                                <Typography>{l("explorer.no-data")}</Typography>
                            </TableCell>
                        ) : (
                            binanceSmartChain.map(item => (
                                <TableRow>
                                    <TableCell>
                                        <input
                                            className={classes.tableInput}
                                            value={item.txnId}
                                            contentEditable={false}
                                        />
                                    </TableCell>
                                    <TableCell>{item.age}</TableCell>
                                    <TableCell>
                                        <input
                                            className={classes.tableInput}
                                            value={item.from}
                                            contentEditable={false}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            className={classes.tableInput}
                                            value={item.to}
                                            contentEditable={false}
                                        />
                                    </TableCell>
                                    <TableCell>{item.value}</TableCell>
                                    <TableCell>
                                        <input
                                            className={classes.tableInput}
                                            value={item.btfs_cid}
                                            contentEditable={false}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

const mapMoxToProps = ({ btfs }) => ({
    binanceSmartChain: btfs.binanceSmartChain,
    pending: btfs.pending,
    error: btfs.error
});

export const BinanceSmartChainTable = localized(
    inject(mapMoxToProps)(observer(_BinanceSmartChainTable))
);
