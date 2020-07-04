import React from "react";
import { inject, observer } from "mobx-react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Card,
    CardHeader,
    CardContent,
    makeStyles,
    Typography
} from "@material-ui/core";
import { format } from "date-fns";

import { trimString } from "../../utils/string-utils";
import { localized } from "../../localization/components";
import Loader from "../../components/Loader";
import { ExplorerSwitcher } from "./ExplorerSwitcher";

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
    }
}));

const _BtfsHashesTable = ({
    tableHashes,
    pending,
    error,
    l,
    dateFnsLocale,
    currentActiveRoute
}) => {
    const classes = useStyles();

    return (
        <Card className={classes.tableCard}>
            <ExplorerSwitcher activeTab={currentActiveRoute} />
            <CardContent className={classes.tableCardContent}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>{l("explorer.cid")}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l("explorer.soter-link")}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l("explorer.created-at")}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l("explorer.node-wallet")}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l("explorer.synced")}</strong>
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
                        ) : error || tableHashes.length === 0 ? (
                            <Typography>{l("explorer.no-data")}</Typography>
                        ) : (
                            tableHashes &&
                            tableHashes.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <input
                                            className={classes.tableInput}
                                            value={item.cid}
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
                                            {trimString(item.soter_link, 25)}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        {format(
                                            new Date(item.created_at),
                                            "dd MMMM yyyy HH:mm",
                                            { locale: dateFnsLocale }
                                        )}
                                    </TableCell>
                                    <TableCell>{item.peer_wallet}</TableCell>
                                    <TableCell>
                                        {item.synced ? "True" : "False"}
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
    tableHashes: explorer.tableHashes,
    pending: explorer.pending,
    error: explorer.error
});

export const BtfsHashesTable = localized(
    inject(mapMoxToProps)(observer(_BtfsHashesTable))
);
