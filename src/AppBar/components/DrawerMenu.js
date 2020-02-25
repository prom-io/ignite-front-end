import React from "react";
import {MenuList, MenuItem, ListItemIcon, ListItemText, Divider} from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import {Link} from "mobx-router";
import {MuteIcon} from "../../icons/MuteIcon";
import {Routes} from "../../routes";
import {BlockIcon} from "../../icons/BlockIcon";
import {SettingsIcon} from "../../icons/SettingsIcon";

const _DrawerMenu = ({
    currentUser,
    doLogout,
    setDrawerOpen
}) => {
    const handleMenuItemClick = () => {
        setDrawerOpen(false);
    };

    const handleLogoutItemClick = () => {
        handleMenuItemClick();
        doLogout();
    };

    return (
        <MenuList>
            <Link view={Routes.userProfile}
                  params={{username: currentUser.username}}
                  style={{
                      textDecoration: "none",
                      color: "inherit"
                  }}
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
        </MenuList>
    )
}
