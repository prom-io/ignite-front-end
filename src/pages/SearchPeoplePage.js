import React from "react";
import { observer } from "mobx-react";
import { Grid } from "@material-ui/core";

import { Layout } from "../Layout";
import { AppBar } from "../AppBar/components";
import {
    PrometeusDescription,
    ExploreOurFeaturesDescription
} from "../PrometeusDescription";
import { LoginForm } from "../Authorization/components";
import { SearchPeopleContainer } from "../Search/components";
import { useAuthorization } from "../store/hooks";

export const SearchPeoplePage = observer(() => {
    const { currentUser } = useAuthorization();

    return (
        <Grid container>
            <AppBar />
            <Grid item xs={12}>
                <Layout>
                    <Grid container className="content-container">
                        <Grid item md={3} className="left-banners-container">
                            <PrometeusDescription />
                        </Grid>
                        <Grid
                            item
                            lg={9}
                            xs={12}
                            className="right-content-container"
                        >
                            {!currentUser && (
                                <Grid
                                    item
                                    xs={12}
                                    className="login-form-container"
                                    style={{ marginBottom: "16px" }}
                                >
                                    <LoginForm
                                        hideSignUpButton={
                                            process.env
                                                .REACT_APP_HIDE_SIGN_UP_BUTTON ===
                                            "true"
                                        }
                                    />
                                </Grid>
                            )}
                            <SearchPeopleContainer />
                        </Grid>
                        <Grid item md={3} className="right-banners-container">
                            {!currentUser && <ExploreOurFeaturesDescription />}
                        </Grid>
                    </Grid>
                </Layout>
            </Grid>
        </Grid>
    );
});
