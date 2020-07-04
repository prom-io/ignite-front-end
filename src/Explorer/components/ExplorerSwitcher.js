import React, { useState } from "react";
import { inject } from "mobx-react";
import { Tabs, Tab } from "@material-ui/core";

import { localized } from "../../localization/components";
import { Routes } from "../../routes";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    tabsRoot: {
        overflow:'visible'
    },
    tabScroller: {
        overflow:'visible !important'
    }
}));

const _ExplorerSwitcher = ({ routerStore, activeTab, l }) => {
    const [value, setValue] = useState(activeTab);

    const handleChange = (e, route) => {
        setValue(route);
        routerStore.router.goTo(getRoute(route));
    };

    const getRoute = route => {
        switch (route) {
            case "btfs":
                return Routes.btfs;
            case "ethereum-plasma":
                return Routes.ethereumPlasma;
            case "distributed-storage":
                return Routes.distributedStorage;
            case "ethereum-mainnet":
                return Routes.ethereumMainnet;
            case "binance-smart-chain":
                return Routes.binanceSmartChain;
            default:
                return Routes.home;
        }
    };
    
    const classes = useStyles();

    return (
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                classes={{scroller: classes.tabScroller, root: classes.tabsRoot}}
            >
                <Tab value="btfs" label={l("explorer.btfs-info")} />
                <Tab value="ethereum-plasma" label={l("explorer.ethereum-plasma-info")} />
                <Tab value="distributed-storage" label={l("explorer.distributed-storage-info")} />
                <Tab value="ethereum-mainnet" label={l("explorer.ethereum-mainnet-info")} />
                <Tab value="binance-smart-chain" label={l("explorer.binance-smart-chain-info")} />
            </Tabs>
        </div>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store
});

export const ExplorerSwitcher = localized(inject(mapMobxToProps)(_ExplorerSwitcher));
