import React from 'react';
import {inject} from "mobx-react";
import {Routes} from "../routes";
import {StaticPageLinks} from './StaticPageLinks';
import { TableFooter } from '@material-ui/core';


const _StaticPageFooter = ({routerStore}) => {

  const Prometeus = "{Prometeus}"

  const links = {
    termsOfService : "Terms of Service",
    privacyPolicy: "Privacy Policy"
  }
  


  return (
    <div className="static-page-footer" >
      <div><p>© 2020 {Prometeus} Team</p></div>
      <div>
        <ul>
          <li>Settings</li>
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
          <li>Help Center</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  )
}

const mapMobxToProps = ({store}) => ({
  routerStore: store
});

export const StaticPageFooter = inject(mapMobxToProps)(_StaticPageFooter);