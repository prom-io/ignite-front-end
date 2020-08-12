import React from "react";
import { observer } from "mobx-react";
import { Link } from "mobx-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { Badge, Typography, makeStyles } from "@material-ui/core";

import Loader from "../../components/Loader";
import { Notification } from "./Notification";
import { useStore, useAuthorization, useLocalization, useRouter } from "../../store";
import { Routes } from "../../routes";
import { SadIconLarge } from "../../icons/SadIconLarge";
import { BellIcon } from "../../icons/BellIcon";

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    },
    link: {
        color: theme.palette.primary.main,
        cursor: "pointer"
    },
    noNotificationsContainer: {
        border: `1px solid ${theme.palette.border.main}`
    },
    noNotificationsContent: {
        display: "flex",
        padding: theme.spacing(2)
    },
    noNotificationsLabel: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: theme.spacing(2)
    },
    notificationsError: {
        border: `1px solid ${theme.palette.border.main}`,
        height: "100%",
        padding: "30px"
    },
    notificationsErrorInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "65px",
        fontFamily: "Museo Sans Cyrl Regular",
        fontSize: "15px",
        lineHeight: "26px",
        color: theme.palette.text.secondary,
        "& p": {
            fontFamily: "Museo Sans Cyrl Bold",
            fontSize: "20px",
            margin: "24px 0 4px 0",
            color: theme.palette.text.main
        }
    },
    notificationMarginTop: {
        marginTop: "10px",
        [theme.breakpoints.down("sm")]: {
            marginTop: 0
        }
    },
    badgeWrapper: {
        width: "100%"
    },
    badgeCircle: {
        top: "17px",
        right: "17px"
    }
}));

const noNotifications = {
    en: (classes, routerStore) => (
        <div className={classes.noNotificationsContainer}>
            <div className={classes.noNotificationsContent}>
                <SadIconLarge />
                <div className={classes.noNotificationsLabel}>
                    <Typography>
                        <strong>You have no notifications yet.</strong>
                    </Typography>
                    <Typography>
                        Get to know other{" "}
                        <Link view={Routes.followPeople} store={routerStore}>
                            <a className={classes.link}>users</a>
                        </Link>{" "}
                        to start a conversation
                    </Typography>
                </div>
            </div>
        </div>
    ),
    kr: (classes, routerStore) => (
        <div className={classes.noNotificationsContainer}>
            <div className={classes.noNotificationsContent}>
                <SadIconLarge />
                <div className={classes.noNotificationsLabel}>
                    <Typography>
                        <strong>아직 알림이 없다. </strong>
                    </Typography>
                    <Typography>
                        다른{" "}
                        <Link view={Routes.followPeople} store={routerStore}>
                            <a className={classes.link}>users</a>
                        </Link>{" "}
                        에 대해 알아보고 대화를 시작하십시오.
                    </Typography>
                </div>
            </div>
        </div>
    )
};

export const NotificationsList = observer(() => {
    const classes = useStyles();

    const notificationsStore = useStore().notifications;
    const routerStore = useRouter();
    const { notifications, fetchNotifications, hasMore } = notificationsStore;
    const { currentUser, fetchingCurrentUser } = useAuthorization();
    const { locale } = useLocalization();

    if (fetchingCurrentUser) {
        return (
            <div className={classes.centered}>
                <Loader size="lg" />
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className={classes.notificationsError}>
                <div className={classes.notificationsErrorInfo}>
                    <BellIcon width="50" height="50" color="#A1A1A1" />
                    <p>Nothing to display yet!</p>
                    <span>Please login or sign up to receive notifications</span>
                </div>
            </div>
        );
    }

    if (notifications.length === 0 && !hasMore) {
        return noNotifications[locale](classes, routerStore);
    }

    return (
        <div
            id="notificationsList"
            className={`paddingBottomRoot ${classes.notificationMarginTop}`}
        >
            <InfiniteScroll
                next={fetchNotifications}
                hasMore={hasMore}
                loader={
                    <div className={classes.centered}>
                        <Loader size="lg" />
                    </div>
                }
                dataLength={notifications.length}
                style={{ overflow: "visible" }}
            >
                {notifications.map(notification => (
                    <Badge
                        classes={{
                            root: classes.badgeWrapper,
                            anchorOriginTopRightRectangle: classes.badgeCircle
                        }}
                        badgeContent="!"
                        color="primary"
                        invisible={notification.readed}
                    >
                        <Notification
                            notification={notification}
                            key={notification.id}
                        />
                    </Badge>
                ))}
            </InfiniteScroll>
        </div>
    );
});
