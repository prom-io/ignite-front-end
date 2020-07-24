import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
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
    Typography,
} from '@material-ui/core';

import { localized } from '../../localization/components';
import Loader from '../../components/Loader';
import { ExplorerSwitcher } from './ExplorerSwitcher';
import { ExplorerModal } from './ExplorerModal';

const useStyles = makeStyles(theme => ({
    tableCard: {
        width: '100%',
        marginTop: '50px',
        overflow: 'auto',
    },
    centered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    tableCardContent: {
        padding: 0,
    },
    tableInput: {
        fontFamily: 'Museo Sans Cyrl Regular',
        border: 'none',
        background: theme.palette.background.paper,
        padding: '6px',
        width: '100%',
        fontSize: '0.875rem',
        color: 'rgba(0, 0, 0, 0.87)',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        '&:focus': {
            outline: `1px solid ${theme.palette.border.main}`,
        },
        '&:after': {
            content: "'...'",
        },
        '&:not(:focus):after': {
            content: '',
        },
    },
    linkToModal: {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'none',
        },
    },
    paginator: {
        padding: '10px 0 !important',
        marginBottom: 25,
    },
}));

const _BinanceSmartChainTable = ({
    binanceHashes,
    pending,
    error,
    setModalIsOpen,
    fetchBinanceSmartChain,
    l,
    currentActiveRoute,
}) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchBinanceSmartChain(newPage, rowsPerPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
        fetchBinanceSmartChain(0, +event.target.value);
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
                                <strong>{l('explorer.txnId')}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l('explorer.age')}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l('explorer.from')}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l('explorer.to')}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l('explorer.value')}</strong>
                            </TableCell>
                            <TableCell>
                                <strong>{l('explorer.cid')}</strong>
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
                        ) : error || binanceHashes.data.length === 0 ? (
                            <TableCell colSpan={6}>
                                <Typography>{l('explorer.no-data')}</Typography>
                            </TableCell>
                        ) : (
                            binanceHashes
                            && binanceHashes.data.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <input
                                            className={[
                                                classes.tableInput,
                                                classes.linkToModal,
                                            ].join(' ')}
                                            value={item.transactionHash}
                                            contentEditable={false}
                                            onClick={() => setModalIsOpen(
                                                true,
                                                'binance-smart-chain',
                                                item,
                                            )}
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
                                    <TableCell>
                                        <input
                                            className={classes.tableInput}
                                            value={item.btfsCid}
                                            contentEditable={false}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={binanceHashes.count || 0}
                    rowsPerPageOptions={[10, 25, 100]}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    classes={{ root: classes.paginator }}
                />
            </CardContent>
        </Card>
    );
};

const mapMoxToProps = ({ explorer }) => ({
    binanceHashes: explorer.binanceHashes,
    pending: explorer.pending.binance,
    error: explorer.error,
    setModalIsOpen: explorer.setModalIsOpen,
    fetchBinanceSmartChain: explorer.fetchBinanceSmartChain,
});

export const BinanceSmartChainTable = localized(
    inject(mapMoxToProps)(observer(_BinanceSmartChainTable)),
);
