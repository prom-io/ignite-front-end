import React from "react";
import {inject} from "mobx-react";
import {MenuItem, ListItemText} from "@material-ui/core";

const _LogoutMenuItem = ({doLogout, onClick, isMenuItem, isStaticFooterMenuItem}) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }

        doLogout();
    };

    if (isStaticFooterMenuItem) {
        return (
            <li onClick={handleClick}>
                Logout
            </li>
        )
    }

    if (isMenuItem) {
        return (
            <p onClick={handleClick}>
                Logout
            </p>
        )
    }

    return (
        <MenuItem onClick={handleClick}>
            <ListItemText>
                Logout
            </ListItemText>
        </MenuItem>
    )
};

const mapMobxToProps = ({authorization}) => ({
    doLogout: authorization.doLogout
});

export const LogoutMenuItem = inject(mapMobxToProps)(_LogoutMenuItem);
