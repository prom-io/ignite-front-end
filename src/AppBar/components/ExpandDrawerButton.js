import React from 'react';
import { inject, observer } from 'mobx-react';
import { IconButton, Avatar } from '@material-ui/core';

const _ExpandDrawerButton = ({ setDrawerExpanded, currentUser }) => (
    <IconButton onClick={() => setDrawerExpanded(true)} className="expand_drawer_button">
        <Avatar src={currentUser.avatar} />
    </IconButton>
);

const mapMobxToProps = ({ drawer, authorization }) => ({
    setDrawerExpanded: drawer.setDrawerExpanded,
    currentUser: authorization.currentUser,
});

export const ExpandDrawerButton = inject(mapMobxToProps)(observer(_ExpandDrawerButton));
