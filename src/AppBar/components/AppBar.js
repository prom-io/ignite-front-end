import React, {Fragment} from "react";
import {inject} from "mobx-react";
import {AppBar as MuiAppBar, makeStyles, Toolbar} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import {AppBarLink} from "./AppBarLink";
import {Routes} from "../../routes";

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: theme.palette.background.paper,
        border: "none"
    }
}));

const _AppBar = ({currentActiveRoute, routerStore}) => {
    const classes = useStyles();

    return (
        <Fragment>
            <MuiAppBar variant="outlined"
                       className={classes.appBar}
                       position="fixed"
            >
                <Toolbar>
                    <AppBarLink text="Home"
                                targetView={Routes.home}
                                active={currentActiveRoute === "home"}
                                icon={<HomeIcon/>}
                                routerStore={routerStore}
                                viewParameters={{}}
                    />
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
