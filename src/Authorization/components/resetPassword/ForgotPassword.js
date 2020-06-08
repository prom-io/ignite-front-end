import React from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { useStore } from '../../../store/hooks';

const useStyles = makeStyles(() => ({
    contentDescription: {
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#1C1C1C',
    },
    contentBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid #F1EBE8',
        marginTop: '32px',
        paddingTop: '32px',
        fontFamily: 'Museo Sans Cyrl Regular',
        '&>div': {
            width: '320px',
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
    button: {
        width: '187px',
    },
    dialogRoot: {
        margin: '24px 62px 40px 62px',
    },
}));

export const ForgotPassword = observer(() => {
    const classes = useStyles();
    const { genericAuthorizationDialog } = useStore();
    const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;

    return (
        <DialogContent classes={{ root: classes.dialogRoot }}>
            <span className={classes.contentDescription}>
                We need to verify that you really are the owner of the Ignite account,
                which password you forgot but trying to reclaim access to it.
            </span>
            <div className={classes.contentBlock}>
                <div>
                    <p>Recommended option:</p>
                    <span>Enter the password recovery key (Private key)</span>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    classes={{
                        root: classes.button,
                    }}
                    onClick={() => setGenericAuthorizationDialogType('resetPassword')}
                >
                    Enter the key
                </Button>
            </div>
            <div className={classes.contentBlock}>
                <div>
                    <span>
                        Publish a record to Ethereum blockchain
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
                    Enter Txn hash
                </Button>
            </div>
        </DialogContent>
    );
});
