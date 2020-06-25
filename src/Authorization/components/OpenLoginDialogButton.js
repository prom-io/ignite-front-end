import React from 'react';
import { observer } from 'mobx-react';
import { Button, makeStyles } from '@material-ui/core';
import { useLocalization, useStore } from '../../store/hooks';

const useStyles = makeStyles(theme => ({
    buttonMargin: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: '30px',
            lineHeight: 'normal',
        },
    },
}));

export const OpenLoginDialogButton = observer(() => {
    const classes = useStyles();
    const {
        setGenericAuthorizationDialogOpen,
        setGenericAuthorizationDialogType,
    } = useStore().genericAuthorizationDialog;
    const { l } = useLocalization();

    const handleClick = () => {
        setGenericAuthorizationDialogType('login');
        setGenericAuthorizationDialogOpen(true);
    };

    return (
        <Button
            className={`${classes.buttonMargin} open_login_dialog_button`}
            onClick={handleClick}
            variant="contained"
            disableElevation
            color="primary"
        >
            <strong>{l('authorization.login')}</strong>
        </Button>
    );
});
