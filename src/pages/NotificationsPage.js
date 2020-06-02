import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";
import { AppBar } from "../AppBar/components";
import { NotificationsList } from "../Notification/components";
import {
    PrometeusDescription,
    ExploreOurFeaturesDescription
} from "../PrometeusDescription";
import { Layout } from "../Layout";
import { LoginForm } from "../Authorization/components";
import { useAuthorization, useLocalization } from "../store/hooks";

const useStyles = makeStyles(theme => ({
    notificationsTitle: {
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "24px",
        marginBottom: "24px"
    }
}));

export const NotificationsPage = observer(() => {
    const classes = useStyles();
    const { currentUser } = useAuthorization();
    const { l } = useLocalization();

    return (
        <Grid container>
            <Grid item xs={12}>
                <AppBar currentActiveRoute="notifications" />
            </Grid>
            <Grid item xs={12}>
                <Layout>
                    <Grid container className="content-container">
                        <Grid item md={3} className="left-banners-container">
                            <PrometeusDescription />
                        </Grid>
                        <Grid
                            item
                            spacing={28}
                            lg={9}
                            className="right-content-container"
                            style={{width: '100%'}}
                        >
                            {!currentUser && (
                                <Grid item className="login-form-container">
                                    <LoginForm />
                                </Grid>
                            )}
                            <Typography
                                className={classes.notificationsTitle}
                                variant="h6"
                            >
                                {l("appbar.notifications")}
                            </Typography>
                            <NotificationsList />
                        </Grid>
                        <Grid item md={3} className="right-banners-container">
                            <ExploreOurFeaturesDescription />
                        </Grid>
                    </Grid>
                </Layout>
            </Grid>
        </Grid>
    );
});
