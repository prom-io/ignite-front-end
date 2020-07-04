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

import { trimString } from "../../utils/string-utils";
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
    tableCardContent: {
        padding: 0
    },
    link: {
        color: theme.palette.primary.main
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

const _DistributedStorageTable = ({
    tableHashes,
    pending,
    error,
    setModalIsOpen,
    fetchDistributedStorage,
    l,
    currentActiveRoute
}) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchDistributedStorage(newPage, rowsPerPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        fetchDistributedStorage(0, +event.target.value);
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
                                <strong>{l("explorer.cid")}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l("explorer.age")}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l("explorer.node-wallet")}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l("explorer.soter-link")}</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pending ? (
                            <TableCell colSpan={4}>
                                <div className={classes.centered}>
                                    <Loader size="md" />
                                </div>
                            </TableCell>
                        ) : error || tableHashes.data.length === 0 ? (
                            <TableCell colSpan={4}>
                                <Typography>{l("explorer.no-data")}</Typography>
                            </TableCell>
                        ) : (
                            tableHashes.data.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <input
                                            className={[
                                                classes.tableInput,
                                                classes.linkToModal
                                            ].join(" ")}
                                            value={item.btfsCid}
                                            contentEditable={false}
                                            onClick={() =>
                                                setModalIsOpen(
                                                    true,
                                                    "distributed-storage",
                                                    item.id
                                                )
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>{item.ago}</TableCell>
                                    <TableCell>
                                        <input
                                            className={classes.tableInput}
                                            value={item.address}
                                            contentEditable={false}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <a
                                            href={`https://sandbox.btfssoter.io/btfs/${item.btfsCid}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={classes.link}
                                        >
                                            {trimString(
                                                `https://sandbox.btfssoter.io/btfs/${item.btfsCid}`,
                                                35
                                            )}
                                        </a>
                                    </TableCell>
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
    fetchDistributedStorage: explorer.fetchDistributedStorage
});

export const DistributedStorageTable = localized(
    inject(mapMoxToProps)(observer(_DistributedStorageTable))
);
