import React from 'react';
import { observer } from 'mobx-react';
import { Button } from '@material-ui/core';
import { useLocalization, useStore } from '../../store/hooks';

export const OpenLoginDialogButton = observer(() => {
    const { setGenericAuthorizationDialogOpen, setGenericAuthorizationDialogType } = useStore().genericAuthorizationDialog;
    const { l } = useLocalization();

    const handleClick = () => {
        setGenericAuthorizationDialogType('login');
        setGenericAuthorizationDialogOpen(true);
    };

    return (
        <Button
            className="open_login_dialog_button"
            onClick={handleClick}
            variant="contained"
            disableElevation
            color="primary"
        >
            <strong>{l('authorization.login')}</strong>
        </Button>
    );
});
