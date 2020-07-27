import React from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles, TextField, useTheme } from '@material-ui/core';
import { FadeLoader } from 'react-spinners';
import { useLocalization, useStore } from '../../store/hooks';

const useStyles = makeStyles(theme => ({
    contentBlock: {
        margin: '16px 0 30px 0',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            marginTop: '12px 0 24px 0',
        },
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
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
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
    const { l } = useLocalization();
    const { setTransactionId, pending, transactionId, verifyHash } = hashVerification;

    return (
        <DialogContent>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="standard-basic"
                    label="Ethereum Txn Hash"
                    onChange={event => setTransactionId(event.target.value)}
                    value={transactionId}
                    fullWidth
                />
                <div className={classes.contentBlock}>
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
