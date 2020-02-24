import React, {Fragment} from "react";
import {inject} from "mobx-react";
import {AppBar as MuiAppBar, makeStyles, Toolbar} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import {AppBarLink} from "./AppBarLink";
import {UserAppBarMenu} from "./UserAppBarMenu";
import {AppBarSearchTextField} from "./AppBarSearchTextField";
import {Routes} from "../../routes";

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: theme.palette.background.paper,
        border: "none"
    }
}));

const setIcon = (source) => <img src={source}/>;

const _AppBar = ({currentActiveRoute, routerStore}) => {
    const classes = useStyles();

    return (
        <Fragment>
            <MuiAppBar variant="outlined"
                       className="app-bar"
                       position="fixed"
            >
            <div className="header-logo"></div>
                <Toolbar className="tool-bar">
                    <div style={{flexGrow: 1}} className="tool-bar_list">
                        <AppBarLink text="Home"
                                    targetView={Routes.home}
                                    active={currentActiveRoute === "home"}
                                    icon={<HomeIcon/>}
                                    routerStore={routerStore}
                                    viewParameters={{}}
                        />
                        <AppBarLink text="Notifications"
                                    targetView={Routes.notifications}
                                    active={currentActiveRoute === "notifications"}
                                    icon={currentActiveRoute ===  "notifications" ? setIcon('./notifications_active.png') : setIcon('./notifications.png')}
                                    routerStore={routerStore}
                                    viewParameters={{}}
                        />
                        <AppBarLink text="Chat"
                                    targetView={Routes.chat}
                                    active={currentActiveRoute === "chat"}
                                    icon={currentActiveRoute ===  "chat" ? setIcon('./user-card-chat_active.png') : setIcon('./user-card-chat.png')}
                                    routerStore={routerStore}
                                    viewParameters={{}}
                        />
                        <AppBarLink text="Trends"
                                    targetView={Routes.trends}
                                    active={currentActiveRoute === "trends"}
                                    icon={currentActiveRoute ===  "trends" ? setIcon('./trends_active.png') : setIcon('./trends.png')}
                                    routerStore={routerStore}
                                    viewParameters={{}}
                        />
                    </div>
                    {/* <AppBarSearchTextField/> */}
                    <input type="text" placeholder="Search" disabled className="app-bar-search-field"/>
                    <UserAppBarMenu/>
                </Toolbar>
            </MuiAppBar>
            <Toolbar/>
        </Fragment>
    )
};

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const AppBar = inject(mapMobxToProps)(_AppBar);
