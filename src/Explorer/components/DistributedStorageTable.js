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

import { trimString } from "../../utils/string-utils";
import { localized } from "../../localization/components";
import Loader from "../../components/Loader";
import { ExplorerSwitcher } from "./ExplorerSwitcher";

const useStyles = makeStyles(theme => ({
    tableCard: {
        width: "100%",
        marginTop: "50px",
        overflow: "auto",
        [theme.breakpoints.down('sm')]: {
            '& td': {
                minWidth: '200px',
            }
        }
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
    }
}));

const getErrorLabel = error => {
    if (error.response) {
        return `Could not load BTFS hashes, server responded with ${error.reponse.status} status`;
    }
    return "Could not load BTFS hashes, server is unreachable";
};

const _DistributedStorageTable = ({
    distributedStorage,
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
                        ) : error ? (
                            <TableCell colSpan={4}>
                                <Typography>{getErrorLabel(error)}</Typography>
                            </TableCell>
                        ) : distributedStorage.length === 0 ? (
                            <TableCell colSpan={4}>
                                <Typography>{l("explorer.no-data")}</Typography>
                            </TableCell>
                        ) : (
                            distributedStorage.map(item => (
                                <TableRow>
                                    <TableCell>
                                        <input
                                            className={classes.tableInput}
                                            value={item.btfs_cid}
                                            contentEditable={false}
                                        />
                                    </TableCell>
                                    <TableCell>{item.age}</TableCell>
                                    <TableCell>
                                        <input
                                            className={classes.tableInput}
                                            value={item.node}
                                            contentEditable={false}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <a
                                            href={item.soter_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={classes.link}
                                        >
                                            {trimString(item.soter_link, 35)}
                                        </a>
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

const mapMoxToProps = ({ explorer }) => ({
    distributedStorage: explorer.distributedStorage,
    pending: explorer.pending,
    error: explorer.error
});

export const DistributedStorageTable = localized(
    inject(mapMoxToProps)(observer(_DistributedStorageTable))
);
