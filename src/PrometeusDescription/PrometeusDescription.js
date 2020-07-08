import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { UserCard } from '../components/UserCard';
import { localized } from '../localization/components';
import { DescriptionUnauthBanner } from './DescriptionUnauthBanner';
import { DescriptionStoaBanner } from './DescriptionStoaBanner';

const useStyles = makeStyles(theme => ({
    prometeusLink: {
        color: theme.palette.primary.main,
    },
}));

const tryOurNetworkTranslations = {
    en: ({ classes }) => (
        <Typography variant="body2">
            Try our
            {' '}
            <a className={classes.prometeusLink} href="https://prometeus.io" target="_blank noopener noreferrrer">Network</a>
            , which allows to buy and sell any imaginable digital data: contract templates, music, 3D models, source codes, stats or your master's thesis – anything you can think of, saved in a file.
        </Typography>
    ),
    kr: ({ classes }) => (
        <Typography variant="body2">
            를 사용해 보십시오. 계약 템플릿, 음악, 3D 모델, 소스 코드, 통계 또는 석사 논문 등 상상할 수 있는 모든 디지털 데이터를 구입하고 판매할 수 있는
            {' '}
            <a className={classes.prometeusLink} href="https://prometeus.io" target="_blank noopener noreferrrer">네트워크</a>
            를 파일로 저장합니다.
        </Typography>
    ),
};

const igniteDescriptionTranslations = {
    en: () => (
        <Typography variant="body2">
            <span>Ignite </span>
            {' '}
            is Ethereum Plasma based 'decentralized twitter' solution with immutable storage to make it censorship proof.
        </Typography>
    ),
    kr: () => (
        <Typography variant="body2">
            <span>Ignite </span>
            은 Ethereum Plasma 기반의 '중앙집중화된 트위터' 솔루션으로, 불변적인 저장장치로 검열저항을 입증합니다.
        </Typography>
    ),
};

const _PrometeusDescription = ({ routerStore, l, locale, currentUser }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className="description-container">

            <Grid className="user_profile_container">
                {currentUser ? <UserCard isLogin /> : <DescriptionUnauthBanner />}
            </Grid>

            <Grid>
                <DescriptionStoaBanner />
            </Grid>

            {/* <Grid item >
                {tryOurNetworkTranslations[locale]({classes})}
            </Grid>
            <Grid item >
                {igniteDescriptionTranslations[locale]()}
            </Grid>
            <Grid item  style={{
                                borderTop: "1px solid #F1EBE8"
            }}>
                <Link store={routerStore}
                      view={Routes.explorer}
                      style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          alignItems: "center"
                      }}
                >
                    <BtfsIcon/>
                    <Typography style={{paddingLeft: "8px"}}>
                        {l("menu.explore-btfs")}
                    </Typography>
                </Link>
            </Grid>
            <Grid item >
                <DescriptionLinks />
            </Grid> */}
        </Grid>
    );
};

const mapMobxToProps = ({ store, authorization }) => ({
    routerStore: store,
    currentUser: authorization.currentUser,
});

export const PrometeusDescription = localized(
    inject(mapMobxToProps)(observer(_PrometeusDescription)),
);
