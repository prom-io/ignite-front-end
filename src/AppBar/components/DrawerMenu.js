import React from 'react';
import { inject, observer } from 'mobx-react';
import { Divider, ListItemIcon, ListItemText, makeStyles, MenuItem, MenuList } from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Link } from 'mobx-router';
import { MuteIcon } from '../../icons/MuteIcon';
import { Routes } from '../../routes';
import { BlockIcon } from '../../icons/BlockIcon';
import { SettingsIcon } from '../../icons/SettingsIcon';
import { TermsOfServiceIcon } from '../../icons/TermsOfServiceIcon';
import { InfoIcon } from '../../icons/InfoIcon';
import { LogoutIcon } from '../../icons/LogoutIcon';
import { BtfsIcon } from '../../icons/BtfsIcon';
import { localized } from '../../localization/components';

const useStyles = makeStyles(() => ({
    undecoratedLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

const _DrawerMenu = ({
    currentUser,
    doLogout,
    setDrawerExpanded,
    routerStore,
    l,
}) => {
    const classes = useStyles();

    const handleMenuItemClick = () => {
        setDrawerExpanded(false);
    };

    const handleLogoutItemClick = () => {
        handleMenuItemClick();
        doLogout();
    };

    if (!currentUser) {
        return null;
    }

    return (
        <MenuList>
            <Link
                view={Routes.userProfile}
                params={{ username: currentUser.id }}
                store={routerStore}
                className={classes.undecoratedLink}
            >
                <MenuItem onClick={handleMenuItemClick}>
                    <ListItemIcon>
                        <PersonOutlineIcon />
                    </ListItemIcon>
                    <ListItemText>
                        {l('menu.profile')}
                    </ListItemText>
                </MenuItem>
            </Link>
            <Divider />
            <MenuItem disabled>
                <ListItemIcon>
                    <MuteIcon />
                </ListItemIcon>
                <ListItemText>
                    {l('menu.muted-users')}
                </ListItemText>
            </MenuItem>
            <MenuItem disabled>
                <ListItemIcon>
                    <BlockIcon />
                </ListItemIcon>
                <ListItemText>
                    {l('menu.blocked-users')}
                </ListItemText>
            </MenuItem>
            <Link
                view={Routes.terms}
                store={routerStore}
                className={classes.undecoratedLink}
            >
                <MenuItem onClick={handleMenuItemClick}>
                    <ListItemIcon>
                        <TermsOfServiceIcon />
                    </ListItemIcon>
                    <ListItemText>
                        {l('terms-of-service')}
                    </ListItemText>
                </MenuItem>
            </Link>
            <MenuItem disabled>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText>
                    {l('menu.help-center')}
                </ListItemText>
            </MenuItem>
            <Link
                view={Routes.btfs}
                store={routerStore}
                className={classes.undecoratedLink}
            >
                <MenuItem onClick={handleMenuItemClick}>
                    <ListItemIcon>
                        <BtfsIcon />
                    </ListItemIcon>
                    <ListItemText>
                        {l('menu.explore-btfs')}
                    </ListItemText>
                </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={handleLogoutItemClick}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText>
                    {l('menu.logout')}
                </ListItemText>
            </MenuItem>
        </MenuList>
    );
};

const mapMobxToProps = ({ authorization, drawer, store }) => ({
    currentUser: authorization.currentUser,
    setDrawerExpanded: drawer.setDrawerExpanded,
    routerStore: store,
    doLogout: authorization.doLogout,
});

export const DrawerMenu = localized(
    inject(mapMobxToProps)(observer(_DrawerMenu)),
);
