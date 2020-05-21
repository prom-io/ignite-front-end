import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from '@material-ui/core';

const _OpenLoginDialogButton = ({ setLoginDialogOpen, l }) => (
    <Button
        className="open_login_dialog_button"
        onClick={() => setLoginDialogOpen(true)}
        variant="contained"
        disableElevation
        color="primary"
    >
        <strong>{l('authorization.login')}</strong>
    </Button>
);

const mapMobxToProps = ({ login }) => ({ setLoginDialogOpen: login.setLoginDialogOpen });

export const OpenLoginDialogButton = inject(mapMobxToProps)(observer(_OpenLoginDialogButton));
