import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, makeStyles, Typography, Hidden } from '@material-ui/core';
import { localized } from '../localization/components';
import { AppBarLink } from '../AppBar/components/AppBarLink';
import { Routes } from '../routes';
import { BtfsIcon } from '../icons/BtfsIcon';
import { StaticPageLinks } from '../components/StaticPageLinks';

const useStyles = makeStyles(theme => ({
    prometeusLink: {
        color: '#FF5C01',
    },
    descriptionStoa: {
        marginTop: '20px',
        color: '#FF5C01',
        margin: '4px 0',
    },
    exploreLink: {
        margin: '17px 0 19px 0',
        width: '100%',
        height: 51,
        borderTop: `1px solid ${theme.palette.border.main}`,
        borderBottom: `1px solid ${theme.palette.border.main}`,
        display: 'flex',
        alignItems: 'center',
        '& p': {
            fontFamily: 'Museo Sans Cyrl Regular !important',
            fontStyle: 'normal !important',
            fontSize: '15px !important',
            lineHeight: '18px !important',
        },
        '& span': {
            color: '#1C1C1C !important',
            fontWeight: '300 !important',
            '&:hover': {
                color: '#FF5C01 !important',
            },
        },
    },
    styledText: {
        fontFamily: 'Museo Sans Cyrl Regular !important',
        fontStyle: 'normal !important',
        fontWeight: '300 !important',
        fontSize: '15px !important',
        lineHeight: '23px !important',
        color: '#A2A2A2 !important',
    },
    descriprionLinks: {
        marginTop: 4,
        '& p': {
            fontFamily: 'Museo Sans Cyrl Regular !important',
            fontStyle: 'normal !important',
            fontWeight: '300 !important',
            fontSize: '15px !important',
            lineHeight: '23px !important',
            color: '#A2A2A2 !important',
            margin: '0 0 6px 0',
        },
    },
}));

const tryOurNetworkTranslations = {
    en: ({ classes }) => (
        <Typography className={classes.styledText}>
            Try
            {' '}
            <a
                className={classes.prometeusLink}
                href="https://prometeus.io"
                target="_blank noopener noreferrrer"
            >
                Stoa
            </a>
            , which allows to buy and sell any imaginable digital data: contract
            templates, music, 3D models, source codes, stats or your master's thesis
            – anything you can think of, saved in a file.
        </Typography>
    ),
    kr: ({ classes }) => (
        <Typography variant="body2">
            를 사용해 보십시오. 계약 템플릿, 음악, 3D 모델, 소스 코드, 통계 또는 석사
            논문 등 상상할 수 있는 모든 디지털 데이터를 구입하고 판매할 수 있는
            {' '}
            <a
                className={classes.prometeusLink}
                href="https://prometeus.io"
                target="_blank noopener noreferrrer"
            >
                Stoa
            </a>
            를 파일로 저장합니다.
        </Typography>
    ),
};

const _DescriptionStoaBanner = ({ routerStore, l, locale }) => {
    const classes = useStyles();
    const Prometeus = '{Prometeus}';
    const links = {
        termsOfService: l('description-links.terms-of-service'),
        privacyPolicy: l('description-links.privacy-policy'),
        settings: l('menu.settings'),
    };

    return (
        <Grid container spacing={2} className={classes.bannerContainer}>
            <div className={classes.descriptionStoa}>
                {tryOurNetworkTranslations[locale]({ classes })}
            </div>
            <div className={classes.exploreLink}>
                <Hidden smDown>
                    <AppBarLink
                        text={l('appbar.explore-btfs')}
                        targetView={Routes.ethereumPlasma}
                        icon={<BtfsIcon color="#FF5C01" />}
                        routerStore={routerStore}
                        viewParameters={{}}
                        id="btfsLink"
                    />
                </Hidden>
            </div>
            <div className={classes.descriprionLinks}>
                <p>
                    <StaticPageLinks
                        linkTekst={links.termsOfService}
                        routerStore={routerStore}
                        targetView={Routes.terms}
                    />
                    {' '}
                    &bull;
                    <StaticPageLinks />
                    {' '}
                    <StaticPageLinks
                        linkTekst={links.privacyPolicy}
                        routerStore={routerStore}
                        targetView={Routes.terms}
                    />
                </p>
                <p>
                    <a
                        href="https://prometeus.io/"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="static-page-link"
                    >
                        © 2020
                        {' '}
                        <u>{Prometeus}</u>
                        {' '}
                        Team
                    </a>
                </p>
            </div>
        </Grid>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const DescriptionStoaBanner = localized(
    inject(mapMobxToProps)(observer(_DescriptionStoaBanner)),
);
