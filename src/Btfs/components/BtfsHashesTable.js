import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Card, CardHeader, CardContent, makeStyles, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { FadeLoader } from 'react-spinners';
import { trimString } from '../../utils/string-utils';
import { localized } from '../../localization/components';
import useTheme from '@material-ui/core/styles/useTheme';

const useStyles = makeStyles(theme => ({
    btfsHashesCard: {
        marginTop: '50px',
        overflow: 'auto',
    },
    link: {
        color: theme.palette.primary.main,
    },
    centered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
}));

const getErrorLabel = error => {
    if (error.response) {
        return `Could not load BTFS hashes, server responded with ${error.reponse.status} status`;
    }
    return 'Could not load BTFS hashes, server is unreachable';
};

const _BtfsHashesTable = ({ btfsHashes, pending, error, l, dateFnsLocale }) => {
    const classes = useStyles();
    const theme = useTheme();

    if (pending) {
        return <div className={classes.centered}><FadeLoader css="transform: scale(0.5)" color={theme.palette.primary.main} /></div>;
    } if (error) {
        return (
            <Typography>
                {getErrorLabel(error)}
            </Typography>
        );
    } if (btfsHashes.length === 0) {
        return (
            <Typography>
                {l('btfs.no-data')}
            </Typography>
        );
    }
    return (
        <Card className={classes.btfsHashesCard}>
            <CardHeader title="BTFS files info" />
            <CardContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>{l('btfs.cid')}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l('btfs.soter-link')}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l('btfs.created-at')}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l('btfs.node-wallet')}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l('btfs.synced')}</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {btfsHashes.map(btfsHash => (
                            <TableRow>
                                <TableCell>{btfsHash.cid}</TableCell>
                                <TableCell>
                                    <a
                                        href={btfsHash.soter_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={classes.link}
                                    >
                                        {trimString(btfsHash.soter_link, 25)}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    {format(new Date(btfsHash.created_at), 'dd MMMM yyyy HH:mm', { locale: dateFnsLocale })}
                                </TableCell>
                                <TableCell>
                                    {btfsHash.peer_wallet}
                                </TableCell>
                                <TableCell>
                                    {btfsHash.synced ? 'True' : 'False'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

const mapMoxToProps = ({ btfs }) => ({
    btfsHashes: btfs.btfsHashes,
    pending: btfs.pending,
    error: btfs.error,
});

export const BtfsHashesTable = localized(
    inject(mapMoxToProps)(observer(_BtfsHashesTable)),
);
