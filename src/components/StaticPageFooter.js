import React from 'react';
import { inject } from 'mobx-react';
import { Routes } from '../routes';
import { StaticPageLinks } from './StaticPageLinks';
import { LogoutMenuItem } from '../Authorization/components';
import { localized } from '../localization/components';


const _StaticPageFooter = ({ routerStore, l }) => {
    const Prometeus = '{Prometeus}';

    const links = {
        termsOfService: l('description-links.terms-of-service'),
        privacyPolicy: l('description-links.privacy-policy'),
    };

    const handleClose = () => null;


    return (
        <div className="static-page-footer-container">
            <div className="static-page-footer">
                <div>
                    <p>
                        © 2020
                        {Prometeus}
                        {' '}
                        Team
                    </p>
                </div>
                <div>
                    <ul>
                        <li>
                            <StaticPageLinks
                                targetView={Routes.settings}
                                routerStore={routerStore}
                                linkTekst={l('menu.settings')}
                            />
                        </li>
                        <li>
                            <StaticPageLinks
                                targetView={Routes.terms}
                                routerStore={routerStore}
                                linkTekst={links.termsOfService}
                            />
                        </li>
                        <li>
                            <StaticPageLinks
                                targetView={Routes.terms}
                                routerStore={routerStore}
                                linkTekst={links.privacyPolicy}
                            />
                        </li>
                        <li>{l('menu.help-center')}</li>
                        <LogoutMenuItem onClick={handleClose} isStaticFooterMenuItem />
                    </ul>
                </div>
            </div>
        </div>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const StaticPageFooter = localized(
    inject(mapMobxToProps)(_StaticPageFooter),
);
