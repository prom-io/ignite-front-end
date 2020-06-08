import React from 'react';
import { inject, observer } from 'mobx-react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BtfsIcon } from '../../icons/BtfsIcon';

const _OpenStatusBtfsInfoDialogButton = ({ btfsInfo, setBtfsInfo, setBtfsInfoDialogOpen }) => {
    if (!btfsInfo) {
        return null;
    }

    const handleClick = () => {
        setBtfsInfo(btfsInfo);
        setBtfsInfoDialogOpen(true);
    };

    return (
        <IconButton
            color="inherit"
            onClick={handleClick}
        >
            <BtfsIcon color="#A2A2A2" />
        </IconButton>
    );
};

const mapMobxToProps = ({ statusBtfsInfo }) => ({
    setBtfsInfo: statusBtfsInfo.setBtfsInfo,
    setBtfsInfoDialogOpen: statusBtfsInfo.setBtfsInfoDialogOpen,
});

export const OpenStatusBtfsInfoDialogButton = inject(mapMobxToProps)(observer(_OpenStatusBtfsInfoDialogButton));
