import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Card,
    CardContent,
    makeStyles,
    Typography
} from "@material-ui/core";

import { localized } from "../../localization/components";
import Loader from "../../components/Loader";
import { ExplorerSwitcher } from "./ExplorerSwitcher";
import { ExplorerModal } from "./ExplorerModal";

const useStyles = makeStyles(theme => ({
    tableCard: {
        width: "100%",
        marginTop: "50px",
        overflow: "auto",
        [theme.breakpoints.down("sm")]: {
            "& td": {
                minWidth: "200px"
            }
        }
    },
    centered: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%"
    },
    tableCardContent: {
        padding: 0
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
    },
    linkToModal: {
        color: theme.palette.primary.main,
        textDecoration: "underline",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "none"
        }
    }
}));

const _EthereumMainnetTable = ({
    tableHashes,
    pending,
    error,
    setModalIsOpen,
    fetchEthereumMainne,
    l,
    currentActiveRoute
}) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchEthereumMainne(newPage, rowsPerPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        fetchEthereumMainne(0, +event.target.value);
    };

    return (
        <Card className={classes.tableCard}>
            <ExplorerModal />
            <ExplorerSwitcher activeTab={currentActiveRoute} />
            <CardContent className={classes.tableCardContent}>
                <Table stickyHeader aria-label="sticky table">
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pending ? (
                            <TableCell colSpan={5}>
                                <div className={classes.centered}>
                                    <Loader size="md" />
                                </div>
                            </TableCell>
                        ) : error || tableHashes.data.length === 0 ? (
                            <TableCell colSpan={5}>
                                <Typography>{l("explorer.no-data")}</Typography>
                            </TableCell>
                        ) : (
                            tableHashes &&
                            tableHashes.data.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <input
                                            className={[
                                                classes.tableInput,
                                                classes.linkToModal
                                            ].join(" ")}
                                            value={item.transactionHash}
                                            contentEditable={false}
                                            onClick={() =>
                                                setModalIsOpen(
                                                    true,
                                                    "ethereum-mainnet",
                                                    item
                                                )
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>{item.ago}</TableCell>
                                    <TableCell>
                                        <input
                                            className={classes.tableInput}
                                            value={item.fullTransactionData.from}
                                            contentEditable={false}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <input
                                            className={classes.tableInput}
                                            value={item.fullTransactionData.to}
                                            contentEditable={false}
                                        />
                                    </TableCell>
                                    <TableCell>{item.value}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={tableHashes.count || 0}
                    rowsPerPageOptions={[10, 25, 100]}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                />
            </CardContent>
        </Card>
    );
};

const mapMoxToProps = ({ explorer }) => ({
    tableHashes: explorer.tableHashes,
    pending: explorer.pending,
    error: explorer.error,
    setModalIsOpen: explorer.setModalIsOpen,
    fetchEthereumMainne: explorer.fetchEthereumMainne
});

export const EthereumMainnetTable = localized(
    inject(mapMoxToProps)(observer(_EthereumMainnetTable))
);