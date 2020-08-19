import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "mobx-router";
import {
    Divider,
    ListItemIcon,
    ListItemText,
    makeStyles,
    MenuItem,
    MenuList
} from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import { MuteIcon } from "../../icons/MuteIcon";
import { Routes } from "../../routes";
import { BlockIcon } from "../../icons/BlockIcon";
import { TermsAndPoliciesIcon } from "../../icons/TermsAndPoliciesIcon";
import { InfoIcon } from "../../icons/InfoIcon";
import { LogoutIcon } from "../../icons/LogoutIcon";
import { BtfsIcon } from "../../icons/BtfsIcon";
import { localized } from "../../localization/components";

const useStyles = makeStyles(() => ({
    undecoratedLink: {
        textDecoration: "none",
        color: "inherit"
    },
    listRoot: {
        minHeight: "300px"
    }
}));

const _DrawerMenu = ({
    currentUser,
    doLogout,
    setDrawerExpanded,
    routerStore,
    l
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
        <MenuList classes={{ root: classes.listRoot }}>
            <Link
                view={Routes.userProfile}
                params={{ username: currentUser.username }}
                store={routerStore}
                className={classes.undecoratedLink}
            >
                <MenuItem onClick={handleMenuItemClick}>
                    <ListItemIcon>
                        <PersonOutlineIcon />
                    </ListItemIcon>
                    <ListItemText>{l("menu.profile")}</ListItemText>
                </MenuItem>
            </Link>
            <Divider />
            <MenuItem disabled>
                <ListItemIcon>
                    <MuteIcon />
                </ListItemIcon>
                <ListItemText>{l("menu.muted-users")}</ListItemText>
            </MenuItem>
            <MenuItem disabled>
                <ListItemIcon>
                    <BlockIcon />
                </ListItemIcon>
                <ListItemText>{l("menu.blocked-users")}</ListItemText>
            </MenuItem>
            <Link
                view={Routes.terms}
                store={routerStore}
                className={classes.undecoratedLink}
            >
                <MenuItem onClick={handleMenuItemClick}>
                    <ListItemIcon>
                        <TermsAndPoliciesIcon />
                    </ListItemIcon>
                    <ListItemText>{l("terms-of-service")}</ListItemText>
                </MenuItem>
            </Link>
            <MenuItem disabled>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText>{l("menu.help-center")}</ListItemText>
            </MenuItem>
            <Link
                view={Routes.ethereumPlasma}
                store={routerStore}
                className={classes.undecoratedLink}
            >
                <MenuItem onClick={handleMenuItemClick}>
                    <ListItemIcon>
                        <BtfsIcon />
                    </ListItemIcon>
                    <ListItemText>{l("menu.explore-btfs")}</ListItemText>
                </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={handleLogoutItemClick}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText>{l("menu.logout")}</ListItemText>
            </MenuItem>
        </MenuList>
    );
};

const mapMobxToProps = ({ authorization, drawer, store }) => ({
    currentUser: authorization.currentUser,
    setDrawerExpanded: drawer.setDrawerExpanded,
    routerStore: store,
    doLogout: authorization.doLogout
});

export const DrawerMenu = localized(inject(mapMobxToProps)(observer(_DrawerMenu)));
