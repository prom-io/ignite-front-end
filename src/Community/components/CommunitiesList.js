import React from "react";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles } from "@material-ui/core";

import { CommunityListItem } from "./CommunityListItem";
import { CommunitiesNotFound } from "./CommunitiesNotFound";
import Loader from "../../components/Loader";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table",
        marginTop: "100px"
    }
}));

const _CommunitiesList = ({
    currentUser,
    type,
    communities,
    pending,
    hasMore,
    fetchCommunities,
    doJoin
}) => {
    const classes = useStyles();

    return pending && communities.length === 0 ? (
        <div className={classes.centered}>
            <Loader size="lg" />
        </div>
    ) : (
        <div className="paddingBottomRoot">
            {communities.length > 0 ? (
                <InfiniteScroll
                    next={() => fetchCommunities(type)}
                    loader={
                        <div className={classes.centered}>
                            <Loader size="lg" />
                        </div>
                    }
                    dataLength={communities.length}
                    style={{ overflowY: "hidden" }}
                    hasMore={hasMore}
                >
                    {communities.map(community => (
                        <CommunityListItem
                            community={community}
                            currentUser={currentUser}
                            doJoin={doJoin}
                        />
                    ))}
                </InfiniteScroll>
            ) : (
                <CommunitiesNotFound type={type} />
            )}
        </div>
    );
};

const mapMobxToProps = ({ authorization, communities }) => ({
    currentUser: authorization.currentUser,
    communities: communities.communities,
    pending: communities.pending,
    hasMore: communities.hasMore,
    fetchCommunities: communities.fetchCommunities,
    doJoin: communities.doJoin
});

export const CommunitiesList = inject(mapMobxToProps)(observer(_CommunitiesList));
