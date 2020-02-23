import React from "react";
import {inject} from "mobx-react";
import {MenuItem, ListItemText} from "@material-ui/core";

const _LogoutMenuItem = ({doLogout, onClick}) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }

        doLogout();
    };

    return (
        <MenuItem onClick={handleClick}>
            <ListItemText>
                Log out
            </ListItemText>
        </MenuItem>
    )
};

const mapMobxToProps = ({authorization}) => ({
    doLogout: authorization.doLogout
});

export const LogoutMenuItem = inject(mapMobxToProps)(_LogoutMenuItem);
