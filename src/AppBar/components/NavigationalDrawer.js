import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "mobx-router";
import {
    SwipeableDrawer,
    makeStyles,
    Typography,
    useTheme
} from "@material-ui/core";

import { DrawerMenu, DrawerUserInfo } from "./";
import { Routes } from "../../routes";

const useStyles = makeStyles(theme => ({
    importantInfoLink: {
        color: theme.palette.primary.main,
        marginLeft: 15,
        marginTop: 20,
        textDecoration: "none",
        fontStyle: "normal",
        fontWeight: "600 !important",
        fontSize: "15px",
        lineHeight: "18px"
    }
}));

const ImportantInfo = "{Important info}";

const _NavigationalDrawer = ({ drawerExpanded, setDrawerExpanded, routerStore }) => {
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
            <Link
                view={Routes.description}
                store={routerStore}
                style={{ textDecoration: "none" }}
            >
                <Typography
                    variant="body1"
                    color="primary"
                    classes={{ root: classes.importantInfoLink }}
                    onClick={() => setDrawerExpanded(false)}
                >
                    <strong>{ImportantInfo}</strong>
                </Typography>
            </Link>
            <DrawerUserInfo />
            <DrawerMenu />
        </SwipeableDrawer>
    );
};

const mapMobxToProps = ({ drawer, store }) => ({
    drawerExpanded: drawer.drawerExpanded,
    setDrawerExpanded: drawer.setDrawerExpanded,
    routerStore: store
});

export const NavigationalDrawer = inject(mapMobxToProps)(
    observer(_NavigationalDrawer)
);
