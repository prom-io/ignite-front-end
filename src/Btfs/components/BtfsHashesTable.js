import React from "react";
import {inject, observer} from "mobx-react";
import {Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Card, CardHeader, CardContent, makeStyles, Typography} from "@material-ui/core";
import {format} from "date-fns";

const useStyles = makeStyles(() => ({
    btfsHashesCard: {
        overflow: "auto"
    },
    centered: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%"
    }
}));

const getErrorLabel = error => {
    if (error.response) {
        return `Could not load BTFS hashes, server responded with ${error.reponse.status} status`;
    } else {
        return "Could not load BTFS hashes, server is unreachable";
    }
};

const _BtfsHashesTable = ({btfsHashes, pending, error}) => {
    const classes = useStyles();

    if (pending) {
        return <CircularProgress size={25} color="primary" className={classes.centered}/>
    } else if (error) {
        return (
            <Typography>
                {getErrorLabel(error)}
            </Typography>
        )
    } else if (btfsHashes.length === 0) {
        return  (
            <Typography>
                No data is present
            </Typography>
        )
    } else {
        return (
            <Card className={classes.btfsHashesCard}>
                <CardHeader title="BTFS files info"/>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>BTFS CID</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Soter link</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Created at</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Synced</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {btfsHashes.map(btfsHash => (
                                <TableRow>
                                    <TableCell>{btfsHash.cid}</TableCell>
                                    <TableCell>
                                        <a href={btfsHash.soter_link}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                        >
                                            {btfsHash.soter_link}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(btfsHash.created_at), "dd MMMM yyyy")}
                                    </TableCell>
                                    <TableCell>
                                        {btfsHash.synced ? "True" : "False"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )
    }
};

const mapMoxToProps = ({btfs}) => ({
    btfsHashes: btfs.btfsHashes,
    pending: btfs.pending,
    error: btfs.error
});

export const BtfsHashesTable = inject(mapMoxToProps)(observer(_BtfsHashesTable));
