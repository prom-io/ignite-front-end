import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";

import { AppBar } from "../AppBar/components";
import { UpdateUserContainer } from "../User/components";
import { UserCard } from "../components/UserCard";
import { Layout } from "../Layout";
import { LoginForm } from "../Authorization/components";
import { useAuthorization, useLocalization } from "../store/hooks";

const useStyles = makeStyles(() => ({
    editTitle: {
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "24px",
        marginBottom: "24px"
    }
}));

export const UserEditPage = observer(() => {
    const classes = useStyles();
    const { currentUser } = useAuthorization();
    const { l } = useLocalization();

    return (
        <Grid container>
            <AppBar />
            <Grid item xs={12}>
                <Layout>
                    <Grid container className="content-container">
                        <Grid item md={3} className="left-banners-container">
                            <UserCard isLogin />
                        </Grid>
                        <Grid
                            item
                            spacing={28}
                            lg={9}
                            className="right-content-container"
                            style={{ width: "100%" }}
                        >
                            {!currentUser ? (
                                <Grid item className="login-form-container">
                                    <LoginForm />
                                </Grid>
                            ) : (
                                <>
                                    <Typography
                                        className={classes.editTitle}
                                        variant="h6"
                                    >
                                        {l("user.edit-profile")}
                                    </Typography>
                                    <UpdateUserContainer />
                                </>
                            )}
                        </Grid>
                        <Grid item md={3} className="right-banners-container"></Grid>
                    </Grid>
                </Layout>
            </Grid>
        </Grid>
    );
});