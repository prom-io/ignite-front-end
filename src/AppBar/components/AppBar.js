import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { AppBar as MuiAppBar, Hidden, Toolbar, withTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomHomeOutlinedIcon from '../../icons/CustomHomeOutlinedIcon';
import { AppBarLink } from './AppBarLink';
import { UserAppBarMenu } from './UserAppBarMenu';
import { Routes } from '../../routes';
import {
    CreateStatusDialog,
    OpenCreateStatusDialogButton,
    OpenCreateStatusDialogFloatingActionButton,
} from '../../Status/components';
import { ExpandDrawerButton } from './ExpandDrawerButton';
import { NavigationalDrawer } from './NavigationalDrawer';
import { BellIcon } from '../../icons/BellIcon';
import { ChatIcon } from '../../icons/ChatIcon';
import { TrendsIcon } from '../../icons/TrendsIcon';
import { AppBarLanguageSelect } from '../../Settings/components';
import { localized } from '../../localization/components';
import { OpenLoginDialogButton, LoginDialog } from '../../Authorization/components';
import { SignUpDialog } from '../../SignUp/components';
import { AppBarLogo } from '.';

const useStyles = makeStyles(theme => ({
    appBarContainer: {
        background: '#fff',
        boxShadow: 'none',
    },
    headerContainer: {
        borderBottom: `1px solid ${theme.palette.border.main}`,
        background: '#fff',
        boxShadow: 'none',
        minHeight: '50px',
    },
    navStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 50,
        width: '90%',
        maxWidth: '1170px',
        margin: 'auto',
    },
    navItemList: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    mobileNav: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            position: 'fixed',
            bottom: 0,
            display: 'flex',
            justifyContent: 'space-around',
            height: 50,
            width: '100%',
            background: theme.palette.background.light,
            zIndex: 10,
        },
    },
    navSecondary: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

const _AppBar = ({ currentActiveRoute, routerStore, currentUser, setLoginDialogOpen, theme, l }) => {
    const classes = useStyles();
    return (
        <>
            <MuiAppBar classes={{ root: classes.appBarContainer }}>
                <Toolbar classes={{ root: classes.headerContainer }}>
                    <Hidden mdUp>
                        {currentUser ? <ExpandDrawerButton /> : <div />}
                    </Hidden>
                    <nav className={classes.navStyle}>
                        <div className={classes.navItemList}>
                            <AppBarLogo />
                            <AppBarLink
                                text={l('appbar.home')}
                                targetView={Routes.home}
                                active={currentActiveRoute === 'home'}
                                icon={<CustomHomeOutlinedIcon color={currentActiveRoute === 'home' ? theme.palette.primary.main : theme.palette.text.primary} />}
                                routerStore={routerStore}
                                viewParameters={{}}
                                id="homeLink"
                                hidden={Boolean(window.AndroidCallback)}
                            />
                            <AppBarLink
                                text={l('appbar.notifications')}
                                targetView={Routes.notifications}
                                active={currentActiveRoute === 'notifications'}
                                icon={<BellIcon color={currentActiveRoute === 'notifications' && theme.palette.primary.main} />}
                                routerStore={routerStore}
                                viewParameters={{}}
                                id="notificationsLink"
                                hidden={Boolean(window.AndroidCallback)}
                            />
                            <AppBarLink
                                text={l('appbar.chat')}
                                targetView={Routes.chat}
                                active={currentActiveRoute === 'chat'}
                                icon={<ChatIcon color={currentActiveRoute === 'chat' && theme.palette.primary.main} />}
                                routerStore={routerStore}
                                viewParameters={{}}
                                id="chatLink"
                                hidden={Boolean(window.AndroidCallback)}
                            />
                            <AppBarLink
                                text={l('appbar.topics')}
                                targetView={Routes.topics}
                                active={currentActiveRoute === 'topics'}
                                icon={<TrendsIcon color={currentActiveRoute === 'topics' && theme.palette.primary.main} />}
                                routerStore={routerStore}
                                viewParameters={{}}
                                id="topicsLink"
                                hidden={Boolean(window.AndroidCallback)}
                            />
                        </div>
                        <div className={classes.navSecondary}>
                            {/* <input type="text"
                                   placeholder={l("appbar.search")}
                                   disabled
                                   className="app-bar-search-field"
                            /> */}
                            <Hidden smDown>
                                <UserAppBarMenu />
                            </Hidden>
                            {currentUser ? (
                                <Hidden smDown>
                                    <OpenCreateStatusDialogButton />
                                </Hidden>
                            )
                                : <div />}
                            {!currentUser && (<OpenLoginDialogButton />)}
                            <Hidden smDown>
                                <div className="select-language">
                                    <AppBarLanguageSelect />
                                </div>
                            </Hidden>

                            <div className="mobile_header">
                                <LoginDialog />
                                <SignUpDialog onLoginButtonClick={() => setLoginDialogOpen(true)} />
                                {/* <img src="/search.png" /> */}
                                <div className="select-language">
                                    <AppBarLanguageSelect />
                                </div>
                            </div>
                        </div>
                        <Hidden mdUp>
                            {currentUser ? (
                                <OpenCreateStatusDialogFloatingActionButton />
                            )
                                : <div />}
                        </Hidden>
                        <NavigationalDrawer />
                        <CreateStatusDialog />
                    </nav>
                </Toolbar>
            </MuiAppBar>

            <nav className={classes.mobileNav}>
                <AppBarLink
                    text={l('appbar.home')}
                    targetView={Routes.home}
                    active={currentActiveRoute === 'home'}
                    icon={<CustomHomeOutlinedIcon color={currentActiveRoute === 'home' ? theme.palette.primary.main : theme.palette.text.primary} />}
                    routerStore={routerStore}
                    viewParameters={{}}
                    id="homeLink"
                    hidden={Boolean(window.AndroidCallback)}
                />
                <AppBarLink
                    text={l('appbar.notifications')}
                    targetView={Routes.notifications}
                    active={currentActiveRoute === 'notifications'}
                    icon={<BellIcon color={currentActiveRoute === 'notifications' && theme.palette.primary.main} />}
                    routerStore={routerStore}
                    viewParameters={{}}
                    id="notificationsLink"
                    hidden={Boolean(window.AndroidCallback)}
                />
                <AppBarLink
                    text={l('appbar.chat')}
                    targetView={Routes.chat}
                    active={currentActiveRoute === 'chat'}
                    icon={<ChatIcon color={currentActiveRoute === 'chat' && theme.palette.primary.main} />}
                    routerStore={routerStore}
                    viewParameters={{}}
                    id="chatLink"
                    hidden={Boolean(window.AndroidCallback)}
                />
                <AppBarLink
                    text={l('appbar.topics')}
                    targetView={Routes.topics}
                    active={currentActiveRoute === 'topics'}
                    icon={<TrendsIcon color={currentActiveRoute === 'topics' && theme.palette.primary.main} />}
                    routerStore={routerStore}
                    viewParameters={{}}
                    id="topicsLink"
                    hidden={Boolean(window.AndroidCallback)}
                />
            </nav>
        </>
    );
};

const mapMobxToProps = ({ store, authorization, login }) => ({
    routerStore: store,
    currentUser: authorization.currentUser,
    setLoginDialogOpen: login.setLoginDialogOpen,
});

export const AppBar = localized(
    withTheme(
        inject(mapMobxToProps)(observer(_AppBar)),
    ),
);
