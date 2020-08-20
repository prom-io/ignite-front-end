import React from "react";
import { inject, observer } from "mobx-react";
import { Grid } from "@material-ui/core";

import { DescriptionUnauthBanner } from "./DescriptionUnauthBanner";
import { DescriptionStoaBanner } from "./DescriptionStoaBanner";
import { UserGlobalCard } from "../User/components";

const _PrometeusDescription = ({ currentUser }) => (
    <Grid container spacing={2} className="description-container">
        <Grid className="user_profile_container">
            {currentUser ? <UserGlobalCard /> : <DescriptionUnauthBanner />}
        </Grid>
        <Grid>
            <DescriptionStoaBanner />
        </Grid>
    </Grid>
);

const mapMobxToProps = ({ authorization }) => ({
    currentUser: authorization.currentUser
});

export const PrometeusDescription = inject(mapMobxToProps)(
    observer(_PrometeusDescription)
);
