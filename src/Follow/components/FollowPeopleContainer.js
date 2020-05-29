import React from "react";
import { Grid } from "@material-ui/core";

import { FollowPeopleInput, FollowPeopleList, FollowDialog } from "./";
import { BackButton } from "../../components/BackButton";

export const FollowPeopleContainer = () => (
    <Grid container spacing={2}>
        <Grid xs={12}>
            <BackButton title="follow-people" toHome />
            <FollowPeopleInput />
            <FollowPeopleList />
            <FollowDialog />
        </Grid>
    </Grid>
);
