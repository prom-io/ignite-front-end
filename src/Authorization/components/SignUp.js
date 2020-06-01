import React from 'react';
import { Button, CircularProgress, DialogContent, makeStyles} from '@material-ui/core';
import {useStore} from "../../store/hooks";

const useStyles = makeStyles(() => ({
    contentDescription: {
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#1C1C1C',
        '& a': {
            color: '#FF5C01',
            cursor: 'pointer',
            fontFamily: 'Museo Sans Cyrl Bold',
        },
    },
    contentBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid #F1EBE8',
        marginTop: '32px',
        paddingTop: '32px',
        fontFamily: 'Museo Sans Cyrl Regular',
        '&>div': {
            width: '234px',
        },
        '& p': {
            margin: 0,
            fontSize: '20px',
        },
        '& span': {
            fontSize: '15px',
            fontFamily: 'Museo Sans Cyrl Bold',
        },
    },
    notes: {
        marginTop: '12px',
        color: '#A2A2A2',
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

export const SignUp = () => {
    const classes = useStyles();
    const { generateWallet, pending } = useStore().walletGeneration;

    return (
        <DialogContent>
            <span className={classes.contentDescription}>
                <a>Ignite</a>
                {' '}
                is a decentralized social network, based on blockchain technology.
                You have to use a special ID named
                <a>blockchain wallet address</a>
                {' '}
                to sign up.
            </span>
            <div className={classes.contentBlock}>
                <div>
                    <p>Recommended option:</p>
                    <span>Create a new blockchain wallet</span>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    classes={{
                        root: classes.button,
                    }}
                    onClick={generateWallet}
                    disabled={pending}
                >
                    {pending && <CircularProgress size={20} />}
                    Create Wallet
                </Button>
            </div>

            <div className={classes.contentBlock}>
                <div>
                    <span>
                        Use an existing wallet
                        <br />
                        (for advanced users only)
                    </span>
                </div>
                <Button
                    variant="outlined"
                    color="primary"
                    classes={{
                        root: classes.button,
                    }}
                >
                    Use Own Wallet
                </Button>
            </div>
            <div className={classes.notes}>
                <a>Note:</a>
                {' '}
                This option is suitable for blockchain experienced users only.
                It will require you to make a record to the Ethereum blockchain using your existing ERC20 wallet.
            </div>
        </DialogContent>
    );
};
