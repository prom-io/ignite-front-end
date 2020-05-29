import React from 'react';
import { inject } from 'mobx-react';
import { Routes } from '../routes';
import { StaticPageLinks } from './StaticPageLinks';
import { LogoutMenuItem } from '../Authorization/components';
import { localized } from '../localization/components';

const _StaticPageFooter = ({ routerStore, l }) => {
    const Prometeus = ' {Prometeus}';

    const links = {
        termsOfService: l('description-links.terms-of-service'),
        privacyPolicy: l('description-links.privacy-policy'),
    };

    const handleClose = () => null;


    return (
        <div className="static-page-footer-container">
            <div className="static-page-footer">
                <footer>
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
                                targetView={Routes.terms}
                                routerStore={routerStore}
                                linkTekst={links.termsOfService}
                            />
                        </li>
                        <li>&bull;</li>
                        <li>
                            <StaticPageLinks
                                targetView={Routes.terms}
                                routerStore={routerStore}
                                linkTekst={links.privacyPolicy}
                            />
                        </li>
                    </ul>
                </div>
                </footer>
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
