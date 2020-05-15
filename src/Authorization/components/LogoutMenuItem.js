import React from 'react';
import { inject } from 'mobx-react';
import { MenuItem, ListItemText } from '@material-ui/core';
import { localized } from '../../localization/components';

const _LogoutMenuItem = ({ doLogout, onClick, isMenuItem, isStaticFooterMenuItem, l }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }

        doLogout();
    };

    if (isStaticFooterMenuItem) {
        return (
            <li onClick={handleClick}>
                {l('menu.logout')}
            </li>
        );
    }

    if (isMenuItem) {
        return (
            <p onClick={handleClick}>
                {l('menu.logout')}
            </p>
        );
    }

    return (
        <MenuItem onClick={handleClick}>
            <ListItemText>
                {l('menu.logout')}
            </ListItemText>
        </MenuItem>
    );
};

const mapMobxToProps = ({ authorization }) => ({
    doLogout: authorization.doLogout,
});

export const LogoutMenuItem = localized(
    inject(mapMobxToProps)(_LogoutMenuItem),
);
