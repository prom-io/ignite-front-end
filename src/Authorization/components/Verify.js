import React from 'react';
import { observer } from 'mobx-react';
import { Button, CircularProgress, DialogContent, makeStyles, TextField, useTheme } from '@material-ui/core';
import { useStore } from '../../store/hooks';
import Loader from '../../components/Loader';
import { FadeLoader } from 'react-spinners';

const useStyles = makeStyles(() => ({
    contentBlock: {
        margin: '16px 0 30px 0',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
    },
    notes: {
        marginTop: '24px',
        color: '#A2A2A2',
        fontSize: '15px',
        fontFamily: 'Museo Sans Cyrl Regular',
        lineHeight: '26px',
        '& a': {
            color: '#FF5C01',
            cursor: 'pointer',
            fontFamily: 'Museo Sans Cyrl Bold',
        },
    },
    button: {
        width: '187px',
    },
}));

export const Verify = observer(() => {
    const classes = useStyles();
    const theme = useTheme();
    const { hashVerification } = useStore();
    const { setTransactionId, pending, transactionId, verifyHash } = hashVerification;

    return (
        <DialogContent>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="standard-basic"
                    label="Ethereum Txn Hash"
                    onChange={event => setTransactionId(event.target.value)}
                    value={transactionId}
                />
                <div className={classes.contentBlock}>
                    Publish a record to Ethereum blockchain that contains the
                    necessary hashcode and enter it’s Txn Hash here. We will create an Ignite account connected to that ETH wallet.
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
                    Verify hash
                </Button>
            </form>
            <div className={classes.notes}>
                <a>Note:</a>
                {' '}
                If you’d like to generate a hashcode for it on your own,
                please note that we use standard Niels Provos and David Mazières bcrypt password hashing function.
            </div>
        </DialogContent>
    );
});
