import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from '@material-ui/core';
import { localized } from '../../localization/components';

const _OpenUpdateUserProfileDialogButton = ({ setUpdateUserProfileDialogOpen, l }) => (
    <Button
        color="primary"
        variant="outlined"
        onClick={() => setUpdateUserProfileDialogOpen(true)}
    >
        {l('user.update-profile')}
    </Button>
);

const mapMobxToProps = ({ userProfileUpdate }) => ({
    setUpdateUserProfileDialogOpen: userProfileUpdate.setUpdateUserProfileDialogOpen,
});

export const OpenUpdateUserProfileDialogButton = localized(
    inject(mapMobxToProps)(observer(_OpenUpdateUserProfileDialogButton)),
);
