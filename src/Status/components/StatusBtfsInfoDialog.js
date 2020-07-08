import React from 'react';
import { inject, observer } from 'mobx-react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableRow,
    withMobileDialog,
} from '@material-ui/core';
import { format } from 'date-fns';
import { localized } from '../../localization/components';
import { trimString } from '../../utils/string-utils';

const useStyles = makeStyles(theme => ({
    soterLink: {
        color: theme.palette.primary.main,
    },
}));

const _StatusBtfsInfoDialog = ({ btfsInfo, btfsInfoDialogOpen, setBtfsInfoDialogOpen, fullScreen, l }) => {
    const classes = useStyles();

    if (!btfsInfo) {
        return null;
    }

    return (
        <Dialog
            open={btfsInfoDialogOpen}
            onClose={() => setBtfsInfoDialogOpen(false)}
            fullScreen={fullScreen}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                {l('btfs.block-info')}
            </DialogTitle>
            <DialogContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <strong>{l('btfs.cid')}</strong>
                            </TableCell>
                            <TableCell>{btfsInfo.cid}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <strong>{l('btfs.created-at')}</strong>
                            </TableCell>
                            <TableCell>{format(new Date(btfsInfo.created_at), 'dd MMMM yyyy HH:mm')}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <strong>{l('btfs.sync.status')}</strong>
                            </TableCell>
                            <TableCell>
                                {btfsInfo.synced ? l('btfs.sync.status.synchronized') : l('btfs.sync.status.not-synchronized')}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <strong>{l('btfs.arweave-link')}</strong>
                            </TableCell>
                            <TableCell>
                                <a
                                    href={`https://arweave.net/${btfsInfo.cid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={classes.soterLink}
                                >
                                    {trimString(`https://arweave.net/${btfsInfo.cid}`, 55)}
                                </a>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setBtfsInfoDialogOpen(false)}
                >
                    {l('btfs.close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapMobxToProps = ({ statusBtfsInfo }) => ({
    btfsInfo: statusBtfsInfo.btfsInfo,
    setBtfsInfoDialogOpen: statusBtfsInfo.setBtfsInfoDialogOpen,
    btfsInfoDialogOpen: statusBtfsInfo.btfsInfoDialogOpen,
});

export const StatusBtfsInfoDialog = withMobileDialog()(
    localized(
        inject(mapMobxToProps)(observer(_StatusBtfsInfoDialog)),
    ),
);
