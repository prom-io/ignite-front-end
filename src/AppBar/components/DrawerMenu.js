import React from "react";
import {inject, observer} from "mobx-react";
import {MenuList, MenuItem, ListItemIcon, ListItemText, Divider, makeStyles} from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import {Link} from "mobx-router";
import {MuteIcon} from "../../icons/MuteIcon";
import {Routes} from "../../routes";
import {BlockIcon} from "../../icons/BlockIcon";
import {SettingsIcon} from "../../icons/SettingsIcon";
import {TermsOfServiceIcon} from "../../icons/TermsOfServiceIcon";
import {InfoIcon} from "../../icons/InfoIcon";
import {LogoutIcon} from "../../icons/LogoutIcon";

const useStyles = makeStyles(() => ({
    undecoratedLink: {
        textDecoration: "none",
        color: "inherit"
    }
}));

const _DrawerMenu = ({
    currentUser,
    doLogout,
    setDrawerExpanded,
    routerStore
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
        <MenuList >
            <Link view={Routes.userProfile}
                  params={{username: currentUser.id}}
                  store={routerStore}
                  className={classes.undecoratedLink}
            >
                <MenuItem onClick={handleMenuItemClick}>
                    <ListItemIcon>
                        <PersonOutlineIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Profile
                    </ListItemText>
                </MenuItem>
            </Link>
            <Divider/>
            <MenuItem disabled>
                <ListItemIcon>
                    <MuteIcon/>
                </ListItemIcon>
                <ListItemText>
                    Muted users
                </ListItemText>
            </MenuItem>
            <MenuItem disabled>
                <ListItemIcon>
                    <BlockIcon/>
                </ListItemIcon>
                <ListItemText>
                    Blocked users
                </ListItemText>
            </MenuItem>
            <MenuItem disabled>
                <ListItemIcon>
                    <SettingsIcon/>
                </ListItemIcon>
                <ListItemText>
                    Settings
                </ListItemText>
            </MenuItem>
            <Link view={Routes.terms}
                  store={routerStore}
                  className={classes.undecoratedLink}
            >
                <MenuItem onClick={handleMenuItemClick}>
                    <ListItemIcon>
                        <TermsOfServiceIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Terms of service
                    </ListItemText>
                </MenuItem>
            </Link>
            <MenuItem disabled>
                <ListItemIcon>
                    <InfoIcon/>
                </ListItemIcon>
                <ListItemText>
                    Help center
                </ListItemText>
            </MenuItem>
            <Link view={Routes.btfs}
                  store={routerStore}
                  className={classes.undecoratedLink}
            >
                <MenuItem onClick={handleMenuItemClick}>
                    <ListItemIcon>
                        <CloudUploadOutlined/>
                    </ListItemIcon>
                    <ListItemText>
                        Explore BTFS
                    </ListItemText>
                </MenuItem>
            </Link>
            <Divider/>
            <MenuItem onClick={handleLogoutItemClick}>
                <ListItemIcon>
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText>
                    Logout
                </ListItemText>
            </MenuItem>
        </MenuList>
    )
};

const mapMobxToProps = ({authorization, drawer, store}) => ({
    currentUser: authorization.currentUser,
    setDrawerExpanded: drawer.setDrawerExpanded,
    routerStore: store,
    doLogout: authorization.doLogout
});

export const DrawerMenu = inject(mapMobxToProps)(observer(_DrawerMenu));
