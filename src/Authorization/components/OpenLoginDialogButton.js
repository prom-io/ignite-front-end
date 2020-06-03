import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from '@material-ui/core';
import { localized } from '../../localization/components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    buttonMargin: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: '30px',
        },
    }
}));

const _OpenLoginDialogButton = ({ setLoginDialogOpen, l }) => (
    <Button
        className="open_login_dialog_button"
        onClick={() => setLoginDialogOpen(true)}
        variant="contained"
        disableElevation
        color="primary"
        classes={{root:useStyles().buttonMargin}}
    >
        <strong>{l('authorization.login')}</strong>
    </Button>
);

const mapMobxToProps = ({ login }) => ({ setLoginDialogOpen: login.setLoginDialogOpen });

export const OpenLoginDialogButton = localized(
    inject(mapMobxToProps)(observer(_OpenLoginDialogButton)),
);
