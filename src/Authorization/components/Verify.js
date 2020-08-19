import React from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles, TextField, useTheme } from '@material-ui/core';
import { FadeLoader } from 'react-spinners';
import { useLocalization, useStore } from '../../store/hooks';
import {authorizationDialogsStyles} from '../../styles/material/authorizationDialogsStyles'

export const Verify = observer(() => {
    const classes = authorizationDialogsStyles();
    const theme = useTheme();
    const { hashVerification } = useStore();
    const { l } = useLocalization();
    const { setTransactionId, pending, transactionId, verifyHash } = hashVerification;

    return (
        <DialogContent>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="standard-basic"
                    label="Ethereum or Binance Chain Txn Hash"
                    onChange={event => setTransactionId(event.target.value)}
                    value={transactionId}
                    fullWidth
                />
                <div className={classes.content}>
                    {l('sign-up.hash.verification.publish-record')}
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    classes={{
                        root: classes.button,
                    }}
                    onClick={verifyHash}
                    disabled={pending}
                >
                    {pending && <FadeLoader color={theme.palette.primary.main} css="position: absolute; transform: scale(0.4); top: -4px; left: 74px" /> }
                    {l('sign-up.hash.verification.verify-hash')}
                </Button>
            </form>
            <div className={classes.notes}>
                <a>
                    {l('sign-up.note')}
                    :
                </a>
                {' '}
                {l('sign-up.hash.verification.algorithm')}
            </div>
        </DialogContent>
    );
});
