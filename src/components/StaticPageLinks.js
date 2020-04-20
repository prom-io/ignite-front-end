import React from "react";
import {Link} from "mobx-router";

export const StaticPageLinks = ({linkTekst, routerStore, targetView}) => {

  return(
      <Link view={targetView} store={routerStore} className="static-page-link">
        {linkTekst}
      </Link>
  )
};
