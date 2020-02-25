import React from 'react';
import {inject} from "mobx-react";
import {Routes} from "../routes";
import {StaticPageLinks} from './StaticPageLinks';
import {LogoutMenuItem} from "../Authorization/components";


const _StaticPageFooter = ({routerStore}) => {

  const Prometeus = "{Prometeus}"

  const links = {
    termsOfService : "Terms of Service",
    privacyPolicy: "Privacy Policy"
  }

  const handleClose = () => null
  


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
          <LogoutMenuItem onClick={handleClose} isStaticFooterMenuItem={true}/>
        </ul>
      </div>
    </div>
  )
}

const mapMobxToProps = ({store}) => ({
  routerStore: store
});

export const StaticPageFooter = inject(mapMobxToProps)(_StaticPageFooter);