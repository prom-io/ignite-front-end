import React from "react";
import {inject} from "mobx-react";
import {Routes} from "../routes";
import {StaticPageLinks} from './StaticPageLinks';
import {LogoutMenuItem} from "../Authorization/components";

const _DescriptionLinks= ({routerStore}) => {

  const Prometeus = "{Prometeus}"

  const links = {
    termsOfService : "Terms of Service",
    privacyPolicy: "Privacy Policy"
  }
  const handleClose = () => null


  return (
    <div className="description-links" >
      <div>
        <p>Settings</p>
        <p>&bull;</p>
        <p>
          <StaticPageLinks 
              targetView={Routes.terms}
              routerStore={routerStore}
              linkTekst={links.termsOfService}
            />
        </p>
        <p>
          <StaticPageLinks 
            targetView={Routes.terms}
            routerStore={routerStore}
            linkTekst={links.privacyPolicy}
          />
        </p>
        <p>&bull;</p>
        <p>Help Center</p>
        <LogoutMenuItem onClick={handleClose} isMenuItem={true}/>
      </div>
      <div><p>© 2020 {Prometeus} Team</p></div>
    </div>
  )
}

const mapMobxToProps = ({store}) => ({
  routerStore: store
});

export const DescriptionLinks = inject(mapMobxToProps)(_DescriptionLinks);
