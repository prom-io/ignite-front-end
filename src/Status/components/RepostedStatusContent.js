import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import {makeStyles} from '@material-ui/core';
import {StatusBody} from './StatusBody';
import {StatusHeader} from './StatusHeader';
import {ClickEventPropagationStopper} from '../../ClickEventProgatationStopper';
import {Routes} from '../../routes';
import {localized} from '../../localization/components';

const useStyles = makeStyles(() => ({
    repostedStatus: {
        display: 'flex',
        border: '1px solid #F1EBE8',
    },
    repostedStatusNoBorders: {
        display: 'flex',
    },
}));

const _RepostedStatusContent = ({
    repostedStatus,
    routerStore,
    displayClearButton,
    onClearButtonClick,
    disableLeftPadding,
    hideBorders = false,
    disableStatusCardHeaderAlign = false,
}) => {
    const classes = useStyles();

    const doNothing = () => {};

    return (
        <div className={hideBorders ? classes.repostedStatusNoBorders : classes.repostedStatus}>
            <div>
                <StatusHeader
                    username={repostedStatus.account.username}
                    userId={repostedStatus.account.id}
                    displayName={repostedStatus.account.display_name}
                    avatar={repostedStatus.account.avatar}
                    createdAt={repostedStatus.created_at}
                    statusId={repostedStatus.id}
                    displayMenu={false}
                    currentUserFollowsAuthor={repostedStatus.account.following}
                    onFollowRequest={doNothing}
                    onUnfollowRequest={doNothing}
                    currentUserIsAuthor={false}
                    displayClearButton={displayClearButton}
                    onClearButtonClick={onClearButtonClick}
                    disableCardHeaderAlign={disableStatusCardHeaderAlign}
                />
                <ClickEventPropagationStopper>
                    <Link
                        store={routerStore}
                        view={Routes.status}
                        params={{ id: repostedStatus.id }}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        <StatusBody
                            text={repostedStatus.content}
                            mediaAttachments={repostedStatus.media_attachments}
                            nestedReferredStatusId={repostedStatus.referred_status_id}
                            nestedReferredStatusReferenceType={repostedStatus.status_reference_type}
                            referredStatus={repostedStatus.referred_status}
                            statusReferenceType={repostedStatus.status_reference_type}
                            disableLeftPadding={disableLeftPadding}
                        />
                    </Link>
                </ClickEventPropagationStopper>
            </div>
        </div>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const RepostedStatusContent = localized(
    inject(mapMobxToProps)(observer(_RepostedStatusContent)),
);
