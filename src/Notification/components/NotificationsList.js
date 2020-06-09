import React from 'react';
import { observer } from 'mobx-react';
import { CircularProgress, makeStyles, Typography, useTheme } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FadeLoader } from 'react-spinners';
import { Notification } from './Notification';
import { useStore, useAuthorization, useLocalization } from '../../store';
import { SadIconLarge } from '../../icons/SadIconLarge';
import { BellIcon } from '../../icons/BellIcon';

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
    link: {
        color: theme.palette.primary.main,
    },
    noNotificationsContainer: {
        border: '1px solid #F1EBE8',
    },
    noNotificationsContent: {
        display: 'flex',
        padding: theme.spacing(2),
    },
    noNotificationsLabel: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(2),
    },
    notificationsError: {
        border: '1px solid #F1EBE8',
        borderBottom: 'none',
        height: '100%',
    },
    notificationsErrorInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '65px',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#A2A2A2',
        '& p': {
            fontFamily: 'Museo Sans Cyrl Bold',
            fontSize: '20px',
            margin: '24px 0 4px 0',
            color: '#1C1C1C',
        },
    },
}));

const noNotifications = {
    en: (classes) => (
        <div className={classes.noNotificationsContainer}>
            <div className={classes.noNotificationsContent}>
                <SadIconLarge />
                <div className={classes.noNotificationsLabel}>
                    <Typography>
                        <strong>You have no notifications yet.</strong>
                    </Typography>
                    <Typography>
                        Get to know other
                        {' '}
                        <a href="#" className={classes.link}>users</a>
                        {' '}
                        to start a conversation
                    </Typography>
                </div>
            </div>
        </div>
    ),
    ko: (classes) => (
        <div className={classes.noNotificationsContainer}>
            <div className={classes.noNotificationsContent}>
                <SadIconLarge />
                <div className={classes.noNotificationsLabel}>
                    <Typography>
                        <strong>아직 알림이 없다. </strong>
                    </Typography>
                    <Typography>
                        다른
                        {' '}
                        <a href="#" className={classes.link}>사용자</a>
                        {' '}
                        에 대해 알아보고 대화를 시작하십시오.
                    </Typography>
                </div>
            </div>
        </div>
    ),
};

export const NotificationsList = observer(() => {
    const classes = useStyles();
    const theme = useTheme();

    const notificationsStore = useStore().notifications;
    const { notifications, fetchNotifications, hasMore } = notificationsStore;
    const { currentUser } = useAuthorization();
    const { locale } = useLocalization();

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
        return noNotifications[locale](classes);
    }

    return (
        <div id="notificationsList" className="paddingBottomRoot">
            <InfiniteScroll
                next={fetchNotifications}
                hasMore={hasMore}
                loader={(
                    <div className={classes.centered}><FadeLoader css="transform: scale(0.5)" color={theme.palette.primary.main} /></div>
                )}
                dataLength={notifications.length}
                style={{ overflowY: 'hidden' }}
            >
                {notifications.map(notification => (
                    <Notification
                        notification={notification}
                        key={notification.id}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
});
