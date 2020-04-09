import React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "mobx-router"
import {Divider} from "@material-ui/core";
import {StatusBody} from "./StatusBody";
import {ClickEventPropagationStopper} from "../../ClickEventProgatationStopper";
import {Routes} from "../../routes";
import {StatusHeader} from "./StatusHeader";

const _RepostedStatusContent = ({repostedStatus, routerStore}) => {
    const doNothing = () => {};

    return (
        <div style={{display: "flex"}}>
            <Divider orientation="vertical"
                     flexItem
            />
            <div>
                <StatusHeader username={repostedStatus.account.username}
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
                />
                <ClickEventPropagationStopper>
                    <Link store={routerStore}
                          view={Routes.status}
                          params={{id: repostedStatus.id}}
                          style={{
                              textDecoration: "none",
                              color: "inherit"
                          }}>
                        <StatusBody text={repostedStatus.content}
                                    mediaAttachments={repostedStatus.media_attachments}
                        />
                    </Link>
                </ClickEventPropagationStopper>
            </div>
        </div>
    )
};

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const RepostedStatusContent = inject(mapMobxToProps)(observer(_RepostedStatusContent));
