import React from "react";
import { inject, observer } from "mobx-react";
import {
    SwipeableDrawer,
    makeStyles,
    Typography,
    useTheme
} from "@material-ui/core";

import { DrawerMenu, DrawerUserInfo } from "./";

const useStyles = makeStyles(theme => ({
    importantInfoLink: {
        color: theme.palette.primary.main,
        marginLeft: 15,
        marginTop: 20,
        textDecoration: "none",
        fontWeight: "600",
        fontSize: "15px",
        lineHeight: "18px"
    }
}));

const ImportantInfo = "{Important info}";

const _NavigationalDrawer = ({ drawerExpanded, setDrawerExpanded }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <SwipeableDrawer
            onClose={() => setDrawerExpanded(false)}
            onOpen={() => setDrawerExpanded(true)}
            open={drawerExpanded}
            className="navigation_drawer_menu"
            PaperProps={{
                style: {
                    width: 256,
                    overflowY: "auto",
                    display: "block",
                    "-webkit-overflow-scrolling": "touch",
                    backgroundColor: theme.palette.background.light
                }
            }}
            BackdropProps={{
                style: {
                    backgroundColor: "rgba(0,0,0,0.4)"
                }
            }}
        >
            <Typography
                variant="body1"
                color="primary"
                classes={{ root: classes.importantInfoLink }}
            >
                {ImportantInfo}
            </Typography>
            <DrawerUserInfo />
            <DrawerMenu />
        </SwipeableDrawer>
    );
};

const mapMobxToProps = ({ drawer }) => ({
    drawerExpanded: drawer.drawerExpanded,
    setDrawerExpanded: drawer.setDrawerExpanded
});

export const NavigationalDrawer = inject(mapMobxToProps)(
    observer(_NavigationalDrawer)
);
