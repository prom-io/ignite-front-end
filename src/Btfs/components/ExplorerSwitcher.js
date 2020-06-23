import React, { useState } from "react";
import { inject } from "mobx-react";
import { Tabs, Tab, makeStyles } from "@material-ui/core";

import { localized } from "../../localization/components";
import { Routes } from "../../routes";

const useStyles = makeStyles({});

const _ExplorerSwitcher = ({ routerStore, activeTab }) => {
    const classes = useStyles();
    const [value, setValue] = useState(activeTab);

    const handleChange = (event, route) => {
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
            case "ethereum mainnet":
                return Routes.ethereumMainnet;
            case "binance-smart-chain":
                return Routes.binanceSmartChain;
            default:
                return Routes.home;
        }
    };

    return (
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab value="btfs" label="BTFS files info" />
                <Tab value="ethereum-plasma" label="Ethereum Plasma" />
                <Tab value="distributed-storage" label="Distributed Storage" />
                <Tab value="ethereum mainnet" label="Ethereum mainnet" />
                <Tab value="binance-smart-chain" label="Binance Smart Chain" />
            </Tabs>
        </div>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store
});

export const ExplorerSwitcher = localized(inject(mapMobxToProps)(_ExplorerSwitcher));
