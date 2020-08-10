import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import {
    makeStyles,
    FormControl,
    Input,
    InputAdornment,
    ClickAwayListener
} from "@material-ui/core";

import { localized } from "../../localization/components";
import { SearchResultDropdown } from "../../Search/components";

const useStyles = makeStyles(theme => ({
    searchIconButton: {
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: 40,
        marginRight: 16,
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#ffdecc"
        }
    },
    searchInput: {
        marginRight: 16
    }
}));

const _SearchInput = ({
    searchResultHeader,
    searchValueHeader,
    pending,
    setSearchValueHeader,
    setSearchValuePage,
    resetSearchHeader
}) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const classes = useStyles();

    const handleClickAway = () => {
        resetSearchHeader();
        setIsSearchActive(false);
    };

    const closeSearchInput = () => (
        <div
            onClick={() => setIsSearchActive(true)}
            className={classes.searchIconButton}
        >
            <img src="/search.png" />
        </div>
    );

    const openSearchInput = () => (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <FormControl className={classes.searchInput}>
                    <Input
                        id="input-with-icon-adornment"
                        placeholder="Search"
                        value={searchValueHeader}
                        autoComplete="off"
                        onChange={e => setSearchValueHeader(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <img src="/search.png" />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </ClickAwayListener>

            {searchValueHeader && (
                <SearchResultDropdown
                    searchResult={searchResultHeader}
                    showMore={() => setSearchValuePage(searchValueHeader)}
                    pending={pending}
                />
            )}
        </>
    );

    return isSearchActive ? openSearchInput() : closeSearchInput();
};

const mapMobxToProps = ({ searchUsers }) => ({
    searchResultHeader: searchUsers.searchResultHeader,
    searchValueHeader: searchUsers.searchValueHeader,
    pending: searchUsers.pendingHeader,
    setSearchValueHeader: searchUsers.setSearchValueHeader,
    setSearchValuePage: searchUsers.setSearchValuePage,
    resetSearchHeader: searchUsers.resetSearchHeader
});

export const SearchInput = localized(inject(mapMobxToProps)(observer(_SearchInput)));
