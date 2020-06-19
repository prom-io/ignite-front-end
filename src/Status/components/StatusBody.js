import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'mobx-router';
import { CardContent, makeStyles, Typography, useTheme } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import Markdown from 'react-markdown';
import breaks from 'remark-breaks';
import { StatusMediaAttachments } from './StatusMediaAttachments';
import { RepostedStatusContent } from './RepostedStatusContent';
import { ClickEventPropagationStopper } from '../../ClickEventProgatationStopper';
import { Routes } from '../../routes';
import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    statusText: {
        overflowWrap: 'break-word',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontStyle: 'normal',
        fontWeight: '300',
        fontSize: '15px',
        lineHeight: '23px',
        color: theme.palette.text.main,
        '& a': {
            color: theme.palette.secondary.status,
        },
        '& p': {
            margin: 0,
        },
    },
    replyingToLabel: {
        color: theme.palette.text.secondary,
    },
    replyToContainer: {
        marginBottom: theme.spacing(1),
        display: 'flex',
    },
    replyingToLink: {
        textDecoration: 'none',
        color: theme.palette.text.secondary,
        marginLeft: 5,
    },
    threadLink: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        marginTop: theme.spacing(1),
        '& :hover': {
            textDecoration: 'underline',
        },
    },
}));

const _StatusBody = ({
    text,
    mediaAttachments,
    referredStatus,
    statusReferenceType,
    nestedReferredStatusId,
    nestedReferredStatusReferenceType,
    routerStore,
    hideThreadLink,
    disableLeftPadding,
    l,
}) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <CardContent
            className={disableLeftPadding ? 'status-list-body-container-no-padding-left' : 'status-list-body-container'}
            style={{ flex: 'auto' }}
        >
            {referredStatus && statusReferenceType === 'COMMENT' && (
                <ClickEventPropagationStopper>
                    <div
                        style={{
                            display: 'flex',
                            // marginBottom: 4,
                        }}
                    >
                        <Typography classes={{ root: classes.replyingToLabel }}>
                            {l('status.replying-to')}
                        </Typography>
                        <Link
                            store={routerStore}
                            view={Routes.userProfile}
                            params={{ username: referredStatus.account.username }}
                            className={classes.replyingToLink}
                        >
                            <Typography style={{ color: '#A2A2A2' }}>
                                @
                                {referredStatus.account.username}
                            </Typography>
                        </Link>
                    </div>
                </ClickEventPropagationStopper>
            )}
            <Typography
                variant="body1"
                className={classes.statusText}
            >
                <Markdown source={text} plugins={[breaks]} />
            </Typography>
            <StatusMediaAttachments mediaAttachments={mediaAttachments} isOnlyImage={!text} />
            {referredStatus && statusReferenceType === 'REPOST' && <RepostedStatusContent repostedStatus={referredStatus} />}
            {nestedReferredStatusId && nestedReferredStatusReferenceType === 'REPOST' && (
                <ClickEventPropagationStopper>
                    <Link
                        store={routerStore}
                        view={Routes.status}
                        params={{ id: nestedReferredStatusId }}
                        style={{
                            color: theme.palette.primary.main,
                        }}
                    >
                        <div style={{ display: 'flex' }}>
                            <ReplyIcon />
                            <Typography style={{ color: theme.palette.primary.main }}>
                                {l('status.reposted-status')}
                            </Typography>
                        </div>
                    </Link>
                </ClickEventPropagationStopper>
            )}
            {referredStatus && statusReferenceType === 'COMMENT' && !hideThreadLink && (
                <ClickEventPropagationStopper>
                    <Link
                        store={routerStore}
                        view={Routes.status}
                        params={{ id: referredStatus.id }}
                        className={classes.threadLink}
                    >
                        <Typography
                            style={{
                                color: theme.palette.primary.main,
                                marginTop: theme.spacing(1),
                            }}
                        >
                            {l('status.show-this-thread')}
                        </Typography>
                    </Link>
                </ClickEventPropagationStopper>
            )}
            {nestedReferredStatusId && nestedReferredStatusReferenceType === 'COMMENT' && !hideThreadLink && (
                <ClickEventPropagationStopper>
                    <Link
                        store={routerStore}
                        view={Routes.status}
                        params={{ id: nestedReferredStatusId }}
                        className={classes.threadLink}
                    >
                        <Typography
                            style={{
                                color: theme.palette.primary.main,
                                marginTop: theme.spacing(1),
                            }}
                        >
                            {l('status.show-this-thread')}
                        </Typography>
                    </Link>
                </ClickEventPropagationStopper>
            )}
        </CardContent>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

// eslint-disable-next-line import/prefer-default-export
export const StatusBody = localized(
    inject(mapMobxToProps)(observer(_StatusBody)),
);
