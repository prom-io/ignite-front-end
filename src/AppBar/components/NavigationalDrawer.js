import React from "react";
import {inject, observer} from "mobx-react";
import {SwipeableDrawer} from "@material-ui/core";
import {DrawerMenu} from "./DrawerMenu";
import {DrawerUserInfo} from "./DrawerUserInfo";

const _NavigationalDrawer = ({drawerExpanded, setDrawerExpanded}) => (
    <SwipeableDrawer onClose={() => setDrawerExpanded(false)}
                     onOpen={() => setDrawerExpanded(true)}
                     open={drawerExpanded}
                     PaperProps={{
                         style: {
                             width: 256
                         }
                     }}
                     BackdropProps={{
                         style: {
                             backgroundColor: "rgba(0,0,0,0)"
                         }
                     }}
    >
        <DrawerUserInfo/>
        <DrawerMenu/>
    </SwipeableDrawer>
);

const mapMobxToProps = ({drawer}) => ({
    drawerExpanded: drawer.drawerExpanded,
    setDrawerExpanded: drawer.setDrawerExpanded
});

export const NavigationalDrawer = inject(mapMobxToProps)(observer(_NavigationalDrawer));
