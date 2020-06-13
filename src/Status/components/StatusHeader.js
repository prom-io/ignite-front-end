import React from 'react';
import { inject } from 'mobx-react';
import { CardHeader, Typography, Avatar, Hidden, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'mobx-router';
import { StatusMenu } from './StatusMenu';
import { Routes } from '../../routes';
import { SmallEllipseIcon } from '../../icons/SmallEllipseIcon';
import { ClickEventPropagationStopper } from '../../ClickEventProgatationStopper';
import { addLineBreak, trimString } from '../../utils/string-utils';
import { localized } from '../../localization/components';
import { getCreatedAtLabel } from '../../utils/date-utlis';

const useStyles = makeStyles(() => ({
    statusHeader: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        '& a': {
            textDecoration: 'none',
            color: 'inherit',
            fontFamily: 'Museo Sans Cyrl Bold',
            fontWeight: 700,
        },
        '& a:hover': {
            textDecoration: 'underline',
        },
    },
    cardHeaderRootNoAlignItems: {
        alignItems: 'normal',
    },
}));

const _StatusHeader = ({
    username,
    userId,
    displayName,
    avatar,
    createdAt,
    displayMenu,
    currentUserFollowsAuthor,
    currentUserIsAuthor,
    statusId,
    onFollowRequest,
    onUnfollowRequest,
    displayClearButton = false,
    onClearButtonClick,
    routerStore,
    dateFnsLocale,
    disableCardHeaderAlign = false,
}) => {
    const classes = useStyles();

    return (
        <CardHeader
            style={{
                padding: '16px 16px 8px 16px',
            }}
            avatar={(
                <ClickEventPropagationStopper>
                    <Link
                        store={routerStore}
                        view={Routes.userProfile}
                        params={{ username }}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        <Avatar src={avatar} className="avatar-mini" />
                    </Link>
                </ClickEventPropagationStopper>
            )}
            title={(
                <div className="status-header">
                    <ClickEventPropagationStopper className={classes.statusHeader}>
                        <Link
                            store={routerStore}
                            view={Routes.userProfile}
                            params={{ username }}
                        >
                            <Hidden xsDown>
                                <Typography>
                                    <strong>{trimString(displayName, 35)}</strong>
                                </Typography>
                            </Hidden>
                            <Hidden smUp>
                                <Typography>
                                    <strong>{addLineBreak(displayName)}</strong>
                                </Typography>
                            </Hidden>
                        </Link>
                        {displayClearButton && (
                            <IconButton
                                onClick={onClearButtonClick}
                                style={{ float: 'right' }}
                            >
                                <CloseIcon />
                            </IconButton>
                        )}
                    </ClickEventPropagationStopper>
                </div>
            )}
            subheader={(
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                >
                    <ClickEventPropagationStopper>
                        <Link
                            store={routerStore}
                            view={Routes.userProfile}
                            params={{ username }}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                        >
                            <Hidden xsDown>
                                <Typography style={{ fontSize: 15 }}>
                                    @
                                    {trimString(username, 35)}
                                </Typography>
                            </Hidden>
                            <Hidden smUp>
                                <Typography style={{ fontSize: 15 }}>
                                    @
                                    {trimString(username, 20)}
                                </Typography>
                            </Hidden>
                        </Link>
                    </ClickEventPropagationStopper>
                    <Typography style={{ marginLeft: 12, fontSize: 12 }}>
                        <SmallEllipseIcon />
                        {' '}
                        {getCreatedAtLabel(new Date(createdAt), dateFnsLocale)}
                    </Typography>
                </div>
            )}
            action={displayMenu && (
                <ClickEventPropagationStopper>
                    <StatusMenu
                        onUnfollowRequest={onUnfollowRequest}
                        onFollowRequest={onFollowRequest}
                        username={username}
                        statusId={statusId}
                        currentUserFollowsAuthor={currentUserFollowsAuthor}
                        currentUserIsAuthor={currentUserIsAuthor}
                    />
                </ClickEventPropagationStopper>
            )}
            classes={disableCardHeaderAlign ? { root: classes.cardHeaderRootNoAlignItems } : undefined}
        />
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const StatusHeader = localized(
    inject(mapMobxToProps)(_StatusHeader),
);
