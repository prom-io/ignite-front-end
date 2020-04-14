import React, {Fragment} from "react";
import {inject, observer} from "mobx-react";
import {AppBar as MuiAppBar, Hidden, Toolbar, withTheme} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import {AppBarLink} from "./AppBarLink";
import {UserAppBarMenu} from "./UserAppBarMenu";
import {Routes} from "../../routes";
import {
    CreateStatusDialog,
    OpenCreateStatusDialogButton,
    OpenCreateStatusDialogFloatingActionButton
} from "../../Status/components";
import {ExpandDrawerButton} from "./ExpandDrawerButton";
import {NavigationalDrawer} from "./NavigationalDrawer";
import {BellIcon} from "../../icons/BellIcon";
import {ChatIcon} from "../../icons/ChatIcon";
import {TrendsIcon} from "../../icons/TrendsIcon";
import {LoginDialog} from "../../Authorization/components/LoginDialog";
import {OpenLoginDialogButton} from "../../Authorization/components";
import {SignUpDialog} from "../../SignUp/components";

const _AppBar = ({currentActiveRoute, routerStore, currentUser, setLoginDialogOpen, theme}) => {
    return (
        <Fragment>
            <Hidden mdUp>
                {currentUser ? <ExpandDrawerButton/> : <div></div>}
            </Hidden>
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
                                    icon={<BellIcon color={currentActiveRoute === "notifications" && theme.palette.primary.main}/>}
                                    routerStore={routerStore}
                                    viewParameters={{}}
                        />
                        <AppBarLink text="Chat"
                                    targetView={Routes.chat}
                                    active={currentActiveRoute === "chat"}
                                    icon={<ChatIcon color={currentActiveRoute === "chat" && theme.palette.primary.main}/>}
                                    routerStore={routerStore}
                                    viewParameters={{}}
                        />
                        <AppBarLink text="Trends"
                                    targetView={Routes.trends}
                                    active={currentActiveRoute === "trends"}
                                    icon={<TrendsIcon color={currentActiveRoute === "trends" && theme.palette.primary.main}/>}
                                    routerStore={routerStore}
                                    viewParameters={{}}
                        />
                        <Hidden mdDown>
                            <AppBarLink text="Explore BTFS"
                                        targetView={Routes.btfs}
                                        active={currentActiveRoute === "btfs"}
                                        icon={<CloudUploadOutlined color={currentActiveRoute === "btfs" ? theme.palette.primary.main : "inherit"}/>}
                                        routerStore={routerStore}
                                        viewParameters={{}}
                            />
                        </Hidden>
                    </div>
                    <input type="text" placeholder="Search" disabled className="app-bar-search-field"/>
                    <Hidden smDown>
                        <UserAppBarMenu/>
                    </Hidden>
                    {currentUser ? (
                        <Hidden smDown>
                            <OpenCreateStatusDialogButton/>
                        </Hidden>
                    )
                        : <div></div>
                    }
                    {!currentUser && (<OpenLoginDialogButton/>)}
                    <div className="mobile_header">
                        <LoginDialog/>
                        <SignUpDialog onLoginButtonClick={() => setLoginDialogOpen(true)}/>
                        <img src="/search.png" />
                    </div>
                </Toolbar>
            </MuiAppBar>
            <Hidden smDown>
                <Toolbar/>
            </Hidden>
            <Hidden mdUp>
                {currentUser ? (
                    <OpenCreateStatusDialogFloatingActionButton/>
                )
                    : <div></div>
                }
            </Hidden>
            <NavigationalDrawer/>
            <CreateStatusDialog/>
        </Fragment>
    )
};

const mapMobxToProps = ({store, authorization, login}) => ({
    routerStore: store,
    currentUser: authorization.currentUser,
    setLoginDialogOpen: login.setLoginDialogOpen
});

export const AppBar = withTheme(
    inject(mapMobxToProps)(observer(_AppBar))
);
