import React from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import { useStore, useLocalization } from '../../../store/hooks';

const useStyles = makeStyles(theme => ({
    contentDescription: {
        paddingBottom: '16px',
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#1C1C1C',
        borderBottom: '1px solid #F1EBE8',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
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
            fontSize: '15px',
        },
        [theme.breakpoints.down('sm')]: {
            '& span': {
                fontSize: '14px',
                wordBreak: 'break-all',
            },
            marginTop: '18px',
        },
    },
    contentBlockDescription: {
        marginTop: 8,
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
    const { l } = useLocalization();
    const { passwordChangeForm } = passwordChange;
    const { setGenericAuthorizationDialogOpen } = genericAuthorizationDialog;

    return (
        <DialogContent>
            <div className={classes.contentDescription}>
                {l('password-recovery.success')}
            </div>
            <div className={classes.contentBlock}>
                <p>{l('sign-up.your-login-is')}</p>
                <span className={classes.contentBlockDescription}>{passwordChangeForm.walletAddress}</span>
                <Button
                    variant="contained"
                    color="primary"
                    classes={{
                        root: classes.button,
                    }}
                    onClick={() => setGenericAuthorizationDialogOpen(false)}
                >
                    {l('sign-up.ok')}
                </Button>
            </div>
        </DialogContent>
    );
});
