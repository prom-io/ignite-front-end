import React from "react";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles } from "@material-ui/core";

import Loader from "../../components/Loader";
import { SearchResultItem } from "../../Search/components";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
        display: "table"
    },
    searchListWrapper: {}
}));

const _SearchPeopleList = ({ fetchSearchPeople, searchResult, hasMore }) => {
    const classes = useStyles();

    return (
        <div className={classes.searchListWrapper}>
            <InfiniteScroll
                next={fetchSearchPeople}
                hasMore={hasMore}
                loader={
                    <div className={classes.centered}>
                        <Loader size="lg" />
                    </div>
                }
                dataLength={searchResult.length}
                style={{ overflowY: "hidden" }}
            >
                {searchResult.map(user => (
                    <SearchResultItem user={user} />
                ))}
            </InfiniteScroll>
        </div>
    );
};

const mapMobxToProps = ({ searchUsers }) => ({
    fetchSearchPeople: searchUsers.fetchSearchPeople,
    searchResult: searchUsers.searchResult,
    hasMore: searchUsers.hasMore
});

export const SearchPeopleList = inject(mapMobxToProps)(observer(_SearchPeopleList));
