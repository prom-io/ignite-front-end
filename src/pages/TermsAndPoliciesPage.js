import React from 'react';
import { Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { StaticPageFooter } from '../components/StaticPageFooter';
import { localized } from '../localization/components';

const _TermsAndPolicesPage = ({ l }) => (
    <div className="static-page">
        <Grid item >
            <AppBar currentActiveRoute="terms" />
        </Grid>
        <div className="static-page-container">
            <div>
                <div className="static-page-logo-container">
                    <img src="/page_img/terms_of_service_page.svg" />
                    <h1>{l('terms-of-service')}</h1>
                </div>
                <div>
                    <p>
                        {l('terms-of-service.paragraph-1')}
                    </p>
                    <p>
                        {l('terms-of-service.paragraph-2')}
                    </p>
                    <p>
                        {l('terms-of-service.paragraph-3')}
                    </p>
                    <p>
                        {l('terms-of-service.paragraph-4')}
                    </p>
                    <p>
                        {l('terms-of-service.paragraph-5')}
                    </p>
                    <p>
                        {l('terms-of-service.paragraph-6')}
                    </p>
                </div>
            </div>
        </div>
        <div className="static-page-container">
            <div>
                <div className="static-page-logo-container">
                    <img src="/page_img/privacy_policies_page.svg" />
                    <h1>{l('privacy-policies')}</h1>
                </div>
                <div>
                    <p>
                        {l('privacy-policies.version')}
                        {l('privacy-policies.paragraph-1')}
                    </p>
                    <p>
                        {l('privacy-policies.paragraph-2')}
                    </p>
                    <p>
                        {l('privacy-policies.paragraph-3')}
                    </p>
                    <p>
                        {l('privacy-policies.paragraph-4')}
                    </p>
                    <p>
                        {l('privacy-policies.paragraph-5')}
                    </p>
                    <p>
                        {l('privacy-policies.paragraph-6')}
                    </p>
                    <p>
                        {l('privacy-policies.paragraph-7')}
                    </p>
                    <p>
                        {l('privacy-policies.paragraph-8')}
                    </p>
                    <p>
                        {l('privacy-policies.paragraph-9')}
                    </p>
                    <p>
                        {l('privacy-policies.paragraph-10')}
                    </p>
                </div>
            </div>
        </div>
        <StaticPageFooter />
    </div>
);

export const TermsAndPoliciesPage = localized(_TermsAndPolicesPage);
