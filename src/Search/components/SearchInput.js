import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import {
    makeStyles,
    FormControl,
    Input,
    InputAdornment,
    IconButton,
    ClickAwayListener
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { localized } from "../../localization/components";
import { SearchResultDropdown } from "../../Search/components";
import search from "../../images/descriptions/search.svg"

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
        marginRight: "16px"
    },
    searchInputCloseIcon: {
        padding: "3px"
    }
}));

const _SearchInput = ({
    searchResultHeader,
    searchValueHeader,
    searchValueHeaderIsTouched,
    pending,
    setSearchValueHeader,
    setSearchValuePage,
    l
}) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const classes = useStyles();

    const handleClickAway = () => {
        setIsSearchActive(false);
    };

    const closeSearchInput = () => (
        <div
            onClick={() => setIsSearchActive(true)}
            className={classes.searchIconButton}
        >
            <img src={search} />
        </div>
    );

    const openSearchInput = () => (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <FormControl className={classes.searchInput}>
                    <Input
                        placeholder={l("appbar.search")}
                        value={searchValueHeader}
                        autoComplete="off"
                        onChange={e => setSearchValueHeader(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <img src={search} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    classes={{ root: classes.searchInputCloseIcon }}
                                    onClick={() => setSearchValueHeader("")}
                                >
                                    <Close />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </ClickAwayListener>

            {searchValueHeader && (
                <SearchResultDropdown
                    searchValueHeaderIsTouched={searchValueHeaderIsTouched}
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
    searchValueHeaderIsTouched: searchUsers.searchValueHeaderIsTouched,
    pending: searchUsers.pendingHeader,
    setSearchValueHeader: searchUsers.setSearchValueHeader,
    setSearchValuePage: searchUsers.setSearchValuePage
});

export const SearchInput = localized(inject(mapMobxToProps)(observer(_SearchInput)));
