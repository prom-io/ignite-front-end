import React from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { useStore, useLocalization } from '../../../store/hooks';

const useStyles = makeStyles(() => ({
    contentDescription: {
        paddingBottom: '16px',
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#1C1C1C',
        borderBottom: '1px solid #F1EBE8',
    },
    contentBlock: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '24px',
        fontFamily: 'Museo Sans Cyrl Regular',
        '& p': {
            margin: 0,
            fontFamily: 'Museo Sans Cyrl Bold',
            fontSize: '20px',
            lineHeight: '18px',
        },
        '& span': {
            marginTop: 8,
            fontSize: '15px',
        },
    },
    button: {
        width: '187px',
        marginTop: '40px',
        alignSelf: 'center',
    },
}));

export const PasswordUpdated = observer(() => {
    const classes = useStyles();
    const { passwordChange, genericAuthorizationDialog } = useStore();
    const { passwordChangeForm } = passwordChange;
    const { setGenericAuthorizationDialogOpen } = genericAuthorizationDialog;

    return (
        <DialogContent>
            <div className={classes.contentDescription}>
                Your password has been successfully changed. Use your new password to log in.
            </div>

            <div className={classes.contentBlock}>
                <p>Your login is</p>
                <span>{passwordChangeForm.walletAddress}</span>

                <Button
                    variant="contained"
                    color="primary"
                    classes={{
                        root: classes.button,
                    }}
                    onClick={() => setGenericAuthorizationDialogOpen(false)}
                >
                    Ok
                </Button>
            </div>
        </DialogContent>
    );
});
