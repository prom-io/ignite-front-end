import React from "react";
import {inject, observer} from "mobx-react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableRow, makeStyles, withMobileDialog} from "@material-ui/core";
import {format} from "date-fns";
import {trimString} from "../../utils/string-utils";

const useStyles = makeStyles(theme => ({
    soterLink: {
        color: theme.palette.primary.main
    }
}));

const _StatusBtfsInfoDialog = ({btfsInfo, btfsInfoDialogOpen, setBtfsInfoDialogOpen, fullScreen}) => {
    const classes = useStyles();

    if (!btfsInfo) {
        return null;
    }

    return (
        <Dialog open={btfsInfoDialogOpen}
                onClose={() => setBtfsInfoDialogOpen(false)}
                fullScreen={fullScreen}
                fullWidth
                maxWidth="md"
        >
            <DialogTitle>
                Bit Torrent File System Block Info
            </DialogTitle>
            <DialogContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <strong>BTFS CID</strong>
                            </TableCell>
                            <TableCell>{btfsInfo.cid}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <strong>Created at</strong>
                            </TableCell>
                            <TableCell>{format(new Date(btfsInfo.created_at), "dd MMMM yyyy HH:mm")}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <strong>Sync Status</strong>
                            </TableCell>
                            <TableCell>
                                {btfsInfo.synced ? "Synchronized" : "Not synchronized"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <strong>Soter link</strong>
                            </TableCell>
                            <TableCell>
                                <a href={btfsInfo.soter_link}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className={classes.soterLink}
                                >
                                    {trimString(btfsInfo.soter_link, 55)}
                                </a>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined"
                        color="primary"
                        onClick={() => setBtfsInfoDialogOpen(false)}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
};

const mapMobxToProps = ({statusBtfsInfo}) => ({
    btfsInfo: statusBtfsInfo.btfsInfo,
    setBtfsInfoDialogOpen: statusBtfsInfo.setBtfsInfoDialogOpen,
    btfsInfoDialogOpen: statusBtfsInfo.btfsInfoDialogOpen
});

export const StatusBtfsInfoDialog = withMobileDialog()(
    inject(mapMobxToProps)(observer(_StatusBtfsInfoDialog))
);
