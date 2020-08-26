import React from "react";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles } from "@material-ui/core";

import Loader from "../../components/Loader";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table",
        marginTop: "100px"
    }
}));

const _CommunitiesList = ({ pending, hasMore, error }) => {
    const classes = useStyles();

    return null;

    // return pending && communities.length === 0 ? (
    //     <div className={classes.centered}>
    //         <Loader size="lg" />
    //     </div>
    // ) : !error ? (
    //     <InfiniteScroll
    //         next={fetchCommunities}
    //         loader={
    //             <div className={classes.centered}>
    //                 <Loader size="lg" />
    //             </div>
    //         }
    //         dataLength={communities.length}
    //         style={{ overflowY: "hidden" }}
    //         hasMore={hasMore}
    //     >
    //         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(community => (
    //             <div>Community #{community}</div>
    //         ))}
    //     </InfiniteScroll>
    // ) : (
    //     <CommunitiesNotFound />
    // );
};

const mapMobxToProps = ({ communities }) => ({
    pending: communities.pending,
    hasMore: communities.hasMore,
    error: communities.error
});

export const CommunitiesList = inject(mapMobxToProps)(observer(_CommunitiesList));
